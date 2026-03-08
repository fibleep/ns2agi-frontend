import { useRef } from "react";
import { motion, useInView } from "motion/react";

/* ─── Types ─── */
interface TeamMember {
  name: string;
  img: string;
}

interface EditorialProseProps {
  team: TeamMember[];
}

/* ─── Inline team avatars ─── */
function TeamAvatars({ team }: { team: TeamMember[] }) {
  return (
    <span className="cp-avatars">
      {team.map((m) => (
        <motion.span
          key={m.name}
          className="cp-av"
          whileHover={{ y: -6, scale: 1.14, zIndex: 3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <img src={m.img} alt={m.name} />
          <span className="cp-av-tip">{m.name}</span>
        </motion.span>
      ))}
      <span className="cp-av cp-av-more-circle">
        <span className="cp-av-dot" />
        <span className="cp-av-dot" />
        <span className="cp-av-dot" />
      </span>
    </span>
  );
}

/* ─── Inline commitments quad ─── */
const COMMITMENTS = [
  { label: "Events", href: "/commitments#events", icon: "01" },
  { label: "Education", href: "/commitments#education", icon: "02" },
  { label: "Engineering", href: "/commitments#engineering", icon: "03" },
  { label: "Ecosystem", href: "/commitments#ecosystem", icon: "04" },
];

function CommitmentsQuad() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  return (
    <motion.span
      ref={ref}
      className="cp-quad-wrap"
      animate={{
        opacity: inView ? 1 : 0,
        scale: inView ? 1 : 0.88,
        y: inView ? 0 : 12,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      <span className="cp-quad">
        {COMMITMENTS.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            className="cp-q"
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 6 }}
            transition={{
              delay: inView ? i * 0.07 : 0,
              duration: 0.35,
              ease: [0.2, 0.85, 0.25, 1],
            }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.07)", y: -1 }}
          >
            <span className="cp-q-num">{c.icon}</span>
            <span className="cp-q-label">{c.label}</span>
          </motion.a>
        ))}
      </span>
    </motion.span>
  );
}

/* ─── NS Logo inline ─── */
function NSLogoInline() {
  return (
    <motion.span
      className="cp-ns-inline"
      whileHover={{ scale: 1.04, y: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img src="/nsstar-clean.svg" alt="" className="cp-ns-inline-star" />
      <span className="cp-ns-inline-text">NORTH{"\u00a0"}STAR</span>
    </motion.span>
  );
}

/* ─── Flag badges ─── */
function BelgianFlag() {
  return (
    <motion.span
      className="cp-flag"
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
    >
      <svg viewBox="0 0 30 20" width="28" height="19">
        <rect x="0" width="10" height="20" fill="#2D2D2D" />
        <rect x="10" width="10" height="20" fill="#FDDA24" />
        <rect x="20" width="10" height="20" fill="#EF3340" />
      </svg>
    </motion.span>
  );
}

function EUFlag() {
  const stars = [...Array(12)].map((_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    return (
      <polygon
        key={i}
        points="0,-1.1 0.32,0.44 -0.52,-0.17 0.52,-0.17 -0.32,0.44"
        transform={`translate(${Math.cos(a) * 7},${Math.sin(a) * 7}) scale(0.85)`}
        fill="#FFCC00"
      />
    );
  });

  return (
    <motion.span
      className="cp-flag"
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
    >
      <svg viewBox="0 0 30 20" width="28" height="19">
        <rect width="30" height="20" fill="#003399" />
        <g transform="translate(15,10)">{stars}</g>
      </svg>
    </motion.span>
  );
}

/* ─── Inline company logo ─── */
function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.span
      className="cp-company-logo"
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <img src={src} alt={alt} />
    </motion.span>
  );
}

/* ═══ Main export ═══ */
export function EditorialProse({ team }: EditorialProseProps) {
  return (
    <article className="cp">
      <div className="cp-inner">
        <p className="cp-prose cp-stagger" style={{ "--stagger": 0 } as React.CSSProperties}>
          We are <NSLogoInline /> {"\u2014"} an independent non{"\u2011"}profit
          rooted in Belgium{"\u00a0"}<BelgianFlag /> and growing across{"\u00a0"}Europe{"\u00a0"}<EUFlag />.
        </p>

        <p className="cp-prose cp-stagger" style={{ "--stagger": 1 } as React.CSSProperties}>
          Our team <TeamAvatars team={team} /> is small, deeply technical, and obsessed
          with what comes{"\u00a0"}next. We work fast and efficiently.
        </p>

        <p className="cp-prose cp-stagger" style={{ "--stagger": 2 } as React.CSSProperties}>
          Everything we do flows from four{"\u00a0"}commitments{"\u00a0"}{"\u2014"}
        </p>

        <div className="cp-stagger" style={{ "--stagger": 2.5 } as React.CSSProperties}>
          <CommitmentsQuad />
        </div>

        <p className="cp-prose cp-stagger" style={{ "--stagger": 3 } as React.CSSProperties}>
          They guide who we work with, and{"\u00a0"}why.
        </p>

        <p className="cp-prose cp-stagger" style={{ "--stagger": 4 } as React.CSSProperties}>
          People work with us to {"\ud83c\udfaf"}{"\u00a0"}hire talent, {"\ud83d\udce3"}{"\u00a0"}grow their brand,
          {" "}{"\ud83d\udee0\ufe0f"}{"\u00a0"}upskill their team or {"\u26a1"}{"\u00a0"}prototype{"\u00a0"}solutions.
        </p>

        <p className="cp-prose cp-stagger" style={{ "--stagger": 5 } as React.CSSProperties}>
          We{"\u2019"}ve worked with companies such as{" "}
          <CompanyLogo src="/partnerships/workedwith/10.svg" alt="ElevenLabs" />{" "}
          <CompanyLogo src="/partnerships/workedwith/15.svg" alt="Lovable" />{" "}
          <CompanyLogo src="/partnerships/workedwith/32.svg" alt="Stripe" />{" "}
          or <CompanyLogo src="/partnerships/workedwith/29.png" alt="Hugging Face" />.
        </p>

        <p className="cp-prose cp-stagger" style={{ "--stagger": 6 } as React.CSSProperties}>
          Interested in collaborating?{" "}
          <span className="cp-curvy">Let{"\u2019"}s build it{"\u00a0"}together.</span>
        </p>
      </div>
    </article>
  );
}
