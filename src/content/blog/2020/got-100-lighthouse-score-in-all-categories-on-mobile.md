---
title: Got 100 lighthouse score in all categories on mobile
featured:
  image: ben-koorengevel-tpIWpoW3_Wc-unsplash
  author: Ben Koorengevel
  authorLink: https://unsplash.com/@benkoorengevel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-09-16 12:45:52
---
ふとLighthouseを走らせみたら、微妙に100点行ってなかったので、調整して100点を目指してみた。<!-- more -->

そしてmobile/pcともに100点を獲得した。オール100になると花火があがる。

{% youtube id=tFSOmRADKvk title="Got 100 score in all categories on mobile" %}

といっても数回に1回、100点になるみたいな感じで、微妙に100点いかない。

大きな要因としては[lighthouseのランタイムの設定](https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md#devtools-lighthouse-panel-throttling)の「Simulated throttling」で、これを有効にしているとNetworkのthrottlingやCPUのthrottlingが行われる。NetworkはSlow 4G (Fast 3G)くらいの速度で検証され、この状態だとHTMLを取得するだけで1秒とか2秒とかかかる雰囲気。だからこの状態で[Largest Contentful Paint](https://web.dev/lighthouse-largest-contentful-paint/)を満点にするのがまあ厳しい。上のキャプチャでは100点いってるけど、だいたい92〜98点とかの間になる。

Simulated throttlingをオフにすると、Largest Contentful Paintとかの評価は全部緑にはなるんだけど、[Lighthouse Scoring Calculatorの結果](https://googlechrome.github.io/lighthouse/scorecalc/#first-contentful-paint=747.876&speed-index=1392&largest-contentful-paint=1760.448&interactive=2524.839&total-blocking-time=1.4339999999997417&cumulative-layout-shift=0&first-cpu-idle=2524.839&first-meaningful-paint=747.876&device=mobile&version=6.0.0)のように、99点とか微妙に足りなかったりする。

このほぼほぼ何もないサイトでこんな感じなので、performanceについては、100点目指すのはかなり無理で、80点近傍なら合格と見なす方が良いのかなと思う。[dev.to](https://dev.to/)とかすごい頑張ってると思うけど、Lighthouseのperformanceのスコアは84点だった。

あと[content-visibility](https://web.dev/content-visibility/)を試しに`.article-summary`（記事を囲っている要素）に以下のような感じで入れてみたのだけど、

```css
  content-visibility: auto;
  contain-intrinsic-size: 700px 577px;
```

コンテンツを中央揃えにしているところと相まって [Cumulative Layout Shift](https://web.dev/cls/) のところで問題が発生してしまう。目視ではわからないが、devtoolsで確認すると、記事が左上（x:0, y:0）の位置に配置され、そこから真ん中に移動する感じになってしまう。なので結局入れなかった。

また、このタイミングで[lazysizes](https://github.com/aFarkas/lazysizes)をやめて、[loading属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img)を`lazy`にする方法してみた。しかしlazysizesの処理がなくなった代わりに画像のロードのタイミングが早まるため、全体として良くなったか悪くなったか良くわからずという感じで、まああまり変わらなかったかもしれない（面倒だから元に戻さないけど）。

というメモ。
