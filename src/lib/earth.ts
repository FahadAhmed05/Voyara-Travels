import { globeCities } from "@/data/globe";
import { landRings } from "@/data/land";

type Vec = readonly [number, number, number];

const rad = (deg: number) => (deg * Math.PI) / 180;
const TILT = rad(16);
const ORIGIN = globeCities[0];
const ARC_STEPS = 56;

/** Longitude facing the viewer before any scroll or idle turn. */
export const INITIAL_LON = 58;

/** Unit vector in the world frame (longitude 0 faces +z). */
function toVec(lat: number, lon: number): Vec {
  const phi = rad(lat);
  const lam = rad(lon);
  return [
    Math.cos(phi) * Math.sin(lam),
    Math.sin(phi),
    Math.cos(phi) * Math.cos(lam),
  ];
}

function inside(
  lon: number,
  lat: number,
  ring: ReadonlyArray<readonly [number, number]>,
) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    ) {
      hit = !hit;
    }
  }
  return hit;
}

/** Land as an evenly spaced field of dots, computed once. */
function buildLand(): Float32Array {
  const out: number[] = [];
  for (let lat = -78; lat <= 82; lat += 1.8) {
    const step = 1.8 / Math.max(Math.cos(rad(lat)), 0.25);
    for (let lon = -180; lon < 180; lon += step) {
      if (landRings.some((ring) => inside(lon, lat, ring))) {
        out.push(...toVec(lat, lon));
      }
    }
  }
  return new Float32Array(out);
}

/** A lifted great-circle arc from the origin to a destination. */
function buildArc(lat: number, lon: number): Float32Array {
  const a = toVec(ORIGIN.lat, ORIGIN.lon);
  const b = toVec(lat, lon);
  const dot = Math.min(
    1,
    Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]),
  );
  const omega = Math.acos(dot);
  const out: number[] = [];
  for (let i = 0; i <= ARC_STEPS; i++) {
    const t = i / ARC_STEPS;
    const s = Math.sin(omega) || 1;
    const k1 = Math.sin((1 - t) * omega) / s;
    const k2 = Math.sin(t * omega) / s;
    const lift = 1 + 0.16 * Math.sin(Math.PI * t) * Math.min(1, omega / 0.6);
    out.push(
      (a[0] * k1 + b[0] * k2) * lift,
      (a[1] * k1 + b[1] * k2) * lift,
      (a[2] * k1 + b[2] * k2) * lift,
    );
  }
  return new Float32Array(out);
}

let land: Float32Array | null = null;
let arcs: { id: string; points: Float32Array }[] | null = null;

export interface EarthFrame {
  /** Longitude at the centre of the disc. */
  lon: number;
  /** 0..1: how much of every route has been drawn. */
  routes: number;
  labels: boolean;
  /** Seconds, for the pulse on the origin pin. */
  time: number;
}

export interface EarthPin {
  hotelCity: string | undefined;
  x: number;
  y: number;
}

/**
 * Draws a dotted Earth with Voyara's routes onto a square canvas context whose
 * CSS size is `size`. Returns the visible destination pins for hit testing.
 */
