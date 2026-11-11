"use client";

import { useEffect, useRef } from "react";

type Effect =
  | "network"
  | "contours"
  | "constellation"
  | "circuit"
  | "topology"
  | "orbits"
  | "aurora";
type Point = { x: number; y: number };
type Draw = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Point,
) => void;

const violet = (alpha: number) => `rgba(179,170,255,${alpha})`;
const blue = (alpha: number) => `rgba(116,174,215,${alpha})`;
const teal = (alpha: number) => `rgba(126,198,181,${alpha})`;
const seed = (index: number) => {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

function dot(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
}

function travel(
  context: CanvasRenderingContext2D,
  points: Point[],
  progress: number,
  color: string,
) {
  const lengths = points
    .slice(1)
    .map((point, index) =>
      Math.hypot(point.x - points[index].x, point.y - points[index].y),
    );
  let distance =
    progress * lengths.reduce((total, length) => total + length, 0);
  for (let index = 0; index < lengths.length; index++) {
    if (distance <= lengths[index]) {
      const fraction = lengths[index] ? distance / lengths[index] : 0;
      dot(
        context,
        points[index].x + (points[index + 1].x - points[index].x) * fraction,
        points[index].y + (points[index + 1].y - points[index].y) * fraction,
        2,
        color,
      );
      return;
    }
    distance -= lengths[index];
  }
}

const drawEffects: Record<Effect, Draw> = {
  network(context, width, height, time, pointer) {
    const count = width < 600 ? 25 : 46;
    const points = Array.from({ length: count }, (_, index) => ({
      x:
        seed(index + 1) * width +
        Math.sin(time * 0.12 + index) * 18 +
        pointer.x * 9,
      y:
        seed(index + 80) * height +
        Math.cos(time * 0.1 + index * 2) * 15 +
        pointer.y * 9,
    }));
    points.forEach((point, index) => {
      points.slice(index + 1).forEach((other) => {
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance > 165) return;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = violet(0.19 * (1 - distance / 165));
        context.stroke();
      });
      dot(
        context,
        point.x,
        point.y,
        index % 6 === 0 ? 2 : 1.2,
        violet(0.2 + Math.sin(time * 0.5 + index) * 0.07),
      );
      if (index % 9 === 0) dot(context, point.x, point.y, 5, violet(0.035));
    });
  },
  contours(context, width, height, time) {
    for (let index = 0; index < 8; index++) {
      const base = (height * (index + 1)) / 9;
      const drift = Math.sin(time * 0.13 + index * 0.6) * 30;
      context.beginPath();
      context.moveTo(-70, base + 90);
      context.bezierCurveTo(
        width * 0.27,
        base - 160 + drift,
        width * 0.65,
        base + 130 - drift,
        width + 70,
        base - 90,
      );
      context.strokeStyle = (index % 2 ? teal : violet)(0.09);
      context.stroke();
      context.setLineDash([4, 65]);
      context.lineDashOffset = -time * 10 - index * 35;
      context.strokeStyle = (index % 2 ? teal : violet)(0.26);
      context.stroke();
      context.setLineDash([]);
    }
  },
  constellation(context, width, height, time) {
    for (let index = 0; index < 36; index++) {
      const x = seed(index + 22) * width + Math.sin(time * 0.09 + index) * 6;
      const y = seed(index + 120) * height + Math.cos(time * 0.1 + index) * 7;
      const alpha = 0.12 + (Math.sin(time * 0.45 + index * 2) + 1) * 0.07;
      dot(context, x, y, 1.1, blue(alpha));
      if (index % 8 === 0) {
        context.beginPath();
        context.moveTo(x - 4, y);
        context.lineTo(x + 4, y);
        context.moveTo(x, y - 4);
        context.lineTo(x, y + 4);
        context.strokeStyle = violet(alpha);
        context.stroke();
      }
      if (index % 5 === 0) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 35, y - 22);
        context.lineTo(x + 79, y + 3);
        context.strokeStyle = blue(0.08);
        context.stroke();
      }
    }
  },
  circuit(context, width, height, time) {
    for (let index = 0; index < 9; index++) {
      const y = ((index + 0.5) / 9) * height;
      const bend = width * (0.2 + seed(index + 9) * 0.55);
      const rise = index % 2 ? 36 : -36;
      const points = [
        { x: -25, y },
        { x: bend, y },
        { x: bend + 36, y: y + rise },
        { x: width + 25, y: y + rise },
      ];
      context.beginPath();
      points.forEach((point, pointIndex) =>
        pointIndex
          ? context.lineTo(point.x, point.y)
          : context.moveTo(point.x, point.y),
      );
      context.strokeStyle = blue(0.08);
      context.stroke();
      dot(context, bend, y, 2, blue(0.18));
      travel(context, points, (time * 0.026 + index * 0.173) % 1, teal(0.36));
    }
  },
  topology(context, width, height, time) {
    const spacing = 74;
    context.strokeStyle = blue(0.045);
    for (let x = 0; x < width; x += spacing) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += spacing) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    for (let index = 0; index < 8; index++) {
      const x = Math.round((seed(index + 30) * width) / spacing) * spacing;
      const y = Math.round((seed(index + 60) * height) / spacing) * spacing;
      const points = [
        { x, y: y - spacing },
        { x, y },
        { x: x + spacing * 2, y },
        { x: x + spacing * 2, y: y + spacing },
      ];
      context.beginPath();
      points.forEach((point, pointIndex) =>
        pointIndex
          ? context.lineTo(point.x, point.y)
          : context.moveTo(point.x, point.y),
      );
      context.strokeStyle = violet(0.11);
      context.stroke();
      travel(context, points, (time * 0.045 + index * 0.19) % 1, violet(0.38));
    }
  },
  orbits(context, width, height, time) {
    const centerX = width * 0.88;
    const centerY = height * 0.56;
    for (let index = 0; index < 5; index++) {
      const radiusX = width * 0.23 + index * 43;
      const radiusY = 70 + index * 34;
      const rotation = -0.45;
      context.beginPath();
      context.ellipse(
        centerX,
        centerY,
        radiusX,
        radiusY,
        rotation,
        0,
        Math.PI * 2,
      );
      context.strokeStyle = violet(0.085);
      context.stroke();
      const angle = time * (0.065 - index * 0.006) + index * 1.7;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;
      dot(
        context,
        centerX + x * Math.cos(rotation) - y * Math.sin(rotation),
        centerY + x * Math.sin(rotation) + y * Math.cos(rotation),
        2.2,
        blue(0.4),
      );
    }
  },
  aurora(context, width, height, time) {
    for (let index = 0; index < 4; index++) {
      const y = height * (0.45 + index * 0.12);
      const drift = Math.sin(time * 0.18 + index * 0.8) * 35;
      const gradient = context.createLinearGradient(0, y - 100, width, height);
      gradient.addColorStop(0, violet(0));
      gradient.addColorStop(0.48, violet(0.045));
      gradient.addColorStop(0.78, blue(0.065));
      gradient.addColorStop(1, teal(0.015));
      context.beginPath();
      context.moveTo(-40, y + 60);
      context.bezierCurveTo(
        width * 0.32,
        y - 160 + drift,
        width * 0.7,
        y + 100 - drift,
        width + 40,
        y - 100,
      );
      context.lineTo(width + 40, height + 40);
      context.lineTo(-40, height + 40);
      context.closePath();
      context.fillStyle = gradient;
      context.fill();
    }
  },
};

