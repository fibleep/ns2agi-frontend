export interface BlogPostPreview {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  thumbnail: string;
  readTime: string;
  slug: string;
}

export const blogPosts: BlogPostPreview[] = [
  {
    id: "the-vessel",
    title: "First open AI & Robotics Lab in Belgium",
    date: "March 11, 2026",
    excerpt:
      "The Vessel is an open robotics and AI lab in the Antwerp port area. Think of it as a forever hackathon.",
    author: "Filip Nowak",
    thumbnail: "/blogs/the-vessel/vessel.png",
    readTime: "4 min read",
    slug: "the-vessel",
  },
  {
    id: "cost-of-connection",
    title: "The Cost of Connection",
    date: "December 31, 2025",
    excerpt:
      "Brain drain breaks the chain of people lifting other people up. How do we ignite Belgium's tech ecosystem?",
    author: "Filip Nowak",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*BtDdP2mnKTCSqMjN",
    readTime: "7 min read",
    slug: "cost-of-connection",
  },
];
