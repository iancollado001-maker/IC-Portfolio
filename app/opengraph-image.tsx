import { ImageResponse } from "next/og";
import { OgImageContent, ogImageAlt, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = ogImageAlt;

export default function OpengraphImage() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
