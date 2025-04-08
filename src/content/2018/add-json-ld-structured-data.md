---
title: Add JSON-LD structured data
featured:
  image: thomas-kelley-75110-unsplash
  author: Thomas Kelley
  authorLink: https://unsplash.com/photos/HBANPxXi3aQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-08-14 18:04:54
excerpt: "構造化データ（structured data）の部分をmicrodataからJSON-LDに置き換えてみた。"
---

構造化データ（structured data）の部分を microdata から JSON-LD に置き換えてみた。

とりあえず[Article | Search | Google Developers](https://developers.google.com/search/docs/data-types/article)にある「SEE MARKUP」からサンプルの JSON-LD のデータをコピーして、それを元に hexo のテンプレートの個別のページのアーカイブに下記の JSON-LD を追加。

```json
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "<%- page.permalink %>"
    },
    "headline": "<%- page.title %>",
    <% if (page.featured && page.featured.image) { %>
      "image": [
        "https://memolog.org/assets/images/<%= page.featured.image %>/<%= page.featured.image %>.jpg"
      ],
    <% } %>
    "datePublished": "<%- page.date %>",
    "dateModified": "<%- page.updated %>",
    "author": {
      "@type": "Person",
      "name": "Yutaka Yamaguchi"
    },
    "publisher": {
      "@type": "Organization",
      "name": "メモログ",
      "logo": {
        "@type": "ImageObject",
        "url": "https://memolog.org/assets/icons/icon-1024.png"
      }
    },
    "description": "<%- remove_html(page.excerpt) %>"
  }
</script>
```

description には HTML を含まないテキストを出力したいのだけど、hexo の`page.excerpt`の出力には HTML が含まれていてそれを取り除く手段が標準ではない（ように見える）。なので、`remove_html`という簡単なヘルパーを用意した。改行の情報などもいらないので、DOM にデータを入れてそれを textContent でテキスト部分を取得するだけ。

```javascript
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

hexo.extend.helper.register("remove_html", function (content) {
  return (
    new JSDOM(`<div>${content}</div>`).window.document.getElementsByTagName(
      "div"
    )[0].textContent || ""
  );
});
```

同様に、各ページの共通の情報として[Logo](https://developers.google.com/search/docs/data-types/logo)と[Social Profile](https://developers.google.com/search/docs/data-types/social-profile)のデータを追加している。

```json
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@graph":
  [
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "http://memolog.org",
      "logo": "https://memolog.org/assets/icons/icon-1024.png"
    },
    {
      "@context": "http://schema.org",
      "@type": "Person",
      "name": "Yutaka Yamaguchi",
      "url": "http://memolog.org",
      "sameAs": [
        "https://www.facebook.com/yutaka.yamaguchi",
        "https://www.linkedin.com/in/yutakayamaguchi/",
        "https://twitter.com/memolog"
      ]
    }
  ]
}
</script>
```

二つのトップレベルのアイテムを一つの script タグで追加したい場合は、`@graph`で記入すると良いと[web - JSON-LD Schema.org: Multiple video/image page - Stack Overflow](https://stackoverflow.com/questions/30505796/json-ld-schema-org-multiple-video-image-page/30506476#30506476)に書かれてあったのでそのようにした（複数の script タグに分けてもいい）。

インデックステンプレートの方には[Carousels](https://developers.google.com/search/docs/guides/mark-up-listings)の記述を入れることにした。

```json
<script type="application/ld+json">
{
  "@context":"http://schema.org",
  "@type":"ItemList",
  "itemListElement":[
    <% page.posts.each( (post, i) => { %>
    {
      "@type":"ListItem",
      "position":<%- i+1 %>,
      "url": "<%- post.permalink %>"
    }<% if (i + 1 < page.posts.length ) { %>,<% } %>
    <% }) %>
  ]
}
</script>
```

Carousel の表示は[Mark Up Your Content Items](https://developers.google.com/search/docs/guides/mark-up-content#content_types) には、「The Top stories carousel requires that your content be published in AMP. For more information, see [AMP with structured data.](https://developers.google.com/search/docs/data-types/article#amp-sd)」とあり、non-AMP ページではいわゆるカルーセルでの表示ではなく、リスト表示になるようである。

ので、そのうち AMP にも対応したいなと思うけど、まあそのうち。

最後に[構造化データ テストツール](https://search.google.com/structured-data/testing-tool)で表示を確認。実際の検索結果に出てくるかどうかはわからないけど、データ的には特に問題なさそうである。

以上。
