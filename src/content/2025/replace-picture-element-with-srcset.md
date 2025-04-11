---
title: Picture要素をやめてsrcsetを使う
date: 2025-04-11 17:07
featured:
    image: replace-picture-element-with-srcset.webp
    author: chatGPT
excerpt: "SVGでないFeatured ImageにはPicture要素を使ってWebPとjpg, pngを出し分けていたのですけど、気がついたらもうWebPが安全に利用できるようになっており、もう全部webpで良いじゃないかということになっていた。"
---
[Featured Image を設置する](/2018/display-featured-image)で[Picture要素](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/picture)を使って以来、SVGでないFeatured ImageにはPicture要素を使い続けていたのですけど、気がついたらもう[WebP](https://caniuse.com/webp)が安全に利用できるようになっており、もう全部webpで良いじゃないかということになっていた。

なので、昨日までChatGPTで生成した画像（png）を自前の[generate-responsive-images](https://github.com/memolog/generate-responsive-images-service)を使って、各種サイズのpngとwebpに変換してPicture要素のsourceにしていたけど、webpに変換するだけにしてみた（ついでに画像の横幅も今のサイズに合うようにした）。

```html
<img
  src="image.webp"
  srcset="image.webp, image@2x.webp 2x"
  role="presentation"
  loading="lazy"
  width="985"
  height="985"
  alt=""
/>
```

ChatGTPで出力した画像（pngで横幅1024px）は、そのままだと2MB〜3.5MBくらいするのですけど（pngだからかな）、WebPにするだけで100KB〜200KBくらいまで小さくなる。画像を[Primitive](/2018/image-manipulation-with-primitive.html)にかけてSVGにした方が、サイズは軽いしスケーラブルだしで、便利なところはあるけど、WebPで150KBくらいなら（高解像度のは300KBくらいあるけど）、まあ良いんじゃないかなあ。

というメモ。