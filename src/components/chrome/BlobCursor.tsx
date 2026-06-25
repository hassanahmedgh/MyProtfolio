"use client";

import { useEffect, useRef, useState } from "react";

// Off-white blob that lerp-follows the mouse and grows over [data-hover] targets.
// Mounts ONLY on fine-pointer (mouse) devices — on touch it renders nothing and
// attaches no listeners, so a tap can never leave a stuck dot.
export default function BlobCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    let size = 14;
    let tsize = 14;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const hot = target?.closest?.("a, button, [data-hover]");
      tsize = hot ? 46 : 14;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    const loop = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      size += (tsize - size) * 0.2;
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={dotRef} className="blob-cursor" aria-hidden="true" />;
}
