export interface CommitmentRoute {
  id: "events" | "education" | "engineering" | "ecosystem";
  label: string;
  href: string;
  index: string;
  summary: string;
}

export const commitmentRoutes: CommitmentRoute[] = [
  {
    id: "events",
    label: "Events",
    href: "/commitments#events",
    index: "01",
    summary: "Hackathons, SIGNAL meetups, and flagship gatherings that turn ideas into momentum.",
  },
  {
    id: "education",
    label: "Education",
    href: "/commitments#education",
    index: "02",
    summary: "Workshops, youth formats, and practical learning tracks for new builders.",
  },
  {
    id: "engineering",
    label: "Engineering",
    href: "/commitments#engineering",
    index: "03",
    summary: "Applied products, internal tools, and prototypes that come out of community friction.",
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    href: "/commitments#ecosystem",
    index: "04",
    summary: "Long-term collaborations with companies, venues, universities, and partner communities.",
  },
];
