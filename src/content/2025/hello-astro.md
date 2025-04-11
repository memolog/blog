---
title: Hello Astro
date: 2025/04/09 09:00:00
featured:
    image: hello-astro.webp
    author: chatGPT
excerpt: 2017年以来スタティックサイトジェネレータとしてHexoを利用していたのですが、急に思い立ってAstroに移行してみました。このシンプルなブログを扱うのに Hexo に不満があったわけでもなく、「そろそろデザイン変えようかなあ」と思い立ったのがきっかけで、「じゃあジェネレータも今どきのにしようかな」という感じで変えました。
---
[Hello Hexo](/2017/hello-hexo.html) 以来、スタティックサイトジェネレータとして [Hexo](https://hexo.io/) を使ってきましたけど、[Astro](https://astro.build/) に移行してみました。

このシンプルなブログを扱うのに Hexo に不満があったわけでもなく、「そろそろデザイン変えようかなあ」と思い立ったのがきっかけで、「じゃあジェネレータも今どきのにしようかな」という感じで変えました。

なぜ Astro にしたのかというと、これも特に深い理由はなくて、ChatGPT に「Node.js で動く static site generator を使うなら何がいい？」と聞いたところ、最初に出てきたのが Astro だったから。そういう意味では、AI に覚えが良いサービスは選ばれやすいのかもしれない。

これが以前（2025年4月前）のデザイン。
<img src="/assets/images/design-before-202504.png" class="screenshot" loading="lazy" width="923" height="944">

これが今（2025年4月後）のデザイン。
<img src="/assets/images/design-after-202504.png" class="screenshot" loading="lazy" width="923" height="747">

横幅も少し広くしました。
いまは [Dell 27 4K UHD USB-C モニター - S2722QC](https://www.dell.com/ja-jp/shop/dell-27-4k-uhd-usb-c-%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC-s2722qc/apd/210-bcdd) をメインで使っていて、そのモニターで見たときに「もう少し広く表示したいな」と思ったからです。

完全に自分のためだけど、いまや自分のためだけに書いているブログなので、それでいいかなと。レスポンシブ対応はそのまま。

とくに意味はないけど賑やかしとして入れるようになった [Featured Image](/2018/display-featured-image.html) は継続。ただ、全体的に単色っぽい感じにしたかったので、1ページ目の記事を中心に画像を差し替えてみました。

画像は ChatGPT に以下のようなプロンプトを渡して生成してます。

> 「以下の内容をもとにモノクロ水彩風のイラストを描いて。表現は豊かだがミニマルな構成で、ゆるいインクの輪郭と柔らかなグレーの影で描かれている。スケッチ風で落ち着いたクラシカルな雰囲気。」

この指示内容には紆余曲折あり、自分で読んでも「なんでこんな内容にしたんだっけ？」という感じですが、いまのところいい感じに動いてる気がする。

画像のファイルサイズは以前より大きくなっていますが、今どきは [Lazy Loading](https://developer.mozilla.org/ja/docs/Web/Performance/Guides/Lazy_loading) にも [WebP](https://caniuse.com/webp) にも対応しているので、あまり気にならないかなと。

Hexo から Astro に移行したときの作業内容は、数日前のことなのにすでにだいぶ忘れてしまいましたが、記憶では `npm create astro@latest -- --template blog` でテンプレートから作成して、そこから `.astro` ファイルを調整していった感じです。

Hexo で使っていた `<!-- more -->` による概要生成ができなくなったので、ChatGPT が作ってくれた移行ツールを調整しつつ、Markdown の frontmatter に移行しました。

他には sitemap とかページネーションとか細かい調整をいろいろしていますが、概ねすんなり移行できた気がします。まだ気づいていない問題があるかもしれませんが。

この移行にあたって、しばらく触っていなかった [UIColor Converter](https://uicolor-converter.memolog.org/) や [generate-responsive-images-service](https://github.com/memolog/generate-responsive-images-service) も使いたくて更新しました。それについては、気が向いたらメモに残すかも（残さないかも）。
