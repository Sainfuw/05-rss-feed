import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'

export const GET: APIRoute = async ({ params, request, site }) => {
  const blogs: CollectionEntry<'blog'>[] = await getCollection('blog')

  return rss({
    title: "Emilio's Blog",
    description: "A humble Astronaut's guide to the stars",
    site: site ?? '',
    items: blogs.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `/posts/${slug}`,
    })),
  })
}
