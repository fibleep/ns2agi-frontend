import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

type Example = {
  name: string;
  description: string | ReactNode;
  image: string;
  icon?: string;
};

type AccordionItem = {
  id: string;
  label: string;
  title: string;
  solutions: string;
  tagline: string;
  how: ReactNode;
  whatYouGet: ReactNode[];
  timeline: string;
  examples: Example[];
};

const items: AccordionItem[] = [
  {
    id: "hire",
    label: "I need to",
    title: "HIRE ENGINEERS",
    solutions: "Hackathon · Sponsor",
    tagline: "Filter for outliers",
    how: <>You define the challenge. We fill the room with <strong className="text-white">50-150+ vetted builders</strong>. You watch them solve it <strong className="text-white">in real time</strong>. Just <strong className="text-white">working code</strong> and <strong className="text-white">the hackathon spirit</strong> that makes people come back. Choose evening, full-day, or 2-day formats.</>,
    whatYouGet: [
      <><strong className="text-white">Shortlist of top performers</strong> with direct intros</>,
      <><strong className="text-white">Working prototypes</strong> you can ship or build on</>,
      <>Photo and video content for your <strong className="text-white">employer brand</strong></>,
      <><strong className="text-white">85% lower cost-per-hire</strong> vs traditional recruiting</>,
    ],
    timeline: "8-12 weeks to live event",
    examples: [
      {
        name: "AI Hackathon II",
        description: "60+ builders competed, City of Antwerp use case, people getting hired",
        image: "/ai-hackathon-ii/4.jpg",
      },
      {
        name: "Robotics Hackathon I with Hugging Face",
        description: "Bringing together robotics engineer to work on open source robot arms",
        image: "/robotics-i/3.jpg",
        icon: "/partnerships/workedwith/6.png",
      },
      {
        name: "AI Hackathon III",
        description: <>70 builders, multiple prototypes and a use case that we've implemented in <a href="https://etoile.events" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">etoile.events</a></>,
        image: "/ai-hackathon-iii/4.jpg",
      },
    ],
  },
  {
    id: "upskill",
    label: "I need to",
    title: "UPSKILL MY TEAM",
    solutions: "Workshop · Lecture · Internal Hack",
    tagline: "A brief on the frontier of AI & Robotics",
    how: <>Your team <strong className="text-white">learns by building</strong>. We design <strong className="text-white">hands-on sessions</strong> around your stack, your goals, and your timeline. Half-day AI/Robotics workshop. Full-day internal hackathon. Guest lecture on emerging tech. <strong className="text-white">Pick a format</strong> and we handle the rest.</>,
    whatYouGet: [
      <><strong className="text-white">Custom curriculum</strong> matched to your team's skill level</>,
      <><strong className="text-white">Hands-on exercises</strong> with production-ready tools</>,
      <><strong className="text-white">Working prototypes or POCs</strong> by end of session</>,
      <>Resources to <strong className="text-white">keep building</strong></>
    ],
    timeline: "1-3 weeks, depending on format",
    examples: [
      {
        name: "Future in Bloom",
        description: "Co-working make-athon focused on embodied AI and robotics",
        image: "/future-in-bloom/2.jpg",
      },
      {
        name: "ElevenLabs Worldwide Hackathon",
        description: "Teams learned voice AI by building conversational agents",
        image: "/elevenlabs/2.jpeg",
        icon: "/partnerships/workedwith/18.png",
      },
      {
        name: "Belgium NLP Meetup",
        description: "Deep-dive sessions on multi-agent architectures and production AI",
        image: "/belgium-nlp-meetup/1.avif",
      },
    ],
  },
  {
    id: "brand",
    label: "I need to",
    title: "BUILD MY BRAND",
    solutions: "Sponsor · Host Meetup",
    tagline: "Find the signal",
    how: <>Developers remember <strong className="text-white">experiences, not ads</strong>. Sponsor a hackathon, host a meetup, or enter a long term strategic partnership. Your brand gets in front of <strong className="text-white">50 to 200 builders</strong> per event. Stage time, booth presence, and <strong className="text-white">professional content</strong> you can use long after the event ends.</>,
    whatYouGet: [
      <><strong className="text-white">Logo</strong> on all event materials and communications</>,
      <><strong className="text-white">Speaking slot</strong> or demo time</>,
      <><strong className="text-white">Booth or branded presence</strong> at the event</>,
      <><strong className="text-white">Attendee list</strong> and direct lead access</>,
      <>Professional <strong className="text-white">photo and video content</strong></>,
    ],
    timeline: "One-off event or ongoing partnership",
    examples: [
      {
        name: "SIGNAL Meetups",
        description: "Recurring AI meetups with speakers, demos, and networking",
        image: "/signal-i/12.jpg",
      },
      {
        name: "Kids AI Hackathon",
        description: "Nationwide event across Belgium, sponsors reached families and schools - great for CSR and getting your brand in media",
        image: "/kids-hackathon/2.png",
      },
      {
        name: "Stripe Agentic Payments Hackathon",
        description: "Stripe's brand in front of 50+ developers building with their APIs",
        image: "/stripe-hackathon/1.png",
        icon: "/partnerships/workedwith/9.png",
      },
    ],
  },
];

export function WorkWithUsAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`border rounded-2xl transition-all duration-300 ${isOpen
              ? "border-zinc-600 bg-zinc-900/50"
              : "border-zinc-800 hover:border-zinc-700"
              }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full p-8 md:p-12 text-left"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">
                    {item.label}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                    {item.title}
                  </h2>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:block text-right">
                    <p className="text-zinc-400 text-sm">{item.solutions}</p>
                    <p className="text-zinc-600 text-xs">{item.tagline}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                      ? "bg-white border-white rotate-180"
                      : "border-zinc-700"
                      }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${isOpen ? "text-black" : "text-zinc-500"
                        }`}
                    />
                  </div>
                </div>
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <div className="px-8 md:px-12 pb-8 md:pb-12 pt-0">
                <div className="border-t border-zinc-800 pt-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* How */}
                    <div className="md:col-span-2">
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">
                        How it works
                      </p>
                      <p className="text-zinc-300 leading-relaxed">
                        {item.how}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">
                        Timeline
                      </p>
                      <p className="text-white font-medium">{item.timeline}</p>
                    </div>
                  </div>

                  {/* What you get */}
                  <div className="mt-8">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">
                      What you get
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {item.whatYouGet.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                          <p className="text-zinc-400">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-zinc-500 text-xs uppercase tracking-widest">
                        Examples
                      </p>
                      <div className="flex items-center gap-1 text-zinc-600 text-xs md:hidden">
                        <span>Scroll</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto pb-2 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
                      {item.examples.map((example, i) => (
                        <div
                          key={i}
                          className="group/card rounded-xl border border-zinc-800 overflow-hidden flex-shrink-0 w-[75%] md:w-auto snap-start"
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={example.image}
                              alt={example.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-white font-medium">
                                {example.name}
                              </p>
                              {example.icon && (
                                <img
                                  src={example.icon}
                                  alt=""
                                  className="h-4 w-auto"
                                />
                              )}
                            </div>
                            <p className="text-zinc-500 text-sm">
                              {example.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                    >
                      Let's talk <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
