---
title: 実際に表示されているブロック要素のサイズを表示する
date: 2007-08-07T16:47:00.000Z
categories:
- web
tags:
- css
---
単純にwidthを指定しているところであればブロック要素の横幅はすぐにわかるのですが、borderやpadding、marginが入るとわかりにくくなる。たとえば <div style="width:100px;"><div style="padding:10px;" ></div></div> のように、入れ子で指定されている横幅がいくつになるのか、いちいち計算するのはめんどうくさい（右の例のように単純なときはいいですけど）。

<!-- more -->

[WEB Developer](https://addons.mozilla.org/ja/firefox/addon/60)の「Display Block Size」（informationのメニューの中の項目）では、実際に表示されているブロック要素の縦幅と横幅を表示してくれます。欠点はブロック要素がたくさん入れ子になっていると、下の画像のように重なりまくってしまい何がなんだかわからない状態になってしまうところ。

その欠点を補うために、Firefox アドオンの「[View Source Chart](https://addons.mozilla.org/ja/firefox/addon/655)」を利用。View Source Chart は構造化した状態でHTMLソースを表示してくれます。「Display Block Size」を適用した状態で、View souce chartを表示すると、それぞれのブロック要素のサイズが構造化されたHTMLソース上にうまいこと表示してくれます。これでブロック要素のサイズが重なって見えないということは回避することができる。 ![080701.gif](/blog//assets/i/2007/08/080701.gif)
