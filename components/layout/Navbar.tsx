"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business, navLinks } from "@/lib/constants";
import { scrollToHash } from "@/lib/scrollToHash";
import { Button } from "@/components/ui/Button";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function handleNavClick(e: React.MouseEvent, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    scrollToHash(href);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen
          ? "border-b border-hairline bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent"
      }`}
    >
      {/* The shop's own barber-pole stripe as a literal graphic element,
          always visible at the very top of the page regardless of scroll
          state — a small thing, but it's the single most recognizable
          "this is a barbershop" visual cue available, and it was missing
          everywhere except as a thin accent color on text before. */}
      <div className="barber-stripe h-[3px] w-full" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex flex-col leading-none"
        >
          <span className="font-display text-xl font-semibold tracking-[0.04em] text-bone sm:text-2xl">
            {business.shortName}
          </span>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.5em] text-brass">
            {business.category}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-medium uppercase tracking-[0.22em] text-bone-dim transition-colors hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Button href={business.bookingUrl} external variant="primary">
            Message To Book
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center text-bone lg:hidden"
        >
          {menuOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden bg-ink transition-[grid-template-rows] duration-500 ease-out lg:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav
            className="flex flex-col gap-1 border-t border-hairline px-6 py-6"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="border-b border-hairline/60 py-4 font-display text-2xl text-bone transition-colors hover:text-brass"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Button href={business.bookingUrl} external variant="primary">
                Message To Book
              </Button>
              <Button href={business.phoneHref} variant="outline">
                Call {business.phoneDisplay}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
