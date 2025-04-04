---
title: YSLOW 勉強 &#x3a; まとめ
date: 2007-08-18T16:29:00.000Z
categories:
  - web
tags:
  - yslow
excerpt: "*   1 : HTTPのリクエストを最小限にしよう *   2 : CDNを利用しよう"
---

- [1 : HTTP のリクエストを最小限にしよう](/blog//2007/08/yslow_1_minimize_http_requests/)
- [2 : CDN を利用しよう](/blog//2007/08/yslow_2_use_a_content_delivery/)

- [3 : Expires Header を追加しよう](/blog//2007/08/yslow_3_add_an_expires_header/)
- [4 : Gzip 化しよう](/blog//2007/08/yslow_4_gzip_components/)
- [5 : CSS はページの上に配置しよう](/blog//2007/08/yslow_5_put_css_at_the_top/)
- [6 : スクリプトはページの下に配置しよう](/blog//2007/08/yslow_6_move_scripts_to_the_bo/)
- [7 : CSS expressions の使用は控えよう](/blog//2007/08/yslow_7_avoid_css_expressions/)
- [8 : CSS と script は外部ファイルにしよう](/blog//2007/08/yslow_8_make_javascript_and_cs/)
- [9 : DNS lookups を減らそう](/blog//2007/08/yslow_9_reduce_dns_lookups/)
- [10 : Javascript を最小化しよう](/blog//2007/08/yslow_10_minify_javascript/)
- [11 : リダイレクトを控えよう](/blog//2007/08/yslow_11_avoid_redirects/)
- [12 : 重複する script を削除しよう](/blog//2007/08/yslow_12_remove_duplicate_scri/)
- [13 : ETags を設置しよう](/blog//2007/08/yslow_13_configure_etags/)

YSLOW の勉強のまとめ。最後に自分の所感をまとめておきます。

YSLOW における 13 の評価基準を一つずつ見てきてわかったことは、YSLOW とは、HTTP の応答を減らせる余地があるかないかを評価するためのツールだということ。それは 1 の解説にあった「「ユーザーの待ち時間の大半は画像や CSS、javascript、Flash などのページの構成要素のダウンロードに費やされている」という原則を根本としている。

評価基準は HTTP の応答を減らせるアイデアを 13 個連ねたといった体裁で、それぞれの難易度がまちまちです。[7 : CSS expressions の使用は控えよう](/blog//2007/08/yslow_7_avoid_css_expressions/)のように比較的簡単なものから、[2 : CDN を利用しよう](/blog//2007/08/yslow_2_use_a_content_delivery/)のように対応が開発的にも・コスト的にも難しいものまであるし、[10 : Javascript を最小化しよう](/blog//2007/08/yslow_10_minify_javascript/)のように、対応は難しくなくても、メンテナンスが猥雑になる懸念があるものもある。すべてを「A」にするよう努力するよりは、全体の利益とコストを鑑みて、ケースバイケースで最適な対応を考えるのが肝要なのかと思います。

13 の評価基準をオペレーション作業と HTML コーディング作業のふたつに分けるとしたら、[2](/blog//2007/08/yslow_2_use_a_content_delivery/)、[3](/blog//2007/08/yslow_3_add_an_expires_header/)、[4](/blog//2007/08/yslow_4_gzip_components/)、[9](/blog//2007/08/yslow_9_reduce_dns_lookups/)、[11](/blog//2007/08/yslow_11_avoid_redirects/)、[13](/blog//2007/08/yslow_13_configure_etags/)がオペレーション作業で、[1](/blog//2007/08/yslow_1_minimize_http_requests/)、[5](/blog//2007/08/yslow_5_put_css_at_the_top/)、[6](/blog//2007/08/yslow_6_move_scripts_to_the_bo/)、[7](/blog//2007/08/yslow_7_avoid_css_expressions/)、[8](/blog//2007/08/yslow_8_make_javascript_and_cs/)、[10](/blog//2007/08/yslow_10_minify_javascript/)、[12](/blog//2007/08/yslow_12_remove_duplicate_scri/)は HTML コーディング作業に分けられるかと思います。

HTML コーディングを業務の一部にしていたものとしては、やはり後者の方がより興味がそそられました。どれもわりと普通のことが書かれている感がありますが、たとえば「大規模な集客を想定しているポータルサイトだから、画像の点数を減らしてサイトが重くならないようにしよう」とか、そういったソリューションを持った HTML コーディングなどを頭に妄想させていると、わくわくしますね。たぶん誰も気がつかないと思いますが、サーバーの負荷を少し減らして、そして最終的には地球に優しい HTML になっている、はず（かなあ）。

最後に、この勉強を書き連ねている最中に見つけた、日本語でより詳細に記しているサイトを紹介しておこうと思います（勉強始める前に探しておけばよかった）。

- [Web サイトの高速化 フロントエンドのパフォーマンスの重要性 (Yahoo! developer netowork より翻訳) || パフォーマンスチューニング Blog: インターオフィス](http://www.inter-office.co.jp/contents/177)
