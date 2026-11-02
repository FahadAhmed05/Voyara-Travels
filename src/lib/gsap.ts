import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// The only place plugins are registered; import GSAP from here everywhere.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** matchMedia conditions shared by every animated section. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const TABLET_UP = `(min-width: 768px) and ${MOTION_OK}`;
export const DESKTOP = `(min-width: 1024px) and ${MOTION_OK}`;

export { gsap, ScrollTrigger, SplitText, useGSAP };
