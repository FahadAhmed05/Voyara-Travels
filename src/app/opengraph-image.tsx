import { ImageResponse } from "next/og";

export const alt = "Voyara Travels — your journey, planned with care";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 80,
        color: "#ffffff",
        background:
          "linear-gradient(135deg, #0C2431 0%, #0A5E5D 55%, #0E7C7B 100%)",
      }}
    >
      <div style={{ fontSize: 28, letterSpacing: 6, color: "#C9A24B" }}>
        VOYARA TRAVELS
      </div>
      <div style={{ fontSize: 84, lineHeight: 1.05, marginTop: 24 }}>
        The world is waiting.
      </div>
      <div style={{ fontSize: 84, lineHeight: 1.05, color: "#C9A24B" }}>
        Go beautifully.
      </div>
      <div style={{ fontSize: 30, marginTop: 32, color: "#D7E3E3" }}>
        Visas · Flights · Hotels · Car rental
      </div>
    </div>,
    size,
  );
}
