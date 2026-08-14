import type { ImageMetadata } from "@/types/image";

export const IMAGES = {
  avatar: {
    src: "/images/avatar.jpg",
    alt: "Portrait of Omid Reza KeyShams",
    width: 192,
    height: 192,
  },
  ogDefault: {
    src: "/images/og-image.png",
    alt: "Omid Reza KeyShams - Petroleum Engineer & Software Developer",
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, ImageMetadata>;
