---
title: a style sheet that is blocking scripts と DOMContentLoaded
date: 2013-01-23T15:07:00.000Z
categories:
- web
tags:
- css
- javascript
- parsehtml
---
[DOMContentLoaded and stylesheets · molily](http://molily.de/weblog/domcontentloaded)（via [DOMContentLoaded - Mozilla event reference | MDN](https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/DOMContentLoaded_&#x25;28event&#x25;29)）にて、head内のスタイルシートとJavascriptの配置の違いで、DOMContentLoadedイベントが発生するタイミングが変わるという内容が掲載されています。スタイルシートのあとにJavascriptが入っていると、DOMContentLoadedはスタイルシートをロードしたあとに発生して、スタイルシートのあとにJavascriptがないと、スタイルシートのロードを待たずにDOMContentLoadedが発生する。

<!-- more -->

これは[Parsingの仕様](http://www.w3.org/TR/html5/syntax.html#parsing-main-incdata)によると、[pending parsing-blocking script](http://www.w3.org/TR/html5/scripting-1.html#pending-parsing-blocking-script)の実行前に、Documentが [has no style sheet that is blocking scripts](http://www.w3.org/TR/html5/document-metadata.html#has-no-style-sheet-that-is-blocking-scripts)の状態になるまで、[event loopをspinさせる](http://www.w3.org/TR/html5/webappapis.html#spin-the-event-loop)からということになるみたい。

> If the parser's Document has a style sheet that is blocking scripts or the script's "ready to be parser-executed" flag is not set: spin the event loop until the parser's Document has no style sheet that is blocking scripts and the script's "ready to be parser-executed" flag is set.

つまり、pending parsing-blocking script（HTMLパーサーがinsertしたscriptタグのうち、deferやasync属性がついていないもの）が実行前に、style sheet that is blocking scripts（HTMLパーサーが追加したスタイルシートのうち、ロードされていないもの（style sheet ready flag is not yet set））がある場合、ロードされるまで[event loopをまわす](http://www.w3.org/TR/html5/webappapis.html#processing-model-3)。スタイルシートがロードされ、style sheet readyの状態になると、event loopの「update the rendering」のステップでscriptでの利用が可能な状態になり、他にロード待ちがなければscriptの実行に移ると。こうすることで、スタイルシートで指定しているフォントの色なんかの値を、scriptが適切に受け取ることができると。

DOMContentLoadedのイベントは、[8.2.6 The end](http://www.w3.org/TR/html5/syntax.html#the-end)に記載によれば、HTMLのパースが一通り完了して、defer属性がついたscriptなどを処理したあとに発生する。ので、スタイルシートの後にscriptがある場合、scriptがパーサーをブロックしつつスタイルシートのロードを待った上で実行されるため、DOMContentLoadedはスタイルシートがロードされるまで待つことになる。一方、スタイルシートの後にscriptがない場合は、パーサーをブロックしてロードを待つことがないため、ロードが完了していなくても、HTMLパースが完了してDOMContentLoadedのイベントが発生する。と、いうことになる。みたい。

ただ、[DOMContentLoaded and stylesheets · molily](http://molily.de/weblog/domcontentloaded)の[Testcase #2](http://molily.de/assets/domcontentloaded/t2-link-external-script.html)で試した感じでは、Operaはscriptの実行前にスタイルシートのロードを待たない雰囲気。そのためDOMContentLoadedの実行がロードより早く、getComputedStyleで取得したフォントの色の値にスタイルシートで設定した色が反映できていない（他のブラウザはheadの部分でパーサーがブロックされるのでコンテンツが表示されるまでに時間がかかる）。

Operaの動作の差異を気にしないとしても、scriptの実行時（ダウンロード時ではない）にスタイルシートがavailableな状態になっていないと、実行はブロックされた状態になるので、スタイルシートのロードをできるだけ先にして、javascriptはできるだけ後にする、というのが基本的には良いかもしれない。

scriptで現在のスタイルの値をまったく参照しないみたいな、スタイルシートとscriptを独立できるのであれば、scriptを先に読み込むというのもありかもしれません（その方がロードによるブロックは発生しない）。ただ、Safari(6)とChrome(24)では、結局スタイルシートがロードし終わるまでコンテンツが表示されなかったですが...（Firefoxは表示される）
