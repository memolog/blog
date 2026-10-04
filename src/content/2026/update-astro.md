---
title: Astroを更新
date: 2026/10/04 13:17:00
featured:
    image: update_astro.webp
    author: chatGPT
excerpt: Astroを5.9から7.3.5へアップデート。更新に伴って発生した画像パスや依存パッケージの問題を修正し、自作モジュールの更新やGitHub Actionsへのデプロイ移行も実施。最終的に npm audit の報告をゼロにした。
---
急に思い立ってAstroを久しぶりにアップデートしました。Astroは5.9から7.3.5まで上がった。

アップデート後にビルドすると、`import.meta.url` を基準に `public` ディレクトリを探していたところがうまく動かなくなった。prerender時には `dist/.prerender/chunks` 以下を基準にしてしまうようなので、Astroの `publicDir` を使うように変更。

```ts
import { publicDir } from "astro:config/server";
import { fileURLToPath } from "node:url";

const publicPath = fileURLToPath(publicDir);
```

画像の背景色を設定するのに利用していた `colorthief` も、更新後にexportのところでエラーになるようになったので、こちらは `sharp` に置き換え。

```ts
const { dominant } = await sharp(source).stats();
color = chroma(dominant.r, dominant.g, dominant.b).hex();
```

そして、自作の [primitive_bulk](https://github.com/memolog/primitive_bulk_output) も `imagemin` の依存関係が問題になっていたので、とりあえず `svgo` を直接使う形に置き換えて、バージョン2.4.0をリリース。

最後に、`gh-pages` の依存関係にも脆弱性が残っていたので、`gh-pages` を使ったデプロイをやめて、GitHub ActionsからGitHub Pagesへデプロイする形に変更。

これで `npm audit` の報告がゼロになりました。

だいぶ面倒くさかったけど、依存関係も減ったので、これできっとしばらくは大丈夫。

更新作業は個人利用のChatGPTに適当に投げつつ手作業で対応したけど、今さらながらCodexでやれば良かったかなと思った。