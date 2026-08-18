"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

type HeroObjectProps = {
  pointer: RefObject<{ x: number; y: number }>;
  scrollProgress: RefObject<number>;
};

const LOGO_URL = "/logo.jpg";

// CylinderGeometry's axis runs along Y by default, so its two flat caps
// face straight up and down — not toward the camera. Left unrotated, the
// medallion reads as a coin lying flat on an invisible table instead of
// standing up to face the viewer. Rotating the whole group +90° on X
// swings that "up" cap normal around to face +Z (the camera is at
// positive Z looking back toward the origin), without needing to touch
// the cylinder/torus geometry or their relative alignment to each other.
// This tilt is now a fixed setup rotation only — the animated motion
// lives entirely on the outer group's Y axis (see TURN_SPEED below), so
// this constant no longer has anything added to it over time.
const FACE_CAMERA_TILT_X = Math.PI / 2;
// The coin now turns like a badge on a rotating stand — spinning around
// the vertical axis so it swings face → side profile → back → other side
// profile → face — rather than tumbling end-over-end toward/away from
// the camera the way the previous "flip" version did. That's what "shift
// it 90 degrees, let it turn sideways" asks for: the animated rotation
// moves from the X axis to the Y axis, a 90° shift in which axis is
// doing the work. Both cap faces carry the same logo texture (see the
// materials comment below), so there's no blank moment at any point in
// the turn — front and "back" both show the logo, and the rim reads
// correctly edge-on too. This lives on the OUTER group specifically
// (X tilt stays fixed on the inner group) — mixing an animated Y
// rotation into the same Euler triple as the ~90° X tilt is exactly what
// caused an earlier version of this to drift unpredictably (Three's XYZ
// Euler composition stops behaving like two independent axes once X is
// near 90°); keeping them on separate parent/child groups sidesteps that
// entirely, since each group's transform is its own clean rotation
// matrix rather than one shared Euler triple.
const TURN_SPEED = 0.5;
// Centered and translucent — a large emblem sitting behind the hero copy
// rather than a solid object competing with it. The hero text has its own
// z-10 stacking so it's always drawn on top regardless, but at full size
// and opacity the medallion's face-on frame (a complete, legible logo
// disc) still visually buried the headline and made the smaller copy
// under it unreadable — a coin mid-flip is on screen "solid face-on" a
// lot of the time, unlike the old bounded-sway version which rarely
// squared up to the camera. Scaled down and kept at a lighter opacity so
// every point in the flip — including dead-on — stays a watermark behind
// the text rather than a second competing headline.
const POSITION_X = 0;
const POSITION_Y = 0;
const BASE_SCALE = 0.72;
// Bolder than the original 0.32 (which nearly vanished against the old
// dark theme) but pulled back from an initial 0.5 pass — at this size,
// 0.5 read as an opaque disc stamped over the headline rather than a
// watermark. 0.36 keeps the blue/logo legible as an accent without
// fighting the text for attention.
const MEDALLION_OPACITY = 0.36;
// The camera's fov (Scene.tsx) is a VERTICAL field of view, so at a fixed
// fov the horizontal slice of the scene the camera captures shrinks as the
// viewport gets narrower — a portrait phone shows much less width at the
// same vertical framing a wide desktop window does. The medallion's own
// size is a fixed number of world units, so on a narrow viewport it eats a
// far bigger share of the frame than it does on desktop: this is what made
// it balloon to the point of overlapping the headline and, mid-turn, read
// as a huge slicing "blade" through the paragraph text on a phone — not a
// rendering bug, just the same fixed-size-object-in-a-narrower-frustum math
// that previously made the ContactShadows plane's edge peek into frame on
// mobile (see the `scale={40}` comment in Scene.tsx). Rather than touching
// the camera's fov (which would also stretch the lighting/Sparkles spread
// and risks a fisheye look), the medallion's own scale is pulled back on
// narrow viewports so its on-screen footprint stays closer to how it reads
// on the desktop widths this design was actually tuned against.
const REFERENCE_ASPECT = 1.6;
const MIN_ASPECT_SCALE = 0.55;

