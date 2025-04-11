---
title: 記事に関連メモを出してみる
date: 2025-04-10 23:15:00
featured:
  image: generate-related-posts.webp
  author: chatGPT
excerpt: "記事データをベクトル化して、関連記事（メモ）を表示できるか試してみた、というメモ。"
---

記事データをベクトル化して、関連記事（メモ）を表示できるか試してみた、というメモ。

できあがった関連メモは以下のキャプチャのような感じ。これは[本：マクロ金融危機入門](/2025/a-crash-course-on-crises.html)の記事の関連メモ。「本」というカテゴリでは揃っているものの、関連性があるようなないような微妙なライン。データがもっと増えれば、それっぽい結果になってくるのかなあ。

<img src="/assets/images/related-entries.png" class="screenshot" loading="lazy" width="923" height="566">

実際にやったことは、Markdownファイルから取得した記事の本文にベクトル化処理をかけて、
```typescript
import { pipeline } from "@xenova/transformers";
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
);
const embeddings = await Promise.all(
  contents.map(async (content) => {
    return await embedder(content, { pooling: "mean", normalize: true });
  })
);
```

コサイン類似度でスコアを出し、高い順に4件まで抽出してJSONに保存。

```typescript
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

fs.writeFileSync(outputPath, JSON.stringify(related, null, 2), "utf-8");
```

このJSONをAstro側で読み込んで表示する、という割とシンプルな感じです。

ベクトルDBを使わなくても、JSON保存で十分機能するので、このくらいのブログ規模なら手軽でちょうどいい感じ。ただ、全記事のベクトル化に体感で20〜30秒ほどかかっており、そこそこ重めの処理にはなってます。

ちなみに実装のほとんどはChatGPT任せで、実装よりもむしろスタイル調整の方に時間を使ってる感じがある。