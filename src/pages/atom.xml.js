import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = (await getCollection("blog"))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 20);
  const updated = posts[0].data.date.toISOString();

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_TITLE}</title>
  <subtitle>${SITE_DESCRIPTION}</subtitle>
  <link href="https://memolog.org/atom.xml" rel="self"/>
  <link href="https://memolog.org/"/>
  <updated>${updated}</updated>
  <id>https://memolog.org/</id>
  <author><name>Yutaka Yamaguchi</name></author>
  ${posts
    .map((post) => {
      const { id, title, date, excerpt } = post.data;
      return `
  <entry>
    <title>${title}</title>
    <link href="https://memolog.org/${id}.html"/>
    <id>https://memolog.org/${id}.html</id>
    <published>${date.toISOString()}</published>
    <summary type="html">${excerpt}</summary>
  </entry>
    `;
    })
    .join("")}
</feed>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
