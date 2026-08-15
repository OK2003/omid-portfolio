"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/constants/assets";

export function GuardianVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="guardian-video"
      autoPlay={isReady}
      loop
      muted
      playsInline
      preload={isReady ? "metadata" : "none"}
      poster={assetPath("images/guardian-of-iran.webp")}
      aria-label="Animated golden winged guardian standing before the map of Iran"
    >
      {isReady && (
        <source src={assetPath("videos/guardian-of-iran-lite.mp4")} type="video/mp4" />
      )}
    </video>
  );
}
