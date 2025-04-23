import {defineCollection, z} from "astro:content";
import { glob } from 'astro/loaders';

const blogs = defineCollection({
    loader: glob({ pattern: "**/*.(md|mdx)", base: './src/content/blogs' }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        thumbnail: z.string(),
    }),
});

export const collections = { blogs };