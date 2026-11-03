import { ImageResponse } from "next/og";

// Ícono para la pantalla de inicio del iPhone (180x180)
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1117",
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "6px solid #D4A847",
            borderRadius: 30,
            color: "#D4A847",
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          LC
        </div>
      </div>
    ),
    { ...size }
  );
}
