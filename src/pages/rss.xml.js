import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  const wunderkammer = await getCollection("wunderkammer");
  const items = [
    ...posts.map((post) => ({
      ...post.data,
      pubDate: post.data.date,
      link: `/${post.id}/`,
    })),
    ...wunderkammer.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/wunderkammer/${entry.id}/`,
    })),
  ].toSorted((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
