import { useState, type ReactNode } from "react";

type Example = {
  name: string;
  description: string | ReactNode;
  image: string;
};

type AccordionItem = {
  id: string;
  title: string;
  solutions: string;
  how: ReactNode;
  whatYouGet: ReactNode[];
  timeline: string;
  examples: Example[];
};

const items: AccordionItem[] = [
  {
    id: "hire",
    title: "Hire engineers",
    solutions: "Hackathon · Sponsor",
    how: <>You define the challenge. We fill the room with <strong>50–150+ vetted builders</strong>. You watch them solve it <strong>in real time</strong>. Just <strong>working code</strong> and the hackathon spirit that makes people come back. Choose evening, full-day, or 2-day formats.</>,
    whatYouGet: [
      <><strong>Shortlist of top performers</strong> with direct intros</>,
      <><strong>Working prototypes</strong> you can ship or build on</>,
      <>Photo and video content for your <strong>employer brand</strong></>,
      <><strong>85% lower cost-per-hire</strong> vs traditional recruiting</>,
    ],
    timeline: "8–12 weeks to live event",
    examples: [
      { name: "AI Hackathon II", description: "60+ builders competed, City of Antwerp use case, people getting hired", image: "/ai-hackathon-ii/4.jpg" },
      { name: "Robotics Hackathon I", description: "Bringing together robotics engineers to work on open source robot arms", image: "/robotics-i/3.jpg" },
      { name: "AI Hackathon III", description: "70 builders, multiple prototypes built in a single day", image: "/ai-hackathon-iii/4.jpg" },
    ],
  },
  {
    id: "upskill",
    title: "Upskill my team",
    solutions: "Workshop · Lecture · Internal Hack",
    how: <>Your team <strong>learns by building</strong>. We design <strong>hands-on sessions</strong> around your stack, your goals, and your timeline. Half-day AI/Robotics workshop. Full-day internal hackathon. Guest lecture on emerging tech. <strong>Pick a format</strong> and we handle the rest.</>,
    whatYouGet: [
      <><strong>Custom curriculum</strong> matched to your team's skill level</>,
      <><strong>Hands-on exercises</strong> with production-ready tools</>,
      <><strong>Working prototypes or POCs</strong> by end of session</>,
      <>Resources to <strong>keep building</strong></>,
    ],
    timeline: "1–3 weeks, depending on format",
    examples: [
      { name: "Future in Bloom", description: "Co-working make-athon focused on embodied AI and robotics", image: "/future-in-bloom/2.jpg" },
      { name: "ElevenLabs Worldwide Hackathon", description: "Teams learned voice AI by building conversational agents", image: "/elevenlabs/2.jpeg" },
      { name: "Belgium NLP Meetup", description: "Deep-dive sessions on multi-agent architectures and production AI", image: "/belgium-nlp-meetup/1.avif" },
    ],
  },
  {
    id: "brand",
    title: "Build my brand",
    solutions: "Sponsor · Host Meetup",
    how: <>Developers remember <strong>experiences, not ads</strong>. Sponsor a hackathon, host a meetup, or enter a long-term strategic partnership. Your brand gets in front of <strong>50 to 200 builders</strong> per event — stage time, booth presence, and <strong>professional content</strong> you can use long after the event ends.</>,
    whatYouGet: [
      <><strong>Logo</strong> on all event materials and communications</>,
      <><strong>Speaking slot</strong> or demo time</>,
      <><strong>Booth or branded presence</strong> at the event</>,
      <>Professional <strong>photo and video content</strong></>,
    ],
    timeline: "One-off event or ongoing partnership",
    examples: [
      { name: "SIGNAL Meetups", description: "Recurring AI meetups with speakers, demos, and networking", image: "/signal-i/12.jpg" },
      { name: "Kids AI Hackathon", description: "Nationwide event across Belgium — great for CSR and media coverage", image: "/kids-hackathon/2.png" },
      { name: "Stripe Agentic Payments Hackathon", description: "Stripe's brand in front of 50+ developers building with their APIs", image: "/stripe-hackathon/1.png" },
    ],
  },
];

export function WorkWithUsAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="collab-accordion-item">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="collab-accordion-trigger"
              aria-expanded={isOpen}
            >
              <div>
                <span className="collab-accordion-label">I need to</span>
                <h2 className="collab-accordion-title">{item.title}</h2>
              </div>
              <div className="collab-accordion-meta">
                <span className="collab-accordion-solutions">{item.solutions}</span>
                <div className={`collab-accordion-chevron${isOpen ? " is-open" : ""}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(255,255,255,0.6)" }} />
                  </svg>
                </div>
              </div>
            </button>

            <div className={`collab-accordion-body${isOpen ? " is-open" : ""}`}>
              <div className="collab-accordion-inner">
                {/* How */}
                <div>
                  <p className="collab-acc-section-label">How it works</p>
                  <p className="collab-acc-how">{item.how}</p>
                </div>

                {/* What you get + Timeline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <p className="collab-acc-section-label">Timeline</p>
                    <p className="collab-acc-timeline">{item.timeline}</p>
                  </div>
                  <div>
                    <p className="collab-acc-section-label">What you get</p>
                    <ul className="collab-acc-get-list">
                      {item.whatYouGet.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Examples */}
                <div className="collab-acc-examples">
                  <p className="collab-acc-section-label">Examples</p>
                  <div className="collab-acc-examples-grid">
                    {item.examples.map((ex, i) => (
                      <div key={i} className="collab-acc-example-card">
                        <img src={ex.image} alt="" className="example-img" loading="lazy" />
                        <div className="collab-acc-example-shade" />
                        <div className="collab-acc-example-text">
                          <span className="collab-acc-example-name">{ex.name}</span>
                          <span className="collab-acc-example-desc">{ex.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="collab-acc-cta-row">
                  <a href="#contact" className="collab-acc-cta">Get in touch</a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
