---
title: 古い記事をインポートする
date: 2018-01-04 03:36:06
featured:
  author: Jordan Sanchez
  image: jordan-sanchez-111052
  authorLink: https://unsplash.com/photos/71hQxE-Sfvg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
excerpt: "ブログの古い記事なんてほとんど顧みることはない。ほとんどの記事が「以前は役に立ったかもしれないけど、すでに役には立たない」コードの端切れのようなもので古い記事なんてそのまま放置していつの日かインターネットから姿を消すくらいでもいいかなあとか思っていた。  のだが、数は少ないけどまだ誰かの役に立つかもしれないものもたぶんあるだろうし、過去の時点で自分が何を書いていたのか振り返ることもあるかもしれない（今まで一度もなかったけど）と思い直し、頑張ってインポートをしてみることにした。"
---

ブログの古い記事なんてほとんど顧みることはない。ほとんどの記事が「以前は役に立ったかもしれないけど、すでに役には立たない」コードの端切れのようなもので古い記事なんてそのまま放置していつの日かインターネットから姿を消すくらいでもいいかなあとか思っていた。

のだが、数は少ないけどまだ誰かの役に立つかもしれないものもたぶんあるだろうし、過去の時点で自分が何を書いていたのか振り返ることもあるかもしれない（今まで一度もなかったけど）と思い直し、頑張ってインポートをしてみることにした。

MT 形式のエクスポートファイルを Hexo で読み込めるファイルに作り直すのは[TurnDown](https://github.com/domchristie/turndown) という HTML を Markdown に変換するモジュールのおかげで、そんなに難しくなかった。コードブロックの前に不要な改行が入ってしまうパターンは元々の入力内容の問題もあるので気がついたら手直ししていこうと思う。

ということで、大まかな点では大きな問題はなかったのだが、古い記事でアップロードしていた画像の扱い（フェッチしてディレクトリに保存するようにして、URL を置換した）とか、古い URL がなるべく変更されないように調整するのとか、Hexo（というかたぶん ejs）で HTML を生成するときに Body に「&#x25;」があるためにエラーになってしまうので数値参照にしたり、Title に「:」があるとエラーになるのでやっぱり数値参照にしたりとか、ついでに CSS を変えてみたりとか、そういった細かいところの調整に時間がかかってしまった。

作成した変換ツールは[memolog/hexo-mt-converter](https://github.com/memolog/hexo-mt-converter) に公開してある。けど他の人にはあまり役に立たないツールかもしれない。

せっかくなので turndown の拡張した部分のコードだけを記しておく。

````javascript
const TurndownService = require("turndown");

const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
  fence: "```",
});

turndownService.addRule("fencedCodeBlock", {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === "fenced" &&
      node.nodeName === "PRE" &&
      ((node.firstChild && node.firstChild.nodeName === "CODE") ||
        node.className === "prettyprint")
    );
  },

  replacement: function (content, node, options) {
    var className = node.firstChild.className || node.className || "";
    var language = (className.match(/language-(\S+)/) || [null, ""])[1];

    return (
      "\n\n" +
      options.fence +
      language +
      "\n" +
      node.firstChild.textContent +
      "\n" +
      options.fence +
      "\n\n"
    );
  },
});
````

コードブロックの出力はデフォルトでは「indent」になっているので、これを「fenced」に変更。して、fenced のフィルター部分を自分のエクスポートデータの内容に応じて少し調整している。旧いデータだと code 要素には class 名がついていなくて、pre 要素にだけついているという HTML もあったので、code 要素に className がなかったら親の pre 要素の className も参照するようにしている。また、投稿によっては「prettyprint」を使ってコードブロックを記述していたところもあったので、prettyprint の場合でもコードブロックとして扱うように追加している。prettyprint の場合は className に language-xxx がというのがないので、出力内容はプレーンでハイライトがつかない状態になっているけど、これは気が向いたら直そうと思う。