export function drawEarth(
  ctx: CanvasRenderingContext2D,
  size: number,
  frame: EarthFrame,
): EarthPin[] {
  land ??= buildLand();
  arcs ??= globeCities
    .slice(1)
    .map((c) => ({ id: c.id, points: buildArc(c.lat, c.lon) }));

  const R = size * 0.42;
  const cx = size / 2;
  const cy = size / 2;
  const c = rad(frame.lon);
  const [cc, sc, ct, st] = [
    Math.cos(c),
    Math.sin(c),
    Math.cos(TILT),
    Math.sin(TILT),
  ];
  const project = (x: number, y: number, z: number) => {
    const rx = x * cc - z * sc;
    const rz = x * sc + z * cc;
    return [
      cx + rx * R,
      cy - (y * ct - rz * st) * R,
      y * st + rz * ct,
    ] as const;
  };

  ctx.clearRect(0, 0, size, size);

  // Atmosphere, then the sphere itself.
  const glow = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.22);
  glow.addColorStop(0, "rgba(14,124,123,0.55)");
  glow.addColorStop(0.5, "rgba(201,162,75,0.12)");
  glow.addColorStop(1, "rgba(14,124,123,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
  ctx.fill();

  const body = ctx.createRadialGradient(
    cx - R * 0.35,
    cy - R * 0.4,
    R * 0.1,
    cx,
    cy,
    R,
  );
  body.addColorStop(0, "#14706f");
  body.addColorStop(0.6, "#0a3f4a");
  body.addColorStop(1, "#0c2431");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();

  // Land as dots, brighter toward the middle of the disc.
  const dot = Math.max(1.3, size / 230);
  for (let i = 0; i < land.length; i += 3) {
    const [x, y, z] = project(land[i], land[i + 1], land[i + 2]);
    if (z <= 0) continue;
    ctx.fillStyle = `rgba(215,227,227,${0.3 + z * 0.65})`;
    ctx.fillRect(x - dot / 2, y - dot / 2, dot, dot);
  }

  // Routes from Karachi, each a little later than the last.
  ctx.lineWidth = Math.max(1, size / 280);
  ctx.lineCap = "round";
  arcs.forEach((arc, index) => {
    const f = Math.min(1, Math.max(0, (frame.routes - index * 0.07) / 0.55));
    if (f <= 0) return;
    const last = Math.floor(f * ARC_STEPS);
    ctx.strokeStyle = "rgba(201,162,75,0.9)";
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i <= last; i++) {
      const [x, y, z] = project(
        arc.points[i * 3],
        arc.points[i * 3 + 1],
        arc.points[i * 3 + 2],
      );
      if (z < -0.02) {
        pen = false;
        continue;
      }
      if (pen) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
      pen = true;
    }
    ctx.stroke();
    if (f < 1 && last > 0) {
      const [x, y, z] = project(
        arc.points[last * 3],
        arc.points[last * 3 + 1],
        arc.points[last * 3 + 2],
      );
      if (z > 0) {
        ctx.fillStyle = "#fff6d8";
        ctx.beginPath();
        ctx.arc(x, y, dot * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });

  // Pins: the origin pulses, destinations carry labels in the large view.
  const pins: EarthPin[] = [];
  const scale = size / 200;
  globeCities.forEach((city, index) => {
    const [x, y, z] = project(...toVec(city.lat, city.lon));
    if (z <= 0.04) return;
    const origin = index === 0;
    if (origin) {
      const pulse = (frame.time * 0.8) % 1;
      ctx.strokeStyle = `rgba(201,162,75,${0.55 * (1 - pulse)})`;
      ctx.beginPath();
      ctx.arc(x, y, (4 + pulse * 14) * scale, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(201,162,75,0.25)";
    ctx.beginPath();
    ctx.arc(x, y, 8 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c9a24b";
    ctx.beginPath();
    ctx.arc(x, y, (origin ? 3.8 : 2.8) * scale, 0, Math.PI * 2);
    ctx.fill();
    if (frame.labels) {
      ctx.font = `700 ${Math.round(6.2 * scale)}px Manrope, sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = city.tag.end ? "right" : "left";
      ctx.fillText(
        city.label.toUpperCase(),
        x + city.tag.dx * scale,
        y + city.tag.dy * scale,
      );
    }
    if (!origin) pins.push({ hotelCity: city.hotelCity, x, y });
  });

  // Thin limb highlight.
  ctx.strokeStyle = "rgba(215,227,227,0.35)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  return pins;
}

/** "062°E" style readout for the HUD. */
export function formatLongitude(lon: number): string {
  const wrapped = ((((lon + 180) % 360) + 360) % 360) - 180;
  return `${String(Math.round(Math.abs(wrapped))).padStart(3, "0")}°${wrapped >= 0 ? "E" : "W"}`;
}
