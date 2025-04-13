---
title: Gridinit：クラウドベースで複数ブラウザにテスト配布
date: 2011-05-15T14:30:00.000Z
categories:
  - software testing
tags:
  - performance
  - watir
excerpt: "Gridinitという新サービスをざっくり紹介。SeleniumやWatirなどの自動化スクリプトをクラウド上にある複数のブラウザに配布してくれるそうです。作成したテストスクリプトを複数ブラウザで実行することによって、負荷検証を行うことができる、みたいな。「watir-webdriver-performance: PerformanceTimingの集計 - メモログ」で紹介したwatir-webdriver-peformanceのモジュールを組み合わせてブラウザのPerformanceTimingの情報を取得することもできるみたい。"
---

[Gridinit](http://gridinit.com/)という新サービスをざっくり紹介。Selenium や Watir などの自動化スクリプトをクラウド上にある複数のブラウザに配布してくれるそうです。作成したテストスクリプトを複数ブラウザで実行することによって、負荷検証を行うことができる、みたいな。「[watir-webdriver-performance: PerformanceTiming の集計 - メモログ](/2011/04/watir-webdriver-performance/)」で紹介した watir-webdriver-peformance のモジュールを組み合わせてブラウザの PerformanceTiming の情報を取得することもできるみたい。

価格（[Pricing](http://gridinit.com/public/pricing)）は「credit」という単位で使った分だけ支払うみたいな感じになっています（登録時に 20 credit がついてくる）。1 credit で 1 リソースを 1 時間使用することができるそうです。つまり 500 ブラウザを同時実行したい場合は 500 credit 必要ということになります。500 credit は 50$（1$80 円で 4000 円）なので、商用のパフォーマンステストツールと比較すると相当に安いと思います。

ただ、クラウド上のブラウザからアクセスがくるのでプライベートなサイトには今のところ使用できないみたいです。[Altentee](http://altentee.com/blogs/2011/gridinit-beta-released/)によると次期機能としては考えているみたいですけど。あと、1 ブラウザを 10 秒ごとに増やすとかできるのかとか、そもそも 500 ブラウザ同時に動かせるのかとか、ちゃんと使ってみないと分からないところもある。HTTP の通信だけではなくて、ブラウザそのものを操作するかたちになるので、500 ブラウザでも負荷の量としてはもしかしたら少ないかもしれない。それもやはり実際に動かしてみないと分からない。それと、ネットワークを経由するので適切に負荷がかかるのか（ネットワークの遅延によって負荷がかからないかもしれない）、きちんとした負荷検証になるのかとかも気になるところではある。

しかし、とにかくこの安さは魅力的。とりあえず負荷を与えてみて、サーバーがどんな状態になるかをみたいという場合には試してみる価値はありそうな気がします。
