// tools/migrateExcerpt.ts
import fs from "fs";
import path from "path";

const BLOG_ROOT = "./src/content";

function isMarkdownFile(filename: string) {
  return filename.endsWith(".md") || filename.endsWith(".mdx");
}

function migrateFile(fullPath: string) {
  const content = fs.readFileSync(fullPath, "utf-8");
  let [head, rest] = content.split("---").filter(Boolean);

  // Remove the image from Amazon.com like ![](http://images-jp.amazon.com/images/P/4393360281.09.TZZZZZZZ.jpg)
  const imageRegex = /!\[.*?\]\(.*?amazon\.com.*?\)/g;
  rest = rest.replace(imageRegex, "");

  let excerpt = "";
  if (rest.includes("<!-- more -->")) {
    [excerpt] = rest.split("<!-- more -->");
  } else {
    // Use the first 200 characters as the excerpt
    excerpt = rest.slice(0, 200);
  }

  excerpt = excerpt
    .trim()
    .replace(/\n/g, " ")
    // Remove All links
    .replace(/\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\\\-/, "-")
    .replace(/"/g, '\\"');

  // すでにexcerptがあればスキップ
  if (/^excerpt:/m.test(head)) {
    console.log(`スキップ（既にexcerptあり）：${fullPath}`);
    return;
  }

  const newFrontmatter = `---\n${head.trim()}\nexcerpt: "${excerpt}"\n---\n`;
  const newBody = rest.trim();

  fs.writeFileSync(fullPath, `${newFrontmatter}\n${newBody}`);
  console.log(`変換済み：${fullPath}`);
}

function walkDir(dirPath: string) {
  for (const file of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (stat.isFile() && isMarkdownFile(file)) {
      migrateFile(fullPath);
    }
  }
}

// 実行
walkDir(BLOG_ROOT);
