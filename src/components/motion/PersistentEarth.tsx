"use client";

import { useRef, type PointerEvent } from "react";
import { destinations } from "@/data/destinations";
import { globeCities } from "@/data/globe";
import { useStartBooking } from "@/hooks/useStartBooking";
import { drawEarth, INITIAL_LON, type EarthPin } from "@/lib/earth";
import { formatPKR } from "@/lib/format";
import { gsap, ScrollTrigger, TABLET_UP, useGSAP } from "@/lib/gsap";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * One Earth for the whole page. In the hero it is large, with Voyara's routes
 * fanning out of Karachi and destinations you can click; as the hero scrolls
 * away it travels to the journey tracker at the edge and keeps turning with the
 * page. With reduced motion (or on phones) it is a still image in the hero.
 */
export function PersistentEarth() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pins = useRef<EarthPin[]>([]);
  const size = useRef(560);
  const interactive = useRef(false);
  const startBooking = useStartBooking();

  useGSAP(
    () => {
      const box = wrap.current;
      const cv = canvas.current;
      const heroAnchor = document.querySelector<HTMLElement>(
        '[data-earth-anchor="hero"]',
      );
      const dockAnchor = document.querySelector<HTMLElement>(
        '[data-earth-anchor="dock"]',
      );
      const hud = document.querySelector<HTMLElement>("[data-earth-hud]");
      const ctx = cv?.getContext("2d");
      if (!box || !cv || !ctx || !heroAnchor) return;

      const view = { lon: INITIAL_LON, routes: 1, labels: true };
      const draw = (time: number) => {
        pins.current = drawEarth(ctx, size.current, { ...view, time });
      };
      const resize = () => {
        const s = Math.round(heroAnchor.getBoundingClientRect().width);
        if (!s) return;
        size.current = s;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = s * dpr;
        cv.height = s * dpr;
        cv.style.width = `${s}px`;
        cv.style.height = `${s}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        gsap.set(box, { width: s, height: s });
      };
      const setHud = (text: string) => {
        if (hud) hud.textContent = text;
      };

      const mm = gsap.matchMedia();

      // Moving Earth: hero -> tracker, on a normal scrolling page (no pin).
      mm.add(TABLET_UP, () => {
        gsap.set(box, { position: "fixed", left: 0, top: 0, autoAlpha: 1 });
        resize();
        let hero = { x: 0, y: 0 };
        let dock = { x: 0, y: 0, scale: 0.1 };
        const measure = () => {
          resize();
          const h = heroAnchor.getBoundingClientRect();
          hero = {
            x: h.left + h.width / 2,
            y: h.top + window.scrollY + h.height / 2,
          };
          const d = dockAnchor?.getBoundingClientRect();
          dock = d
            ? {
                x: d.left + d.width / 2,
                y: d.top + d.height / 2,
                scale: d.width / size.current,
              }
            : { x: hero.x, y: hero.y, scale: 0.1 };
        };
        measure();
        ScrollTrigger.addEventListener("refresh", measure);

        const intro = { routes: 0 };
        let idle = 0;
        let scrollY = window.scrollY;
        let dirty = true;
        const place = () => {
          const vh = window.innerHeight;
          const q = ease(clamp((scrollY - 0.12 * vh) / (0.9 * vh)));
          const cx = gsap.utils.interpolate(hero.x, dock.x, q);
          const cy = gsap.utils.interpolate(hero.y - scrollY, dock.y, q);
          const s = gsap.utils.interpolate(
            1 + 0.1 * clamp(scrollY / vh),
            dock.scale,
            q,
          );
          gsap.set(box, {
            x: cx - size.current / 2,
            y: cy - size.current / 2,
            scale: s,
          });
          interactive.current = q < 0.04;
          box.style.pointerEvents = interactive.current ? "auto" : "none";
          view.labels = q < 0.3;
          view.lon = INITIAL_LON + scrollY * 0.055 + idle;
          view.routes = intro.routes;
          if (hud) hud.style.opacity = String(1 - clamp(q * 3));
        };

        const tick = (time: number, delta: number) => {
          const near = scrollY < window.innerHeight * 1.1;
          idle += near ? delta * 0.004 : 0;
          if (!near && !dirty) return;
          dirty = false;
          place();
          draw(time / 1000);
        };
        gsap.ticker.add(tick);
        const track = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            scrollY = self.scroll();
            dirty = true;
          },
        });
        const drawRoutes = gsap.to(intro, {
          routes: 1,
          duration: 2.6,
          delay: 0.9,
          ease: "power2.inOut",
          onUpdate: () => (dirty = true),
        });

        return () => {
          gsap.ticker.remove(tick);
          track.kill();
          drawRoutes.kill();
          ScrollTrigger.removeEventListener("refresh", measure);
        };
      });

      // Still Earth: reduced motion (any width). Hidden if the anchor is not
      // shown, e.g. on a short phone screen.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const h = heroAnchor.getBoundingClientRect();
        if (!h.width) {
          gsap.set(box, { autoAlpha: 0 });
          return;
        }
        resize();
        gsap.set(box, {
          position: "absolute",
          left: h.left,
          top: h.top + window.scrollY,
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
        });
        interactive.current = h.width > 400;
        box.style.pointerEvents = interactive.current ? "auto" : "none";
        view.lon = INITIAL_LON;
        view.routes = 1;
        view.labels = h.width > 400;
        draw(0);
      });

      // Phones: a smaller Earth above the headline. Routes draw in, it turns
      // with the scroll and drifts, and it fades as the hero leaves.
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const h = heroAnchor.getBoundingClientRect();
          if (!h.width) {
            gsap.set(box, { autoAlpha: 0 });
            return;
          }
          resize();
          gsap.set(box, {
            position: "absolute",
            left: h.left,
            top: h.top + window.scrollY,
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
          });
          interactive.current = false;
          box.style.pointerEvents = "none";
          view.labels = false;
          const intro = { routes: 0 };
          let idle = 0;
          let scrollY = window.scrollY;
          const tick = (time: number, delta: number) => {
            const vh = window.innerHeight;
            if (scrollY > vh) return;
            idle += delta * 0.005;
            view.lon = INITIAL_LON + scrollY * 0.09 + idle;
            view.routes = intro.routes;
            box.style.opacity = String(1 - clamp(scrollY / (0.7 * vh)));
            draw(time / 1000);
          };
          gsap.ticker.add(tick);
          const track = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              scrollY = self.scroll();
            },
          });
          const drawRoutes = gsap.to(intro, {
            routes: 1,
            duration: 2.4,
            delay: 0.6,
            ease: "power2.inOut",
          });
          return () => {
            gsap.ticker.remove(tick);
            track.kill();
            drawRoutes.kill();
          };
        },
      );

      return () => setHud("");
    },
    { scope: wrap },
  );

  const hit = (event: { clientX: number; clientY: number }) => {
    if (!interactive.current || !canvas.current) return null;
    const rect = canvas.current.getBoundingClientRect();
    const k = size.current / rect.width;
    const x = (event.clientX - rect.left) * k;
    const y = (event.clientY - rect.top) * k;
    const reach = size.current * 0.045;
    return (
      pins.current.find((p) => Math.hypot(p.x - x, p.y - y) < reach) ?? null
    );
  };

  const onMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const pin = hit(event);
    if (canvas.current)
      canvas.current.style.cursor = pin ? "pointer" : "default";
    const hud = document.querySelector<HTMLElement>("[data-earth-hud]");
    if (!hud) return;
    const city = globeCities.find((c) => c.hotelCity === pin?.hotelCity);
    const dest = destinations.find((d) => d.id === `dest-${city?.id}`);
    hud.textContent =
      city && dest
        ? `${city.label} · from ${formatPKR(dest.fromPrice)} · Plan a stay →`
        : "Karachi → the world · pick a destination";
  };

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[45]"
    >
      <canvas
        ref={canvas}
        onPointerMove={onMove}
        onClick={(event) => {
          const pin = hit(event);
          if (pin?.hotelCity) {
            startBooking({ tab: "hotels", destination: pin.hotelCity });
          }
        }}
      />
    </div>
  );
}
