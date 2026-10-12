"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { assetPath } from "@/constants/assets";

const VIDEO_WIDTH = 576;
const VIDEO_HEIGHT = 580;

export function HeroGreeting() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!stage || !video || !canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    const buffer = document.createElement("canvas");
    buffer.width = VIDEO_WIDTH;
    buffer.height = VIDEO_HEIGHT * 2;
    const bufferContext = buffer.getContext("2d", { willReadFrequently: true });
    if (!context || !bufferContext) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;
    let isDisposed = false;
    let animationFrame = 0;
    let lastTime = -1;
    let lastDrawAt = 0;

    const drawFrame = () => {
      if (video.readyState < 2 || lastTime === video.currentTime) return;
      lastTime = video.currentTime;
      bufferContext.drawImage(video, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT * 2);
      const pixels = bufferContext.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
      const mask = bufferContext.getImageData(0, VIDEO_HEIGHT, VIDEO_WIDTH, VIDEO_HEIGHT);
      for (let offset = 0; offset < pixels.data.length; offset += 4) {
        pixels.data[offset + 3] = mask.data[offset] ?? 0;
      }
      context.putImageData(pixels, 0, 0);
      stage.dataset.ready = "true";
    };

    const animate = (timestamp = 0) => {
      if (timestamp === 0 || timestamp - lastDrawAt >= 1000 / 24) {
        drawFrame();
        lastDrawAt = timestamp;
      }
      if (!video.paused && !video.ended && !isDisposed) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const stopAnimating = () => window.cancelAnimationFrame(animationFrame);
    const startAnimating = () => {
      stopAnimating();
      animate();
    };

    const restart = () => {
      if (!isVisible || document.hidden || motionPreference.matches || isDisposed) return;
      video.currentTime = 0;
      lastTime = -1;
      void video.play().then(() => {
        if (!isVisible || document.hidden || isDisposed) video.pause();
      }).catch(() => {});
    };

    const syncVisibility = () => {
      if (document.hidden || motionPreference.matches) video.pause();
      else restart();
    };

    video.muted = true;
    video.addEventListener("play", startAnimating);
    video.addEventListener("pause", stopAnimating);
    video.addEventListener("ended", drawFrame);
    video.addEventListener("loadeddata", drawFrame);
    video.addEventListener("seeked", drawFrame);
    document.addEventListener("visibilitychange", syncVisibility);
    window.addEventListener("pageshow", restart);
    motionPreference.addEventListener("change", syncVisibility);

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (!entry) return;
          const nextVisible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
          if (nextVisible === isVisible) return;
          isVisible = nextVisible;
          if (isVisible) restart();
          else video.pause();
        }, { threshold: [0, 0.15], rootMargin: "-64px 0px 0px 0px" })
      : null;

    if (observer) observer.observe(stage);
    else {
      isVisible = true;
      restart();
    }
    drawFrame();

    return () => {
      isDisposed = true;
      observer?.disconnect();
      stopAnimating();
      video.pause();
      video.removeEventListener("play", startAnimating);
      video.removeEventListener("pause", stopAnimating);
      video.removeEventListener("ended", drawFrame);
      video.removeEventListener("loadeddata", drawFrame);
      video.removeEventListener("seeked", drawFrame);
      document.removeEventListener("visibilitychange", syncVisibility);
      window.removeEventListener("pageshow", restart);
      motionPreference.removeEventListener("change", syncVisibility);
    };
  }, [pathname]);

  return (
    <div className="hero-greeting" ref={stageRef}>
      <div className="hero-greeting-glow" aria-hidden="true" />
      <div className="hero-greeting-art">
        <Image
          src={assetPath("images/hero-greeting.webp")}
          alt=""
          aria-hidden="true"
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          loading="eager"
          className="hero-greeting-poster"
        />
        <canvas
          ref={canvasRef}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          className="hero-greeting-canvas"
          role="img"
          aria-label="Animated portrait of Omid waving hello"
        />
      </div>
      <video
        ref={videoRef}
        src={assetPath("videos/hero-greeting.mp4")}
        muted
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
