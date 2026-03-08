import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Stat = { value: string; label: string };
type Item = { title: string; body: string };

type Tab = {
  id: string;
  index: string;
  label: string;
  image: string;
  href: string;
  headline: string;
  lead: string;
  stats: Stat[];
  items: Item[];
  photos: string[];
  cta: { label: string; href: string };
};

const tabs: Tab[] = [
  {
    id: "events",
    index: "01",
    label: "Events",
    image: "/ai-hackathon-ii/4.jpg",
    href: "/commitments#events",
    headline: "Creating environments for connections",
    lead: "We started North Star because there was nowhere to find technical people in Belgium. Events are our bread and butter — rooms where people meet, find co-founders, and learn something new.",
    stats: [
      { value: "12", label: "Events in year one" },
      { value: "800+", label: "Builders in the room" },
      { value: "20+", label: "Hires through NS" },
    ],
    items: [
      { title: "Hackathons", body: "Full-day, half-day, and 2-day formats with 50–150 builders competing on real use cases." },
      { title: "SIGNAL Meetups", body: "Recurring AI & Robotics nights with speakers, demos, and open networking." },
      { title: "Workshops", body: "Hands-on OpenClaw, AI adoption, and robotics sessions for practitioners." },
    ],
    photos: ["/ai-hackathon-ii/4.jpg", "/signal-i/1.jpg"],
    cta: { label: "See all events", href: "/commitments#events" },
  },
  {
    id: "education",
    index: "02",
    label: "Education",
    image: "/kids-hackathon/1.png",
    href: "/commitments#education",
    headline: "The moment you knew what you wanted to do",
    lead: "That moment is what we're trying to create — for kids, for students, for professionals who never got the chance. Education at North Star is a bet that getting more people to build, earlier, compounds for everyone.",
    stats: [
      { value: "8", label: "Venues in one day" },
      { value: "6", label: "Cities across Belgium" },
      { value: "100+", label: "Kids in the room" },
    ],
    items: [
      { title: "North Star Kids", body: "Vibecoding hackathons for ages 8–16. The biggest edition of its kind in the world." },
      { title: "Journal Club", body: "Open paper-reading nights that make frontier research accessible without academic theater." },
      { title: "Workshops & Talks", body: "Hands-on sessions for students and professionals who need a practical on-ramp." },
    ],
    photos: ["/kids-hackathon/1.png", "/kids-hackathon/2.png"],
    cta: { label: "Education commitment", href: "/commitments#education" },
  },
  {
    id: "engineering",
    index: "03",
    label: "Engineering",
    image: "/robotics-i/3.jpg",
    href: "/commitments#engineering",
    headline: "Products that come from community friction",
    lead: "Every tool we build started as a problem we hit running North Star. That constraint produces software that's specific, opinionated, and actually used.",
    stats: [
      { value: "4", label: "Active projects" },
      { value: "2", label: "Live products" },
      { value: "1", label: "R&D residency format" },
    ],
    items: [
      { title: "Étoile", body: "AI-native event index for Belgium. Born from the pain of maintaining a manual calendar." },
      { title: "SimpleIdea", body: "Infrastructure for the kids hackathon — lets 8-year-olds ship working projects in an afternoon." },
      { title: "R&D Residencies", body: "1–2 week sprints at The Vessel. Engineers explore robotics and multi-agent systems together." },
    ],
    photos: ["/robotics-i/3.jpg", "/ai-hackathon-iii/4.jpg"],
    cta: { label: "Engineering commitment", href: "/commitments#engineering" },
  },
  {
    id: "ecosystem",
    index: "04",
    label: "Ecosystem",
    image: "/stripe-hackathon/1.png",
    href: "/commitments#ecosystem",
    headline: "Dots don't compound. Lines do.",
    lead: "North Star is a non-profit. We run on sponsorships, partnerships, and people who believe the Belgian tech ecosystem is worth building. The ecosystem commitment is the relationships that make everything else durable.",
    stats: [
      { value: "20+", label: "Partner orgs" },
      { value: "6", label: "Cities in Belgium" },
      { value: "EU", label: "Network reach" },
    ],
    items: [
      { title: "Partner orgs", body: "Universities, venues, labs, and local communities that create density across Belgium." },
      { title: "European network", body: "Cross-border trips and collaborations with peer communities in London, Berlin, Paris, and Amsterdam." },
      { title: "Long-term trust", body: "The real asset is the network of people willing to build together again. Every handshake is infrastructure." },
    ],
    photos: ["/stripe-hackathon/1.png", "/signal-i/12.jpg"],
    cta: { label: "Ecosystem commitment", href: "/commitments#ecosystem" },
  },
];

const mono = '"Geist", sans-serif';
const serif = '"Instrument Serif", serif';

export function CommitmentsShowcase() {
  const [activeId, setActiveId] = useState<string>("events");
  const active = tabs.find((t) => t.id === activeId)!;

  return (
    <div style={{ width: "100%" }}>
      {/* Tab bar */}
      <div
        role="tablist"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              style={{
                position: "relative",
                height: "160px",
                overflow: "hidden",
                cursor: "pointer",
                border: "none",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                background: "transparent",
                padding: "1rem 1.2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                gap: "0.15rem",
              }}
            >
              {/* BG photo */}
              <img
                src={tab.image}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: isActive
                    ? "brightness(0.42) saturate(0.65)"
                    : "brightness(0.18) saturate(0.3)",
                  transition: "filter 400ms ease",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 80%)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
              {/* Bottom active indicator */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "rgba(255,255,255,0.55)",
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Index */}
              <span
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: mono,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  color: isActive ? "rgba(255,255,255,0.44)" : "rgba(255,255,255,0.28)",
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                {tab.index}
              </span>
              {/* Label */}
              <span
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.38)",
                  lineHeight: 1,
                  transition: "color 300ms ease",
                  pointerEvents: "none",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div
        key={activeId}
        style={{
          padding: "2.4rem 1.5rem 0",
          maxWidth: "900px",
          margin: "0 auto",
          animation: "ns-panel-in 240ms ease forwards",
        }}
      >
        {/* Header: headline + stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "start",
            marginBottom: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: mono,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                margin: "0 0 0.9rem",
              }}
            >
              {active.index} · {active.label}
            </p>
            <h2
              style={{
                fontFamily: mono,
                fontSize: "clamp(1.1rem, 2vw, 1.55rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                color: "rgba(255,255,255,0.90)",
                margin: "0 0 0.9rem",
              }}
            >
              {active.headline}
            </h2>
            <p
              style={{
                fontFamily: mono,
                fontSize: "0.78rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.48)",
                margin: 0,
                maxWidth: "58ch",
              }}
            >
              {active.lead}
            </p>
          </div>

          {/* Stats column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "0.75rem",
              overflow: "hidden",
              flexShrink: 0,
              minWidth: "140px",
            }}
          >
            {active.stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "0.85rem 1.1rem",
                  borderBottom: i < active.stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.88)",
                    margin: "0 0 0.15rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    margin: 0,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Body: items + photos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.8rem",
          }}
        >
          {/* Format/pillar items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {active.items.map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.65rem",
                  padding: "0.9rem 1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.72)",
                    margin: "0 0 0.35rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.36)",
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Photos */}
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "0.35rem" }}>
            {active.photos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.65rem",
                  display: "block",
                  filter: "brightness(0.75) saturate(0.7)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            paddingTop: "1.4rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <a
            href={active.cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: mono,
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.52)",
              textDecoration: "none",
            }}
          >
            {active.cta.label} <ArrowRight style={{ width: "13px", height: "13px" }} />
          </a>
        </div>
      </div>
    </div>
  );
}
