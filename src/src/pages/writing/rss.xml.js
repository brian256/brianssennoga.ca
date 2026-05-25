import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const writing = await getCollection('writing', ({ data }) => !data.draft);
  return rss({
    title: 'Brian Ssennoga — Writing',
    description:
      'Long-form writing on AI, governance, and the gap between policy and practice. Edmonton, by way of Kampala.',
    site: context.site,
    items: writing
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.date,
        link: `/writing/${entry.slug}/`,
      })),
    customData: `<language>en-ca</language>`,
  });
}
