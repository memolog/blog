---
title: 黄金比によるWebレイアウト
date: 2006-03-19T16:28:01.000Z
featured:
  image: 922875ilsdl.webp
  author: Rudolf Wilke
  authorLink: https://artvee.com/artist/rudolf-wilke/
categories:
  - web
tags:
  - css
  - design
excerpt: " 「Balance in Design 美しく見せるデザインの原則」に触発され、「黄金比によるWebレイアウト」を実践してみました。黄金比とは「最も美しい比」と呼ばれている比率で、具体的には5:8（1:1.618...)の縦横比をさします。バランスが良く安定した形で、人工物のみならず自然物にも美しいと感じるものの多くに黄金比が存在するそうです。"
---

「[Balance in Design 美しく見せるデザインの原則](http://www.amazon.co.jp/exec/obidos/ASIN/4861003245/ref=nosim/yutakayamaguc-22)」に触発され、「黄金比による Web レイアウト」を実践してみました。黄金比とは「最も美しい比」と呼ばれている比率で、具体的には 5:8（1:1.618...)の縦横比をさします。バランスが良く安定した形で、人工物のみならず自然物にも美しいと感じるものの多くに黄金比が存在するそうです。

さて実践。最初に全体のレイアウトから。縦幅を 800px に想定して、そこから横幅を計算してみました。800px を長辺とすると、短辺は 1.6 で割って 500px。しかし横幅 500px だとなんとなく狭い感じがしたので、800px を 2 で割って、短辺を 400px とした 2 つの黄金長方形として考えることにしました。400px を短辺とすると、長辺は 1.6 をかけて 640px。最終的に微調整をして横幅を 650px としてみました。

次に横幅 650px を 5:8 に分けて、メインカラムを 400px、サイドバーカラムを 250px としてみました。厳密には 5:8 ではありませんが、10px 単位でレイアウトを分けた方が楽なので。サイドバーカラムに 250px も必要ないように感じたので、250px をさらに 160px と 90px に分割。

次にロゴを入れる箇所を作るために、縦幅 400px を 150px と 250px に分けて、上の 5 の部分にロゴを入れることにしました。最初はページ全体の上をロゴ部分にしようと思っていましたが、最終的にはサイドバーカラムの上だけをロゴ部分にしました。

そして下記のデザインが完成しました。少しメインカラムが狭いようにも感じますが、まあまあのできばえ。横幅 760px、縦幅を 950px（475+475）ぐらいでレイアウトしても良いかもしれませんね。これだと逆に縦に長くなりますが。

![](/assets/i/etc/site20060318.gif)

#### 参考

- [Wikipedia - 黄金比](http://ja.wikipedia.org/wiki/黄金比)
