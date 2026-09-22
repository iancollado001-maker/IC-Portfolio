import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0c0c",
          borderRadius: 7,
          color: "#f2f3f0",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          letterSpacing: -0.5,
        }}
      >
        IC
      </div>
    ),
    { ...size }
  );
}
