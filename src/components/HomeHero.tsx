import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

const WORDMARK = "NORTH\u00a0STAR";
const TAGLINE = "Built at the Heart of Europe";
const HERO_IMAGE = "/signal-i/7.jpg";

export function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const dockedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const starScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.12]);
  const starOpacity = useTransform(scrollYProgress, [0, 0.6], [0.88, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  const dispatchDock = useCallback((docked: boolean) => {
    if (dockedRef.current === docked) return;
    dockedRef.current = docked;
    window.dispatchEvent(
      new CustomEvent("ns:star-dock", { detail: { docked } })
    );
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    dispatchDock(v > 0.25);
  });

  useEffect(() => {
    return () => {
      window.dispatchEvent(
        new CustomEvent("ns:star-dock", { detail: { docked: false } })
      );
    };
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          y: bgY,
        }}
        aria-hidden="true"
      >
        <img
          src={HERO_IMAGE}
          alt=""
          style={{
            display: "block",
            width: "100%",
            height: "130%",
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: "brightness(0.25) saturate(0.45)",
          }}
        />
      </motion.div>

      {/* Gradient fade to bg at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 50%, #0f0e0c 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center" as const,
          gap: "1rem",
          padding: "0 1.5rem",
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        {/* Star */}
        <motion.div
          data-cstory-star
          style={{
            width: "clamp(56px, 12vw, 120px)",
            height: "clamp(56px, 12vw, 120px)",
            flexShrink: 0,
            marginBottom: "0.5rem",
            scale: starScale,
            opacity: starOpacity,
          }}
        >
          <img
            src="/nsstar-clean.svg"
            alt="North Star"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              filter: "drop-shadow(0 0 18px rgba(255,255,255,0.15))",
            }}
          />
        </motion.div>

        {/* Wordmark */}
        <h1
          aria-label="North Star"
          style={{
            margin: 0,
            fontFamily: '"Geist", sans-serif',
            fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
            letterSpacing: "0.28em",
            fontWeight: 700,
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1,
            overflow: "hidden",
          }}
        >
          {WORDMARK.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.035,
                duration: 0.6,
                ease: [0.2, 0.85, 0.25, 1],
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          style={{
            margin: 0,
            fontFamily: '"Instrument Serif", serif',
            fontStyle: "italic",
            fontSize: "clamp(0.95rem, 1.3vw, 1.25rem)",
            color: "rgba(255,255,255,0.32)",
            lineHeight: 1.5,
          }}
        >
          {TAGLINE}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            animation: "hero-scroll-pulse 2.5s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
