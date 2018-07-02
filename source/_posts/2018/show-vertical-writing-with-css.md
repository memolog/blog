---
title: 縦書きで表示する
featured:
  image: dmitri-popov-441562
  author: Dmitri Popov
  authorLink: https://unsplash.com/photos/IDF_awES6Zg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2018-02-03 12:05:36
---
{% div writing-vertical %}
最近になって[writing-mode](https://developer.mozilla.org/ja/docs/Web/CSS/writing-mode)を使うと文章の表示を簡単に縦書きにできるということを最近知った。ので、この記事では縦書きの表示を試している。以下の文章は文章量が長くなった時にどう表示されるのかを知りたくて入れているだけなので、内容的にほぼ意味はない（ないというほどでもないけど限りなく無に近いものではある）。なおインデックスページでは横書きである。<!-- more -->

読みやすいか読みにくいかでいうと読みにくいかな。日本語の書籍だと、技術系のものを除けば基本的に縦書きの方が読みやすいのだけど、WEBだと縦書きはだいぶ読みにくい。右から左の流れも慣れない。もう目の流れが横書きに慣れてしまっていると言うことなのだろうか。タイトル部分もも縦書きにすると印象変わるかもしれないので、あとで試してみようと思う。

雰囲気は良いなと思う。WEBの文章はやはりゴシックの方が読みやすいところがあるけれど、縦書きになると明朝体の方がずっと読みやすくなる。明朝体は縦書きの流れに適しているということだろうか。今ふと気になってGoogleで調べてみたら[源ノ明朝には縦書き用の"かたち"がある](https://news.mynavi.jp/article/20170411-source_han_serif/)らしい。

> また、一般的に縦書きの文字の方が、横書きと比較して大きく見えるため、「源ノ明朝」では横書き・縦書きで異なる字形を保有し、自動的に最適なものに切り替えている。

なるほど🤔（Safariだと絵文字が横になる）。個人的には明朝体はゴシック体に比べて小さいと読みにくいとことはあるから、逆に大きく見えるくらいの方が読みやすい気もするけど、統一感で考えたらやっぱり同じフォントサイズの指定をしているときは見た目は同じに見える方がいいですね。日本語フォントはWEBフォントとしては大きすぎるし、サブフォント作るの面倒くさいしで結局使ったことはないですけど、そのうちこの記事と同じように実験的に使ってみようかなあと今思った。

コードブロックを縦書きにするとどうなるかも一応試してみたけど、だいぶどうしようもない感じになるので止めておいた。コードブロックなどの部分は横書きにして、下にまとめて書こうと思う。

長い文章を書き続けると、親の要素でwidthの指定があるにも関わらず、どこまでも横に伸びていってしまう。これはどうしてそうなるのかはよくわからない。仕様を見ればわかるのだろうけど詳細はまた別の機会に調べようと思う。たぶんテキストの流れの縦横の関係がスイッチしていて、縦幅を指定していてもテキストがそれより長い場合はあふれて表示されることと同じなのだろうと思う。とはいえ、writing-modeを指定している要素にwidthを指定しつつ、[column-count](https://developer.mozilla.org/ja/docs/Web/CSS/column-count)を1に指定しておくと（1で指定するとSafariで反応しないので2に指定した）、期待通りの横幅で縦に折り返すことができるようになった。これも[マルチカラムレイアウト](https://developer.mozilla.org/ja/docs/Web/Guide/CSS/Using_multi-column_layouts)の仕様が関係していると思うけど、詳しくは調べていない。だからこれが正しい挙動なのかどうかはわからない。あと現状のline-heightとかwidthの関係で、テキストの横幅が微妙に横幅より狭く見えるので、少しだけ調整している。折り返しの位置が横幅によって微妙に変なのは、仕方ないのかな。

あと最後の段落は文章の左側に余白が残るのだけど、WEBで見るとだいぶ不自然な感じはある。縦書きは一つの段落でおさまる文章で書くのがベストかもしれない。文章量的には縦書きに比べてだいぶ入るなあという感じはある。数えてないけど。
{% enddiv %}

----
最近になって[writing-mode](https://developer.mozilla.org/ja/docs/Web/CSS/writing-mode)を使うと文章の表示を簡単に縦書きにできるということを最近知ったので使ってみたという話。縦書きにすると文章量が長くなっても横幅に関係なく折り返されずに表示されるようになる。横幅は表示する端末によって変わることを考えると厳しい制限事項だなと思う。

指定しているCSSの中で縦書きと関係ある部分はだいたいこんな感じ。

```css
.writing-vertical {
  writing-mode: vertical-rl;
  column-count: 2;
  max-width: 900px;
  width: 102%;
  overflow: auto;
  height: 800px;
}
```

マルチカラムレイアウトを使用すると折り返して表示することができるようだが、heightの調整が難しい。heightの指定はauto（最大でウィンドウと同じ大きさになる様子）か、800pxとか固定値で決める必要がある。ボックスからあふれたコンテンツはoverflowがhiddenでなければ表示されるのだけど、ボックスの大きさは変わらないので縦書きコンテンツの下に何か他のコンテンツを挿入するとコンテンツが重なって表示されてしまうようだ。これは仕様上の問題なのか実装上の問題なのかは調べてないのでわからない。とにかく現状ではそういう感じになる。コンテンツの横幅が狭いとその分コンテンツの高さが必要になるので、どんな固定値であってもコンテンツがバシッとおさまるようにはできない。

だから分量の多いコンテンツを縦書きにするなら下にコンテンツを置かないか、`overflow:auto` などしてあふれたコンテンツを重ならないようにする必要がある。

そしてマルチカラムで次のカラムに移動するときに折り返し位置を指定する手段がなさそうにみえる（あるかもしれないけど）。それで左側に微妙な余白が生まれてしまうので、ここの見た目は微妙。[グリッドレイアウト](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)ならもしかしたらうまい回避方法見つかるかも...とも思ったが、今のところ見つかってない。

という感じでまだまだなところが多いが、最小な端末（320 x 480 かな）で1画面でおさまる分量なら問題なく使えると思われる。だからリード文とかコンテンツの量が少なくてすむ箇所とか、現状でも使い道はあるかなという気はした。