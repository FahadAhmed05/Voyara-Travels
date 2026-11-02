"use client";

import { useCallback, useState } from "react";
import { Compass, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navLinks, site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollTo } from "@/hooks/useScrollTo";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 80;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(SCROLL_THRESHOLD);
  const scrollTo = useScrollTo();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const solid = scrolled && !menuOpen;
  const tone = solid ? "text-ink" : "text-white";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
          solid ? "bg-white/95 shadow-soft backdrop-blur" : "bg-transparent",
        )}
      >
        <Container className="flex h-20 items-center justify-between">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              scrollTo("#home");
            }}
            className="flex items-center gap-2.5"
            aria-label="Voyara Travels — back to top"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-teal text-white">
              <Compass className="size-6" aria-hidden="true" />
            </span>
            <span
              className={cn(
                "font-display text-2xl font-semibold transition-colors",
                tone,
              )}
            >
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
                    className={cn(
                      "text-sm font-semibold transition-colors hover:text-gold",
                      tone,
                    )}
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
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-gold",
                tone,
              )}
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
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
              tone,
            )}
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
