import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const parser = new MarkdownIt()

export const GET: APIRoute = async ({ params, request, site }) => {
  const blogs: CollectionEntry<'blog'>[] = await getCollection('blog')

  return rss({
    title: "Emilio's Blog",
    description: "A humble Astronaut's guide to the stars",
    site: site ?? '',

    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },

    items: blogs.map(({ data, slug, body }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `/posts/${slug}`,

      content: sanitizeHtml(parser.render(body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),

      customData: `<media:content
        type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
        width="${data.image.width}"
        height="${data.image.height}"
        medium="image"
        url="${site + data.image.src}" />
      `,
    })),
  })
}
