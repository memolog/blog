---
title: 画像のプレースホルダーとしてインラインSVGを使う
date: 2018-01-16 01:39:56
featured:
  author: Kelly Sikkema
  image: kelly-sikkema-511604
  authorLink: https://unsplash.com/photos/N3o-leQyFsI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
excerpt: "画像が読み込まれた後にレイアウトが動かないように、画像のプレースホルダーを入れた。最初はpng画像をインラインで挿入していたのだけど、svgの方が画像のサイズをみてその場その場で適切なものを作成しやすかったので、svgを使うようにしてみた。処理自体はNode.js（Hexoの処理の中）で行っている。現在のコンテンツの最大幅は750pxなので、それを基準に縦横比が合うようにheightを計算している。"
---

画像が読み込まれた後にレイアウトが動かないように、画像のプレースホルダーを入れた。最初は png 画像をインラインで挿入していたのだけど、svg の方が画像のサイズをみてその場その場で適切なものを作成しやすかったので、svg を使うようにしてみた。処理自体は Node.js（Hexo の処理の中）で行っている。現在のコンテンツの最大幅は 750px なので、それを基準に縦横比が合うように height を計算している。

```javascript
const sizeOf = require("image-size");
const dimension = sizeOf(path.resolve(__dirname, `../${src}`));
const width = 750;
const height = parseInt(dimension.height * (width / dimension.width), 10);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}" height="${height}">
<rect x="0" y="0" width="${width}" height="${height}" fill="#f0f0f0" />
</svg>`;

const inlineSVG =
  "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
```

こんな感じ。fill の部分を好きな色に変えることで好きな色のプレースホルダーを作ることができる。
一緒にコンテンツに含めた画像の picture element 対応をしているのだけど、それはそれでまた今度ブログに書こうと思う。
