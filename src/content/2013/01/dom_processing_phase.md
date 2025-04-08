---
title: Navigation TimingとDom processing phase
date: 2013-01-28T22:00:00.000Z
categories:
  - web
tags:
  - javascript
  - performance
excerpt: "Navigation Timingの仕様では、ナビゲーションや要素にアクセスするタイミングの情報を得ることができる。このNavigation Timingの情報を表示するには、ブラウザのデベロッパーツールなどのコンソールで、window.performance.timingを実行する。現在のサポートブラウザはCan I use... Support tables for HTML5, CSS3, etcの通り。"
---

[Navigation Timing](http://www.w3.org/TR/navigation-timing/)の仕様では、ナビゲーションや要素にアクセスするタイミングの情報を得ることができる。この Navigation Timing の情報を表示するには、ブラウザのデベロッパーツールなどのコンソールで、[window.performance.timing](http://www.w3.org/TR/navigation-timing/#sec-window.performance-attribute)を実行する。現在のサポートブラウザは[Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/#feat=nav-timing)の通り。

取得できる情報は下の画像のグラフのような値。最初の値である navigationStart は、ひとつ前の Document を unload する作業を開始した直後に発生する（前の Document がなければ fetchStart と同じになる）。そして、リダイレクトが必要なリダイレクトの時間、新しい Document の取得をし始めたら fetchStart、domain の lookup、サーバーとの接続、リクエスト、レスポンス、そして DOM の処理へと進みます。このあたりは[4.2 The PerformanceTiming interface](http://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface)に詳しく載っています。 ![](http://www.w3.org/TR/navigation-timing/timing-overview.png)

[domLoading](http://www.w3.org/TR/navigation-timing/#dom-performancetiming-domloading)には、current document readiness が"loading"の状態になる直前の時間が入る（This attribute must return the time immediately before the user agent sets the current document readiness to "loading"）。[current document readiness](http://www.w3.org/TR/html5/dom.html#current-document-readiness)は、Document オブジェクトの待ち受け状態で、Document オブジェクトが新しく作成されると、その Document の current document readiness は「loading」の状態になる。つまり、domLoading は Document オブジェクトが新しく作成されたタイミングで発生すると。

上の画像ではすべての処理が直列に行われるようなイメージですが、実際の動きを確認した限りでは、Document は responseStart の直後に新しく作成するようで、responseEnd より若干先に始まる（並列で処理される）。Firebug で performance.timing を実行すると、下の画像のようなグラフィカルな感じになって見やすいのですが、「Dom Processing」の項目が responseEnd から domComplete の間までのグラフになっているので、若干語弊があるように見えなくもない（domLoading は「Recieving」の途中で発生している）。でもクリティカルパスの可視化という意味では間違いではないかもしれない（responseEnd が終わらない限りは Dom processing が終わることはない）。そのあたりの意図は不明... ![](http://farm9.staticflickr.com/8055/8404329267_eeba922823_z.jpg)

そして domLoading の次は domInteractive。これは current document rediness が「interactive」の状態になる直前の時間で、[interactive](http://www.w3.org/TR/html5/syntax.html#the-end)は、HTML parser がストップしたらそのように設定される。つまり、HTML(DOM)のパースと、Javascript の実行（スクリプトの評価とかイベントハンドラの登録とか）などが含まれる。script タグに defer 属性がある場合は「interactive」よりも後に実行される（DOMContentLoaded のイベント発生より前）。CSS については[a style sheet that is blocking scripts と DOMContentLoaded](/blog//2013/01/a_style_sheet_that_is_blocking_scripts_and_dom_content_loaded/)で記載した通り、Javascript がパーサーをブロックするかどうかで異なるけれど、たいていは interactive の前に available to script な状態になっているはず。

domInteractive の後に、defer 属性のついた script が処理されて、DOMContentLoaded のイベントが発生して、このイベントを待っている処理が実行される（DOMContentLoadedEventStart）。jQuery で ready 状態を待って処理を実行する場合は、DOMContentLoaded のイベントを待っているので、このタイミングで実行されることになる。

そして DOMContentLoaded で実行された処理が終わると DOMContentLoadedEventEnd となり、HTML パースしたときに見つけた画像の読み込みなど、load event 前に終わらないといけないものが残っていたら、終わるのを待って、current document rediness が「complete」になる。そして(on)load イベントが発生する。(on)load でイベントを待っている処理がある場合はそこから実行される。

という感じで、performance.timing で Dom processing の流れをながめると、(1) domLoading -> (2) domInteractive -> (3) domContentLoadedEventStart -> (4) domContentLoadedEventEnd) -> (5) domComplete -> (6) load(EventStart/EventEnd) という観測地点があることが分かる。(1)から(2)までは、HTML のパース（と Javascript の読み込みと実行、あとたいていの場合 CSS のロード）の処理の長さが推測できる。(2)から(3)は主に defer になった script の実行時間、(3)から(4)は domContentLoaded のイベントで発生した処理の時間（主に jQuery で ready にしていた処理が入ると思われる）、(4)から(5)は、パース時に取得した画像の読み込みなど、そのほか load 前に終わられる処理の時間などが推測される（(5)から(6)はほぼ同時）。たぶん。
