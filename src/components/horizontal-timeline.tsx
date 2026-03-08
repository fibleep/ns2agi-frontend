"use client";

import * as React from "react";
import { getEventLink } from "@/lib/event-routes";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  status: "completed" | "upcoming" | "coming-soon";
  organizationType?: "ORGANIZED" | "CONTRIBUTED";
  link?: string;
}

interface HorizontalTimelineProps {
  events: Event[];
  compact?: boolean;
  initialScrollTarget?: "start" | "end";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function HorizontalTimeline({ events, initialScrollTarget = "start" }: HorizontalTimelineProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);

  const sortedEvents = React.useMemo(() => {
    if (!events || events.length === 0) return [];
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (initialScrollTarget === "end") {
      const scroll = () => { container.scrollLeft = container.scrollWidth - container.clientWidth; };
      scroll();
      const raf = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(raf);
    }
  }, [sortedEvents, initialScrollTarget]);

  React.useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;
    if (!container || !thumb) return;
    const update = () => {
      const max = container.scrollWidth - container.clientWidth;
      if (max <= 0) { thumb.style.display = "none"; return; }
      const pct = container.scrollLeft / max;
      thumb.style.left = `${pct * 60}%`;
    };
    update();
    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, [sortedEvents]);

  if (!events || events.length === 0) return null;

  const today = new Date();

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        ref={containerRef}
        className="horizontal-timeline-scroll"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "auto",
          paddingBottom: "1rem",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "clamp(1rem, 2.5vw, 1.8rem)",
            padding: "0.5rem clamp(1rem, 4vw, 3rem) 0.5rem",
            width: "max-content",
          }}
        >
          {sortedEvents.map((event) => {
            const eventDate = new Date(event.date);
            const isPast = eventDate < today;
            const href = event.link || getEventLink(event.id);

            return (
              <a
                key={event.id}
                href={href}
                className="ht-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  width: "clamp(200px, 22vw, 290px)",
                  flexShrink: 0,
                  textDecoration: "none",
                  opacity: isPast ? 0.7 : 1,
                  transition: "opacity 300ms ease",
                }}
              >
                {/* Date */}
                <span style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  lineHeight: 1,
                }}>
                  {formatDate(event.date)}
                </span>

                {/* Image */}
                <div className="ht-img-wrap" style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  borderRadius: "0.6rem",
                  background: "rgba(255,255,255,0.03)",
                }}>
                  {event.thumbnail ? (
                    <img
                      src={event.thumbnail}
                      alt=""
                      className="ht-img"
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: event.thumbnail.endsWith(".svg") ? "contain" : "cover",
                        padding: event.thumbnail.endsWith(".svg") ? "1.5rem" : 0,
                        filter: "brightness(0.42) saturate(0.55)",
                        transform: "scale(1.04)",
                        transition: "transform 500ms cubic-bezier(0.2, 0.85, 0.25, 1), filter 400ms ease",
                      }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.02)" }} />
                  )}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }} />
                  <span style={{
                    position: "absolute",
                    top: "0.6rem",
                    right: "0.6rem",
                    fontFamily: '"Geist", sans-serif',
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: isPast ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.82)",
                    background: isPast ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "9999px",
                    border: isPast ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.18)",
                  }}>
                    {isPast ? "Past" : "Upcoming"}
                  </span>
                </div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
                  <h3 style={{
                    margin: 0,
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.15,
                  }}>
                    {event.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontFamily: '"Geist", sans-serif',
                    fontSize: "0.78rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.35)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    flex: 1,
                  }}>
                    {event.description}
                  </p>
                  {event.organizationType && (
                    <span style={{
                      marginTop: "auto",
                      paddingTop: "0.3rem",
                      fontFamily: '"Geist", sans-serif',
                      fontSize: "0.65rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                    }}>
                      {event.organizationType}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Fade edges */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0,
        width: "clamp(3rem, 8vw, 6rem)",
        background: "linear-gradient(to right, #0f0e0c, transparent)",
        pointerEvents: "none", zIndex: 2,
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0,
        width: "clamp(3rem, 8vw, 6rem)",
        background: "linear-gradient(to left, #0f0e0c, transparent)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* Scroll progress track */}
      <div className="ht-scrollbar-track">
        <div className="ht-scrollbar-thumb" ref={thumbRef} />
      </div>

      <style>{`
        .ht-card:hover .ht-img {
          transform: scale(1) !important;
          filter: brightness(0.62) saturate(0.75) !important;
        }
        .ht-card:hover {
          opacity: 1 !important;
        }
        .horizontal-timeline-scroll::-webkit-scrollbar {
          display: none;
        }
        .ht-scrollbar-track {
          width: clamp(60px, 12vw, 120px);
          height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 1px;
          margin: 1rem auto 0;
          position: relative;
          overflow: hidden;
        }
        .ht-scrollbar-thumb {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 40%;
          background: rgba(255,255,255,0.28);
          border-radius: 1px;
          transition: left 100ms ease-out;
        }
      `}</style>
    </div>
  );
}
