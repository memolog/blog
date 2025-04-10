import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import matter from "gray-matter";
import { pipeline } from "@xenova/transformers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// AstroのMarkdown記事ディレクトリ
const blogDir = path.join(__dirname, "../src/content");
const outputPath = path.join(__dirname, "../src/data/related.json");

// モデル読み込み（日本語対応）
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
);

// Markdownファイルを全部読み込み
const files = glob.sync(`${blogDir}/**/*.md`);
const contents: string[] = [];
const docs: {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  featured: boolean;
}[] = [];

files.forEach((file) => {
  const raw = fs.readFileSync(file, "utf-8");
  const { content, data } = matter(raw);
  const id = path.relative(blogDir, file).replace(/\.md$/, "");
  const { title, excerpt, date, featured } = data;
  contents.push(content);
  docs.push({ id, title, excerpt, date, featured });
});

// ベクトル生成
const embeddings = await Promise.all(
  contents.map(async (content) => {
    return await embedder(content, { pooling: "mean", normalize: true });
  })
);

// 類似度関数
function cosine(a: any, b: any) {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// 関連記事計算
const related: any = {};
for (let i = 0; i < docs.length; i++) {
  related[docs[i].id] = docs
    .map((_, j) => {
      return {
        ...docs[j],
        score: cosine(embeddings[i].data, embeddings[j].data),
      };
    })
    .filter((s) => s.id !== docs[i].id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

// 保存
fs.writeFileSync(outputPath, JSON.stringify(related, null, 2), "utf-8");
