---
title: デザインを変更（2011/12）
date: 2011-12-24T18:04:00.000Z
categories:
- web
tags:
- design
- jquery
---
デザインを変更してみました。前回の変更は[こちら](/blog//2010/12/redesign_2011/)。今回はコンテンツ部分はほとんど変えずに、ヘッダー/フッター周りとかを中心に。

メインの変更としましては、今年流行の[responsive web design](http://www.alistapart.com/articles/responsive-web-design/)的な対応をしてみました。[Breakpoints.js](http://coliss.com/articles/build-websites/operation/javascript/jquery-plugin-breakpoints.html)というjqueryのpluginを使用すると、bodyに「breakpoint-1024」みたいなclassを表示サイズにあわせて追加してくれるので、そこでCSSを追加しただけというシンプルな方法で。あとviewpointの設定を<meta name="viewport" content="width=device-width" />に変更しました。まあとりあえず動作するところまで作りたかったので、もろもろ随時改善はしていきたいなあと思っています（思っているだけ）。

<!-- more -->

いまのところCSSで非表示にしているだけなので、コンテンツの出力はするし、画像も表示サイズにフィットするようにはしてみましたがファイルサイズは変わらないので、3Gで写真系のコンテンツを見ようとすると結構時間がかかってします。そのあたりも最適化できるのが理想ではあります。けど、まあ、簡単にできる方法がわからないので保留（簡単な方法あるのかな）。

そして、今さらはまったこととしては、Retinaディスプレイの解像度。解像度が高いけど表示領域は320pxだから、小さな画像を表示しようとすると（解像度が足らずに）画像がぼやけた感じになる。そのぼやけた感じが、あまりにあんまりだったので、小さい画面用のバナー画像は一回作り直しました。320pxの幅のイメージを表示するのに、640pxの画像を作成してそれを50&#x25;で表示するって、、なんかあれですね、変な感じですね。

こうやってあれこれやってみると、なんというか、WEBデザインって数年前に比べてやること増えましたよねえ。技術的にも複雑になっていて、ただHTMLを書けるだけでは、なんかもう不十分。新しいコンセプトもどんどこ出てくるし。simplebitsの人がA List Apartの記事に下記のようなことを書いていたのですが、すべての技術を掌握するのではなく、必要なタイミングで必要な技術をがばっとつかんでそれを積み上げていく、そんな仕事の仕方が求められるんだろうなあと思った次第です。pushからpullみたいな。

> These recent advances can seem overwhelming to keep up with: HTML5! CSS3! Responsive Web Design! Mobile! Web Fonts! Grids! It's become impossible to keep up with everything. And that's why I've learned to let go and focus on incrementally folding these new ways of thinking into daily work as I grasp them--while at the same time trying not to worry about everything being perfect or solving a problem "correctly."  
> [A List Apart: Articles: What I Learned About the Web in 2011](http://www.alistapart.com/articles/what-i-learned-about-the-web-in-2011/)

また気が向いたところでデザインを変えたりするので、今の状態のキャプチャを最後に貼付け。デザイン的には[Blog – Park La Fun](http://parklafun.com/blog/)とか、[Popular - Media Queries](http://mediaqueri.es/popular/)をひたすらながめてみたりしました。  
  
![](http://farm8.staticflickr.com/7035/6578557639_364f4f23c3_o.png) ![](http://farm8.staticflickr.com/7171/6564730745_58630bbece.jpg)

あ、下のコンテンツの区切りに使っているオーナメント的なものは[design shack](http://designshack.net/articles/freebies/weekly-freebies-flourishes-and-ornaments/)で紹介されていたサイトからダウンロードしてきました。

#### 追記（2012/1/4）

フォントのサイズは[A Book Apart, Responsive Web Design](http://www.abookapart.com/products/responsive-web-design)を参考に、ブラウザのデフォルトが16pxと想定してem表記に変更した。ブラウザのデフォルトが12pxとか小さい場合、それに応じてフォントサイズが変更されるようになりました。

コンテンツの横幅は最初breakpointで一つずつ固定値を指定していたけれど、100&#x25;を指定する形に変更。記事内容部分にはmax-width:840pxを追加。

記事タイトル部分（h1）はデフォルトをfont-size:0.875emとして、表示サイズが768px以上の場合は1.125emとなるように変更。breakponints.jsが付与するclassに対して指定しているので、javascriptが処理されるまでの間のフォントサイズが少し小さく表示されるのが若干気持ちよくないのだけれど、とりあえず現状維持。

#### 追記（2012/3/17)

トップページとカテゴリーアーカイブについては、記事部分の幅を「95&#x25;」にしつつ、各記事が3つずつ並ぶように調整してみました。float:leftで回り込みさせているだけなので、概要の長さによって期待通りに3列になってくれない場合がある。ので、.post:nth-child(3n+1)でclear:floatしてみました。nth-childに対応していないブラウザでは気にしない方向で..

```
.index #posts,.category #posts{ max-width: 95&#x25;; }
.breakpoint-768 .list-post,.breakpoint-1024 .list-post{width: 31&#x25;; float:left; margin: 1em 1em 0 0;}
.post:nth-child(3n+1){clear:both;}

```

#### 追記 (2012/5/23)

Breakpoint.jsをやめて、普通にmedia queriesで処理するように変更しました。フォントサイズも少し大きく。

#### 追記（2012/6/18）

JQuery Masonryを使用してpinterest風にしてみました。[縦方向のfloatを実現するjQuery Masonry - メモログ](/blog//2012/06/jquery_masonry/)
