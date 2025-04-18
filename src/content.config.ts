import { defineConfig } from "astro/config";
import mdx from '@astrojs/mdx';
import {defineCollection} from "astro:content";
import { glob } from 'astro/loaders';
import {z} from "zod";

export default defineConfig({
    integrations: [mdx()]
});

const blogs = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blogs' }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        thumbnail: z.string(),
    }),
});

export const collections = { blogs };