"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  PerformanceMonitor,
  Sparkles,
} from "@react-three/drei";
import { HeroObject } from "./HeroObject";
import { ScrollTrigger } from "@/lib/gsap";

// The medallion (radius 1.7 plus a slightly larger rim torus) is ~3.6
// world units across and, unlike the tall barber pole this template
// started from, wide rather than tall — so it needs a noticeably closer
// camera to read at a similar visual size. Re-measure and adjust these
// two constants again if the hero object's proportions change further.
const CAMERA_BASE_Z = 7;
const CAMERA_DOLLY_RANGE = 1;

function CameraRig({
  scrollProgress,
}: {
  scrollProgress: React.RefObject<number>;
}) {
  useFrame(({ camera }) => {
    camera.position.z = CAMERA_BASE_Z - scrollProgress.current * CAMERA_DOLLY_RANGE;
    camera.position.y = 0.3 + scrollProgress.current * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene({ onContextLost }: { onContextLost: () => void }) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const [highQuality, setHighQuality] = useState(true);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.3, CAMERA_BASE_Z], fov: 36 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            onContextLost();
          },
          { once: true },
        );
      }}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr([1, 1]);
          setHighQuality(false);
        }}
        onIncline={() => {
          setDpr([1, 2]);
          setHighQuality(true);
        }}
      />
      {/* No forced background color here on purpose (the dark-theme
          version had one) — gl alpha is true, so the canvas stays
          transparent and the Hero section's own bg-ink shows through
          instead. That keeps the 3D layer and the surrounding page in
          sync automatically if the theme ever changes again, rather than
          hardcoding a color here that has to be kept in step by hand. */}
      <ambientLight intensity={0.55} color="#f5f7fa" />
      <spotLight
        position={[3, 5, 4]}
        angle={0.35}
        penumbra={0.6}
        intensity={1.8}
        color="#ffffff"
        castShadow
      />
      {/* Blue + red rim lights lifted directly from the logo's
          barber-pole stripe — kept in the 3D scene as accent lighting
          the same way they were before; the medallion's own material is
          now a solid blue rather than chrome (see HeroObject.tsx), so
          these mostly add a warm/cool edge highlight rather than doing
          the work of introducing color by themselves. */}
      <pointLight position={[-4, -1, -3]} intensity={0.8} color="#3f6bb0" />
      <pointLight position={[4, -1.5, -2]} intensity={0.5} color="#c8323f" />

      {/*
        HeroObject/CameraRig/Sparkles/ContactShadows are all synchronous
        in the Suspense sense — none of them throw a promise. HeroObject
        does load its logo texture asynchronously, but via plain
        useState/useEffect rather than Suspense (see HeroObject.tsx for
        why), so it doesn't need a boundary here either. Environment is
        the only actual Suspense resource (it fetches an HDRI from a CDN
        for image-based lighting), so it gets its own boundary. Sharing
        one boundary would mean a slow/unreachable environment fetch
        leaves the hero object itself stuck in limbo — the scene's core
        content must never wait on a "nice to have" lighting enhancement.
        See references/gotchas.md in the cinematic-business-site skill.
      */}
      <HeroObject pointer={pointer} scrollProgress={scrollProgress} />
      <CameraRig scrollProgress={scrollProgress} />
      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.6} />
      </Suspense>
      {/* Sparkles were a light grey before, tuned to stand out against a
          near-black background — on the new white background that same
          light color would have been almost invisible, so these are now
          the barbershop blue instead (doubles as more visible "use some
          blue" color in the hero, not just the medallion). */}
      {highQuality ? (
        <Sparkles
          count={70}
          scale={[4, 6, 4]}
          size={2}
          speed={0.3}
          color="#3f6bb0"
          opacity={0.55}
        />
      ) : null}
      {/* Much lower opacity than the dark-theme version (0.5) — a solid
          black contact shadow that blended into a near-black background
          reads as a harsh dark smudge on white. `scale` (the shadow
          catcher plane's own footprint) is much bigger than it needs to
          be for the medallion itself on purpose: this is a flat floor
          plane, and a portrait phone screen's aspect ratio shows a much
          narrower horizontal slice of the scene than desktop's does at
          the same vertical field of view — at the old scale={8}, that
          was enough for the plane's edge to land inside the visible
          frame on tall screens and read as a faint hard-edged square
          hovering under the medallion, instead of a soft shadow with no
          visible boundary. Scaling it up to well beyond any realistic
          viewport's frustum removes that edge everywhere rather than
          re-tuning it per aspect ratio. */}
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.16}
        scale={40}
        blur={2.6}
        far={3}
        color="#000000"
      />
    </Canvas>
  );
}