/**
 * Hero object for Classic Cuts Barbershop: a chrome medallion with the
 * shop's actual logo (captured from their Facebook page) on its face —
 * "use their logo 3D" was the literal brief for this build. A flat coin
 * shape suits a circular emblem logo much better than trying to model
 * the emblem's linework in 3D geometry.
 *
 * The logo image loads asynchronously (it's a real photo/screenshot, not
 * a tiny procedural texture), so this uses a plain useState + useEffect
 * load — NOT Suspense, and NOT a ref mutated after the fact. The
 * material's `map` prop is only ever set from state, so there's no
 * timing window where a ref might not be populated yet (see
 * references/gotchas.md, #2, for why that pattern broke silently in
 * production on the original build this template came from). Suspense
 * was avoided here specifically so a slow/failed logo load can't stall
 * the rest of the scene the way an ungated async resource did in
 * gotcha #1 — worst case, the medallion is briefly plain chrome with no
 * face texture, which still looks intentional.
 */
export function HeroObject({ pointer, scrollProgress }: HeroObjectProps) {
  // Two nested groups: the outer one owns position/scale and the
  // continuous Y-axis turn (plus a small pointer-driven nudge riding on
  // top of it), the inner one only ever holds the fixed face-camera X
  // tilt (plus a tiny pointer.y nudge). See the TURN_SPEED comment above
  // for why the turn specifically has to live on the outer group rather
  // than being combined with the inner group's X tilt.
  const outerRef = useRef<Group>(null);
  const innerRef = useRef<Group>(null);
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);
  const { size } = useThree();
  // Recomputed only when the canvas actually resizes (not every frame) —
  // see the REFERENCE_ASPECT comment above for why this exists.
  const aspectScale = useMemo(() => {
    const aspect = size.width / size.height;
    if (aspect >= REFERENCE_ASPECT) return 1;
    return Math.max(MIN_ASPECT_SCALE, aspect / REFERENCE_ASPECT);
  }, [size.width, size.height]);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(LOGO_URL, (tex) => {
      if (cancelled) {
        tex.dispose();
        return;
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      // CylinderGeometry's cap UVs aren't a plain "look straight down at
      // the image" mapping — they come out rotated 90° clockwise from
      // that, which is why "CLASSIC CUTS" was reading top-to-bottom
      // instead of left-to-right on the medallion's face (confirmed
      // against the source logo, which reads normally horizontal).
      // Rotating the texture 90° counter-clockwise around its own center
      // cancels that out. `center` has to be set to (0.5, 0.5) first —
      // Three.js rotates around (0,0) (a corner) by default, which would
      // swing the logo off the cap entirely instead of spinning it in
      // place.
      tex.center.set(0.5, 0.5);
      tex.rotation = Math.PI / 2;
      setLogoTexture(tex);
    });
    return () => {
      cancelled = true;
      setLogoTexture((current) => {
        current?.dispose();
        return null;
      });
    };
  }, []);

  // Was a pale chrome/white (#c7cdd6 / #ffffff) when the page background
  // was near-black — a light, low-saturation object like that all but
  // disappears against the new white/light background instead. Blue is
  // both the fix for visibility (dark enough to read against white) and
  // a direct answer to "use some blue": it's now the medallion's actual
  // color, not just a rim-light tint. faceMaterial's color still
  // multiplies with the logo texture (see the map effect below), so this
  // tints the photographed logo blue rather than showing it in its
  // original black/chrome — an intentional trade for a cohesive colored
  // watermark over literal photo fidelity, given it's a translucent
  // background element rather than a literal reproduction of the logo.
  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#2c4f8c",
        metalness: 1,
        roughness: 0.22,
        clearcoat: 0.6,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.3,
        transparent: true,
        opacity: MEDALLION_OPACITY,
        depthWrite: false,
      }),
    [],
  );

  const faceMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#3f6bb0",
        metalness: 0.35,
        roughness: 0.45,
        clearcoat: 0.5,
        clearcoatRoughness: 0.3,
        envMapIntensity: 1,
        transparent: true,
        opacity: MEDALLION_OPACITY,
        depthWrite: false,
      }),
    [],
  );

  // Keep the face material's map in sync declaratively whenever the
  // loaded texture changes, rather than reading logoTexture directly in
  // JSX (meshPhysicalMaterial doesn't have a clean "no map yet" JSX
  // shorthand) — this still never depends on ref timing, just on this
  // material instance being stable across renders (it's memoized above).
  useEffect(() => {
    faceMaterial.map = logoTexture;
    faceMaterial.needsUpdate = true;
  }, [faceMaterial, logoTexture]);

  useEffect(() => {
    return () => {
      chromeMaterial.dispose();
      faceMaterial.dispose();
    };
  }, [chromeMaterial, faceMaterial]);

  // Same texture on both caps (not just the "front" one) so that even if
  // interaction ever pushes the sway further than intended, the back
  // cap still shows the logo instead of going blank chrome — belt and
  // suspenders alongside the bounded sway below.
  const materials = useMemo(
    () => [chromeMaterial, faceMaterial, faceMaterial],
    [chromeMaterial, faceMaterial],
  );

  const turnAngle = useRef(0);

  useFrame((state, delta) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Outer group: the turntable turn. Keeps accumulating forever (never
    // wrapped/reset — Three's rotation.y handles arbitrarily large values
    // fine), plus the pointer/scroll nudges riding along on top rather
    // than being lerped toward separately — the continuous turn is now
    // the primary motion, so those are just a small offset on it rather
    // than a competing target.
    turnAngle.current += delta * TURN_SPEED;
    outer.rotation.y =
      turnAngle.current + pointer.current.x * 0.12 - scrollProgress.current * 0.3;
    outer.position.y =
      POSITION_Y + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    // Subtle breathing scale — cheap extra bit of life on top of the
    // bob + turn, kept small enough to read as alive rather than busy.
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.015;
    outer.scale.setScalar(BASE_SCALE * breathe * aspectScale);

    // Inner group: fixed face-camera tilt only, plus a tiny pointer.y
    // nudge — no accumulation here anymore, since the turn moved to the
    // outer group's Y axis.
    inner.rotation.x = FACE_CAMERA_TILT_X + pointer.current.y * 0.06;
  });

  return (
    <group ref={outerRef} position={[POSITION_X, POSITION_Y, 0]} scale={BASE_SCALE}>
      <group ref={innerRef} rotation={[FACE_CAMERA_TILT_X, 0, 0]}>
        {/* The medallion: a short cylinder ("coin"). CylinderGeometry's
            three material groups are [side, top cap, bottom cap] — both
            caps carry the logo (see the materials comment above), so it
            reads correctly at every point in the turn; only the rim
            (side) stays plain blue-chrome. This inner group's rotation
            only sets the fixed tilt that faces the coin toward the
            camera — the animated turntable spin lives one level up, on
            the outer group's Y axis (see the TURN_SPEED comment above
            for why). No shadow
            casting/receiving since it's a translucent backdrop emblem
            rather than a solid object — a hard-edged shadow from a
            see-through shape read as a bug. */}
        <mesh material={materials}>
          <cylinderGeometry args={[1.7, 1.7, 0.22, 72, 1]} />
        </mesh>

        {/* Raised rim ring for a bit of dimensional detail beyond a flat
            disc. A torus defaults to lying flat in the XY plane (hole
            facing Z) — rotated 90° on X so its hole faces Y instead,
            wrapping it around the coin's edge like the cylinder above. */}
        <mesh position={[0, 0.115, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.045, 16, 72]} />
          <meshPhysicalMaterial
            color="#6a8dc9"
            metalness={1}
            roughness={0.18}
            clearcoat={0.7}
            transparent
            opacity={MEDALLION_OPACITY + 0.1}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
