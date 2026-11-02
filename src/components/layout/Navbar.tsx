"use client";

import { useCallback, useRef, useState } from "react";
import { Compass, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navLinks, site } from "@/data/site";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const SCROLL_THRESHOLD = 80;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The solid state is a class written straight to the node: scrolling never
  // triggers a React render.
  useGSAP(
    () => {
      const node = header.current;
      if (!node) return;
      node.classList.toggle("is-solid", window.scrollY > SCROLL_THRESHOLD);
      ScrollTrigger.create({
        start: SCROLL_THRESHOLD,
        end: "max",
        onToggle: (self) => node.classList.toggle("is-solid", self.isActive),
      });
    },
    { scope: header },
  );

  return (
    <>
      <header
        ref={header}
        className="fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-300 [&.is-solid]:bg-ink/95"
      >
        <Container className="relative flex h-20 items-center justify-between">
          <p
            data-chapter
            className="absolute bottom-1.5 left-5 hidden text-[10px] font-bold tracking-[0.18em] text-on-dark/80 uppercase md:left-8 md:block"
          >
            Chapter 01 — The Dream
          </p>
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              scrollTo("#home");
            }}
            className="flex min-h-11 items-center gap-2.5"
            aria-label="Voyara Travels — back to top"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-teal text-white">
              <Compass className="size-6" aria-hidden="true" />
            </span>
            <span className="font-display text-2xl font-semibold text-white">
              {site.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-semibold text-white transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-gold"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </a>
            <Button
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("#contact");
              }}
            >
              Plan My Trip
            </Button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-full text-white transition-colors lg:hidden"
          >
            {menuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </Container>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} onNavigate={scrollTo} />
    </>
  );
}
