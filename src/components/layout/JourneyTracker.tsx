"use client";

import { useRef } from "react";
import { formatNumber } from "@/lib/format";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CRUISE_FT = 38000;
const WAYPOINTS = [
  { id: "home", name: "The Dream" },
  { id: "hassle", name: "The Hassle" },
  { id: "services", name: "The Guide" },
  { id: "plan", name: "The Plan" },
  { id: "proof", name: "The Proof" },
  { id: "departure", name: "Departure" },
] as const;

/**
 * A fixed flight tracker that travels the whole page with the reader: the Earth
 * (which flies in from the hero) turns, the plane flies down its route, altitude climbs to cruise and eases
 * back to the ground, and the current chapter is named. It lives in the margin
 * (or a compact pill on narrower screens), never over the content, and is
 * written straight to DOM nodes, so scrolling causes no React renders.
 */
export function JourneyTracker() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const pick = (sel: string) => root.querySelector<HTMLElement>(sel);
      const plane = pick("[data-plane]");
      const bank = pick("[data-bank]");
      const trail = pick("[data-trail]");
      const clouds = gsap.utils.toArray<HTMLElement>("[data-cloud]", root);
      const fill = pick("[data-fill]");
      const track = pick("[data-track]");
      const alt = pick("[data-alt]");
      const count = pick("[data-count]");
      const name = pick("[data-name]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]", root);
      if (
        !plane ||
        !bank ||
        !trail ||
        !fill ||
        !track ||
        !alt ||
        !count ||
        !name
      )
        return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let travel = 0;
        let sway = 5;
        let height = 400;
        const measure = () => {
          travel = Math.max(0, track.clientHeight - plane.offsetHeight);
          sway = Math.max(5, root.clientWidth / 2 - 14);
          height = root.clientHeight;
        };
        measure();
        ScrollTrigger.addEventListener("refresh", measure);

        const state = { p: 0 };
        const render = () => {
          const p = state.p;
          // The route is a gentle S-curve: the plane banks into each turn,
          // looks a little larger at cruise, and the clouds stream past.
          const lift = Math.sin(Math.PI * p) ** 0.45;
          gsap.set(plane, {
            y: p * travel,
            x: Math.sin(p * 22) * sway,
            scale: 0.85 + 0.3 * lift,
          });
          gsap.set(bank, { rotation: Math.cos(p * 22) * 16 });
          clouds.forEach((cloud, i) => {
            const pace = 1.5 + i * 0.6;
            gsap.set(cloud, {
              y: gsap.utils.wrap(
                -12,
                height + 12,
                (i * height) / clouds.length - p * travel * pace,
              ),
            });
          });
          gsap.set(fill, { scaleY: p });
          // Climb, cruise, descend: altitude follows a soft arc over the page.
          const ft = Math.round(CRUISE_FT * Math.sin(Math.PI * p) ** 0.45);
          alt.textContent = `${formatNumber(ft)} FT`;
        };
        render();

        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: render,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        // Speed lengthens the contrail; a little float keeps it airborne.
        const trailTo = gsap.quickTo(trail, "scaleY", {
          duration: 0.4,
          ease: "power3.out",
        });
        const speed = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) =>
            trailTo(
              0.35 + Math.min(Math.abs(self.getVelocity()) / 1800, 1) * 0.65,
            ),
        });
        const float = gsap.to(bank, {
          y: 2.5,
          duration: 1.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        WAYPOINTS.forEach((point, index) => {
          const section = document.getElementById(point.id);
          if (!section) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (!self.isActive) return;
              name.textContent = point.name;
              count.textContent = `0${index + 1} / 0${WAYPOINTS.length}`;
              nodes.forEach((node, i) => {
                node.dataset.state =
                  i < index ? "done" : i === index ? "active" : "todo";
              });
            },
          });
        });

        return () => {
          ScrollTrigger.removeEventListener("refresh", measure);
          speed.kill();
          float.kill();
        };
      });
    },
    { scope },
  );

  return (
    <aside
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-1 z-40 hidden h-[52vh] w-7 -translate-y-1/2 flex-col items-center gap-2 overflow-hidden rounded-full bg-ink/85 py-2 text-on-dark motion-reduce:hidden min-[1500px]:right-3 min-[1500px]:h-[58vh] min-[1500px]:w-[68px] min-[1500px]:gap-3 min-[1500px]:rounded-[2rem] min-[1500px]:px-2 min-[1500px]:py-4 md:flex"
    >
      {[18, 68, 40, 80].map((left, i) => (
        <span
          key={left}
          data-cloud
          className="absolute h-1.5 rounded-full bg-white/15"
          style={{ left: `${left}%`, width: `${14 + i * 4}px`, top: 0 }}
        />
      ))}
      <div
        data-earth-anchor="dock"
        className="size-6 shrink-0 min-[1500px]:size-14"
      />

      <div className="hidden text-center min-[1500px]:block">
        <p
          data-alt
          className="font-display text-sm leading-none font-semibold text-white tabular-nums"
        >
          0 FT
        </p>
        <p className="mt-1 text-[10px] font-bold tracking-[0.14em] uppercase">
          <span data-name>The Dream</span>
        </p>
      </div>

      <p
        data-count
        className="hidden text-[10px] font-bold tracking-[0.14em] text-gold tabular-nums min-[1500px]:block"
      >
        01 / 06
      </p>

      <div data-track className="relative w-px flex-1 bg-white/20">
        <span
          data-fill
          className="absolute inset-0 origin-top scale-y-0 bg-gold"
        />
        {WAYPOINTS.map((point, i) => (
          <span
            key={point.id}
            data-node
            data-state={i === 0 ? "active" : "todo"}
            className="absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-1 ring-white/40 data-[state=active]:bg-gold data-[state=active]:ring-gold data-[state=done]:bg-gold/60"
            style={{ top: `${(i / (WAYPOINTS.length - 1)) * 100}%` }}
          />
        ))}
        <span data-plane className="absolute top-0 left-1/2 -ml-3.5 w-7">
          <span
            data-trail
            className="absolute bottom-[55%] left-1/2 h-14 w-[3px] origin-bottom -translate-x-1/2 rounded-full bg-gradient-to-t from-white/70 to-transparent"
          />
          <span data-bank className="relative block">
            <svg
              viewBox="0 0 24 24"
              className="size-7 rotate-180 text-white drop-shadow-[0_0_6px_rgba(201,162,75,0.8)]"
              fill="currentColor"
            >
              <path d="M12 1.5c.9 0 1.6 1.1 1.6 2.7V9l8.4 4.7v2.1l-8.4-2.2v4.2l2.2 1.6V21l-3.8-1-3.8 1v-1.6l2.2-1.6v-4.2L2 15.8v-2.1L10.4 9V4.2c0-1.6.7-2.7 1.6-2.7z" />
            </svg>
          </span>
        </span>
      </div>
    </aside>
  );
}
