import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import type { ImageMetadata } from "@/types/image";

interface OptimizedImageProps
  extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  image: ImageMetadata;
  className?: string;
}

const FALLBACK_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxNzFkMjkiLz48L3N2Zz4=";

export function OptimizedImage({
  image,
  className,
  priority = false,
  sizes,
  ...rest
}: OptimizedImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      placeholder="blur"
      blurDataURL={image.blurDataUrl ?? FALLBACK_BLUR_DATA_URL}
      priority={priority}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      className={cn("object-cover", className)}
      {...rest}
    />
  );
}

export function AvatarImage({
  image,
  size = 96,
  className,
}: {
  image: ImageMetadata;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={size}
      height={size}
      placeholder="blur"
      blurDataURL={image.blurDataUrl ?? FALLBACK_BLUR_DATA_URL}
      priority
      className={cn("rounded-full object-cover", className)}
    />
  );
}
