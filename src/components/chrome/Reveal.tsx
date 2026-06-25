"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Scroll-reveal wrapper (IntersectionObserver). To avoid a flash, content that is
// already in view on mount is left visible; only below-the-fold content is hidden
// and then revealed on scroll. No-ops under prefers-reduced-motion. 4s safety net
// guarantees content is never left invisible.
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.92;
    if (alreadyVisible) return;

    el.classList.add("reveal-init");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            el.classList.add("reveal-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    const safety = window.setTimeout(() => {
      el.classList.add("reveal-in");
      io.disconnect();
    }, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
