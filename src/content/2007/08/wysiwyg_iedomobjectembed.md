---
title: WYSIWYG ：IEのDOMではobjectタグの中にあるembedタグを認識しない？
date: 2007-08-06T14:45:00.000Z
featured:
  image: wysiwyg_iedomobjectembed.webp
  author: chatGPT
categories:
  - web
tags:
  - ie
  - javascript
excerpt: "あいまいなタイトル。実のところ、詳しくはよくわかっていないのですが、どうもIEのDOMではobjectタグの中にあるembedタグは削ってしまうようなのである。謎なのです。  webアプリケーションでよくあるWYSIWYGエディタ（リッチテキスト）では、すごくざっくりいうと、Javascriptで入力フォームであるiframe中のHTMLをツールボタンのクリックなどのイベントにあわせて、書き換えて動かしている。言い換えると、ブラウザが持っている情報を引き出して、変更して押し込んで、というやりとりをしている。そのため、ブラウザ側で期待されるデータを出力してくれないと、エディタから情報が消えてしまったりする可能性がある。"
---

あいまいなタイトル。実のところ、詳しくはよくわかっていないのですが、どうも IE の DOM では object タグの中にある embed タグは削ってしまうようなのである。謎なのです。

web アプリケーションでよくある WYSIWYG エディタ（リッチテキスト）では、すごくざっくりいうと、Javascript で入力フォームである iframe 中の HTML をツールボタンのクリックなどのイベントにあわせて、書き換えて動かしている。言い換えると、ブラウザが持っている情報を引き出して、変更して押し込んで、というやりとりをしている。そのため、ブラウザ側で期待されるデータを出力してくれないと、エディタから情報が消えてしまったりする可能性がある。

たとえば`<object classid=""><embed></embed></object>`という object タグの中に embed タグが入っている状態のタグをコピーして WYSIWYG エディタで貼付けると、Firefox では貼付けたままのものが出力されるけれど、IE では embed タグが抜けた状態で出力される。

object タグと embed タグを別々に使っている分には、特に問題ないように見受けられる。どうも object タグの中に embed タグが入るということを IE が DOM 構造として認めていない（無視している）のではないだろうかと推察している。IE developer tool で DOM を見たところでも、object タグに埋めた embed はどこにも表示されない。しかし確たる情報もなく、悶々としている。
