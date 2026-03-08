import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

type Stat = { value: string; label: string };

interface Commitment {
  id: string;
  index: string;
  title: string;
  headline: string;
  lead: string;
  image: string;
  href: string;
  stats: Stat[];
}

const mono = '"Geist", sans-serif';
const serif = '"Instrument Serif", serif';
const sans = '"Geist", sans-serif';

const commitments: Commitment[] = [
  {
    id: "events",
    index: "01",
    title: "Events",
    headline: "Creating environments for connections",
    lead: "We started North Star because there was nowhere to find technical people in Belgium. Events are our bread and butter\u2009\u2014\u2009rooms where people meet, find co-founders, and learn something new.",
    image: "/ai-hackathon-ii/4.jpg",
    href: "/commitments#events",
    stats: [
      { value: "12", label: "Events in year one" },
      { value: "800+", label: "Builders in the room" },
      { value: "20+", label: "Hires through NS" },
    ],
  },
  {
    id: "education",
    index: "02",
    title: "Education",
    headline: "The moment you knew what you wanted to do",
    lead: "That moment is what we\u2019re trying to create\u2009\u2014\u2009for kids, for students, for professionals who never got the chance. Education at North Star is a bet that getting more people to build, earlier, compounds for everyone.",
    image: "/kids-hackathon/1.png",
    href: "/commitments#education",
    stats: [
      { value: "8", label: "Venues in one day" },
      { value: "6", label: "Cities across Belgium" },
      { value: "100+", label: "Kids in the room" },
    ],
  },
  {
    id: "engineering",
    index: "03",
    title: "Engineering",
    headline: "Products that come from community friction",
    lead: "Every tool we build started as a problem we hit running North Star. That constraint produces software that\u2019s specific, opinionated, and actually used.",
    image: "/robotics-i/1.jpg",
    href: "/commitments#engineering",
    stats: [
      { value: "4", label: "Active projects" },
      { value: "2", label: "Live products" },
      { value: "1", label: "R&D residency format" },
    ],
  },
  {
    id: "ecosystem",
    index: "04",
    title: "Ecosystem",
    headline: "Dots don\u2019t compound. Lines do.",
    lead: "North Star is a non-profit. We run on sponsorships, partnerships, and people who believe the Belgian tech ecosystem is worth building. The ecosystem commitment is the relationships that make everything else durable.",
    image: "/signal-i/22.jpg",
    href: "/commitments#ecosystem",
    stats: [
      { value: "20+", label: "Partner orgs" },
      { value: "6", label: "Cities in Belgium" },
      { value: "EU", label: "Network reach" },
    ],
  },
];

function CommitmentCard({
  commitment,
  index,
  total,
}: {
  commitment: Commitment;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 1], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.85], [0, 1]);

  return (
    <div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `${index * 14}px`,
        zIndex: index + 1,
        height: "min(90vh, 780px)",
        marginBottom: index < total - 1 ? "4vh" : "0",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "clamp(0.75rem, 1.5vw, 1.25rem)",
          overflow: "hidden",
          background: "#0f0e0c",
        }}
      >
        {/* Background photo */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            scale: imgScale,
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          <img
            src={commitment.image}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.3) saturate(0.5)",
            }}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,14,12,0.92) 0%, rgba(15,14,12,0.35) 40%, transparent 70%), linear-gradient(to right, rgba(15,14,12,0.45) 0%, transparent 50%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* Top edge line for stacking depth */}
        {index > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              zIndex: 3,
              boxShadow: "0 -6px 16px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            padding: "clamp(1.5rem, 4vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "0.55rem",
            maxWidth: "680px",
            y: contentY,
            opacity: contentOpacity,
          }}
        >
          {/* Index */}
          <span
            style={{
              fontFamily: mono,
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase" as const,
            }}
          >
            {commitment.index}
          </span>

          {/* Title */}
          <h2
            style={{
              margin: 0,
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            {commitment.title}
          </h2>

          {/* Headline */}
          <p
            style={{
              margin: 0,
              fontFamily: mono,
              fontSize: "clamp(0.72rem, 0.9vw, 0.85rem)",
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.4,
            }}
          >
            {commitment.headline}
          </p>

          {/* Lead */}
          <p
            style={{
              margin: 0,
              fontFamily: sans,
              fontSize: "clamp(0.82rem, 1vw, 0.95rem)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.38)",
              maxWidth: "52ch",
            }}
          >
            {commitment.lead}
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
              marginTop: "0.4rem",
            }}
          >
            {commitment.stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.12rem",
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.26)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={commitment.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.4rem",
              fontFamily: mono,
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.48)",
              textDecoration: "none",
            }}
          >
            Explore {commitment.title.toLowerCase()}
            <ArrowRight style={{ width: "13px", height: "13px" }} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export function StickyCommitments() {
  return (
    <section style={{ padding: "3rem 0 0" }}>
      <div
        style={{ textAlign: "center" as const, marginBottom: "2.5rem", padding: "0 1.5rem" }}
        data-reveal
      >
        <span
          style={{
            display: "block",
            fontFamily: mono,
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.28)",
            marginBottom: "0.6rem",
          }}
        >
          What we do
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.1,
          }}
        >
          Four commitments
        </h2>
      </div>

      <div
        style={{
          padding: "0 clamp(0.75rem, 2vw, 1.5rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {commitments.map((c, i) => (
          <CommitmentCard
            key={c.id}
            commitment={c}
            index={i}
            total={commitments.length}
          />
        ))}
      </div>
    </section>
  );
}
