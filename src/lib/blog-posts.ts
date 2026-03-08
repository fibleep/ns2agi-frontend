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
