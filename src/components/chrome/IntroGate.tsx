"use client";

import { useEffect, useState, type ReactNode } from "react";

type Phase = "intro" | "dropping" | "portfolio";
const SESSION_KEY = "intro-seen";

// Water-drop intro state machine. The portfolio content (children) is always in
// the DOM — good for crawlers — and the opaque intro overlay sits on top until
// the user enters. Shows once per session; bypassed under reduced motion.
export default function IntroGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(SESSION_KEY) === "1";
    if (reduce || seen) setPhase("portfolio");
  }, []);

  const enter = () => {
    if (phase !== "intro") return;
    setPhase("dropping");
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sessionStorage unavailable — ignore */
    }
    // Timings preserved from the prototype.
    window.setTimeout(() => {
      setPhase("portfolio");
      window.scrollTo(0, 0);
    }, 1050);
  };

  return (
    <>
      {children}

      {phase !== "portfolio" && (
        <div className="intro" role="dialog" aria-label="Intro">
          <div className="intro-top">
            <span>Portfolio &apos;26</span>
            <span>Frontend / Web</span>
          </div>

          <div className="intro-center">
            <div className="intro-welcome">welcome</div>
            <h1 className="intro-title">
              get to
              <br />
              know me
            </h1>
            <p className="intro-sub">
              a frontend developer who builds fast, responsive, production-ready
              web apps. step inside.
            </p>
          </div>

          <button
            type="button"
            onClick={enter}
            data-hover="1"
            className="intro-enter"
            aria-label="Enter portfolio"
          >
            <span className="pulse" />
            <span className="label">click here</span>
          </button>
        </div>
      )}

      {phase === "dropping" && <div className="waterdrop" aria-hidden="true" />}
    </>
  );
}
