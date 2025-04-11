// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://memolog.org",
  integrations: [
    mdx(),
    sitemap({
      serialize: (page) => {
        // 特例：/page/1, /page/2 などはそのまま
        if (/^https:\/\/memolog\.org\/page\/\d+\/?$/.test(page.url)) {
          return page;
        }

        // 通常の .html 付け処理（トップページは除く）
        if (page.url === "https://memolog.org/") {
          return page;
        }

        return {
          ...page,
          url: page.url + ".html",
        };
      },
    }),
  ],
  markdown: {
    syntaxHighlight: "prism",
    shikiConfig: {
      theme: "dracula",
    },
  },
  build: {
    format: "file",
  },
});
