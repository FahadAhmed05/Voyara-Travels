"use client";

import { useEffect } from "react";
import { Phone } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/Button";
import { navLinks, site } from "@/data/site";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    if (!lenis) document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis, onClose]);

  if (!open) return null;

  const handleNavigate = (href: string) => {
    onClose();
    // Lenis.start() (run when the menu unmounts) cancels any scroll in flight,
    // so navigate once the close has been committed and Lenis has resumed.
    window.setTimeout(() => onNavigate(href), 0);
  };

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 pt-20 lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="space-y-2">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className="animate-menu-rise"
              style={{ animationDelay: `${index * 70 + 80}ms` }}
            >
              <a
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(link.href);
                }}
                className="block py-2 font-display text-4xl text-white transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="mt-10 flex animate-menu-rise flex-col items-start gap-4"
        style={{ animationDelay: `${navLinks.length * 70 + 120}ms` }}
      >
        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-2 text-on-dark"
        >
          <Phone className="size-4" aria-hidden="true" />
          {site.phone}
        </a>
        <Button
          href="#contact"
          variant="light"
          size="lg"
          onClick={(event) => {
            event.preventDefault();
            handleNavigate("#contact");
          }}
        >
          Plan My Trip
        </Button>
      </div>
    </div>
  );
}
