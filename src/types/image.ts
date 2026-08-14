export interface ImageMetadata {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;
}

export type ImagePriority = "high" | "low" | "auto";
