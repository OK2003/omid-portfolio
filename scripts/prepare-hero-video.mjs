import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir } from "node:fs/promises";

const inputPath = process.argv[2];
if (!inputPath) throw new Error("Provide the source video path.");
const width = 576;
const height = 580;
const pixelCount = width * height;
const frameBytes = pixelCount * 4;
await mkdir("public/videos", { recursive: true });
await mkdir("public/images", { recursive: true });

function ffmpeg(args) {
  const child = spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args]);
  child.stderr.pipe(process.stderr);
  return child;
}

function removeBackground(frame) {
  const visited = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let queueStart = 0;
  let queueEnd = 0;
  const visit = (index) => {
    if (visited[index]) return;
    visited[index] = 1;
    const offset = index * 4;
    const minimum = Math.min(frame[offset], frame[offset + 1], frame[offset + 2]);
    const maximum = Math.max(frame[offset], frame[offset + 1], frame[offset + 2]);
    if (minimum < 180 || maximum - minimum > 38) return;
    queue[queueEnd++] = index;
    frame[offset + 3] = 0;
  };
  for (let column = 0; column < width; column++) {
    visit(column);
    visit((height - 1) * width + column);
  }
  for (let row = 0; row < height; row++) {
    visit(row * width);
    visit(row * width + width - 1);
  }
  while (queueStart < queueEnd) {
    const index = queue[queueStart++];
    if (index % width > 0) visit(index - 1);
    if (index % width < width - 1) visit(index + 1);
    if (index >= width) visit(index - width);
    if (index < pixelCount - width) visit(index + width);
  }
  return frame;
}

const decoder = ffmpeg(["-i", inputPath, "-an", "-vf", `scale=${width}:${height},fps=24`, "-f", "rawvideo", "-pix_fmt", "rgba", "pipe:1"]);
const encoder = ffmpeg(["-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-r", "24", "-i", "pipe:0", "-filter_complex", "[0:v]split[color][mask];[color]format=rgb24[color];[mask]alphaextract,gblur=sigma=0.65,format=rgb24[mask];[color][mask]vstack[packed]", "-map", "[packed]", "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "public/videos/hero-greeting.mp4"]);
const decoderDone = once(decoder, "close");
const encoderDone = once(encoder, "close");
let pending = Buffer.alloc(0);
let frameCount = 0;
let posterDone;
for await (const chunk of decoder.stdout) {
  pending = Buffer.concat([pending, chunk]);
  while (pending.length >= frameBytes) {
    const frame = removeBackground(Buffer.from(pending.subarray(0, frameBytes)));
    pending = pending.subarray(frameBytes);
    if (frameCount === 0) {
      const poster = ffmpeg(["-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${width}x${height}`, "-i", "pipe:0", "-frames:v", "1", "-c:v", "libwebp", "-lossless", "1", "public/images/hero-greeting.webp"]);
      posterDone = once(poster, "close");
      poster.stdin.end(frame);
    }
    if (!encoder.stdin.write(frame)) await once(encoder.stdin, "drain");
    frameCount++;
  }
}
encoder.stdin.end();
const results = await Promise.all([decoderDone, encoderDone, posterDone]);
if (results.some(([code]) => code !== 0)) throw new Error("Video preparation failed.");
console.log(`Prepared ${frameCount} transparent frames and a poster.`);