export function SectionBackground({ effect }: { effect: Effect }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const surface = canvas?.parentElement;
    const section = surface?.parentElement;
    if (!canvas || !surface || !section) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0,
      lastTime = 0,
      elapsed = 0;
    let visible = false;
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.8;
      drawEffects[effect](
        context,
        width,
        height,
        motion.matches ? 0 : elapsed,
        pointer,
      );
    };
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const delta = now - lastTime;
      if (delta < (width < 600 ? 1000 / 24 : 1000 / 30)) return;
      elapsed += Math.min(delta / 1000, 0.1);
      lastTime = now;
      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;
      draw();
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!visible || document.hidden) return;
      if (motion.matches) {
        draw();
        return;
      }
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = surface.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      // Bound backing-store size on long sections and high-density phones.
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        1.5,
        Math.sqrt(2_000_000 / (width * height)),
      );
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || motion.matches) return;
      const bounds = section.getBoundingClientRect();
      target.x = (event.clientX - bounds.left) / bounds.width - 0.5;
      target.y = (event.clientY - bounds.top) / bounds.height - 0.5;
    };
    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "80px" },
    );
    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    intersection.observe(section);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    if (effect === "network") {
      section.addEventListener("pointermove", onPointerMove, { passive: true });
      section.addEventListener("pointerleave", onPointerLeave);
    }
    resize();
    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [effect]);

  return (
    <div
      className={`section-background section-background-${effect}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
