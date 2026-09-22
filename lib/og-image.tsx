import { personal } from "./site-config";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageAlt = "Ian L. Collado — Software Developer Portfolio";

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#08090a",
        color: "#f2f3f0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#93968f",
          fontSize: 22,
          letterSpacing: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#f2f3f0",
          }}
        />
        SOFTWARE DEVELOPER
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        {personal.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 30,
          color: "#93968f",
          maxWidth: 900,
        }}
      >
        {personal.tagline}
      </div>
    </div>
  );
}
