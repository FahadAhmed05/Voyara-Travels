export interface GlobeCity {
  id: string;
  label: string;
  lat: number;
  lon: number;
  /** Hotel city to pre-select when the node is chosen; absent for the origin. */
  hotelCity?: string;
  /** Label offset so neighbouring cities never overprint each other. */
  tag: { dx: number; dy: number; end?: boolean };
}

/** Real coordinates; Karachi is the origin every Voyara journey leaves from. */
export const globeCities: GlobeCity[] = [
  {
    id: "karachi",
    label: "Karachi",
    lat: 24.86,
    lon: 67.01,
    tag: { dx: 7, dy: 10 },
  },
  {
    id: "dubai",
    label: "Dubai",
    lat: 25.2,
    lon: 55.27,
    hotelCity: "Dubai",
    tag: { dx: -7, dy: 10, end: true },
  },
  {
    id: "istanbul",
    label: "Istanbul",
    lat: 41.01,
    lon: 28.98,
    hotelCity: "Istanbul",
    tag: { dx: -7, dy: -5, end: true },
  },
  {
    id: "baku",
    label: "Baku",
    lat: 40.41,
    lon: 49.87,
    hotelCity: "Baku",
    tag: { dx: 7, dy: -7 },
  },
  {
    id: "maldives",
    label: "Maldives",
    lat: 4.18,
    lon: 73.51,
    hotelCity: "Malé",
    tag: { dx: -6, dy: 10, end: true },
  },
  {
    id: "hunza",
    label: "Hunza",
    lat: 36.32,
    lon: 74.65,
    hotelCity: "Hunza",
    tag: { dx: 7, dy: -3 },
  },
  {
    id: "kuala-lumpur",
    label: "Kuala Lumpur",
    lat: 3.14,
    lon: 101.69,
    hotelCity: "Kuala Lumpur",
    tag: { dx: 6, dy: -7 },
  },
];
