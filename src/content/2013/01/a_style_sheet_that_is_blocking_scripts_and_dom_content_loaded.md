---
title: a style sheet that is blocking scripts と DOMContentLoaded
date: 2013-01-23T15:07:00.000Z
categories:
  - web
tags:
  - css
  - javascript
  - parsehtml
excerpt: "DOMContentLoaded and stylesheets · molily（via DOMContentLoaded - Mozilla event reference | MDN）にて、head内のスタイルシートとJavascriptの配置の違いで、DOMContentLoadedイベントが発生するタイミングが変わるという内容が掲載されています。スタイルシートのあとにJavascriptが入っていると、DOMContentLoadedはスタイルシートをロードしたあとに発生して、スタイルシートのあとにJavascriptがないと、スタイルシートのロードを待たずにDOMContentLoadedが発生する。"
---

[DOMContentLoaded and stylesheets · molily](http://molily.de/weblog/domcontentloaded)（via [DOMContentLoaded - Mozilla event reference | MDN](https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/DOMContentLoaded_%28event%29)）にて、head 内のスタイルシートと Javascript の配置の違いで、DOMContentLoaded イベントが発生するタイミングが変わるという内容が掲載されています。スタイルシートのあとに Javascript が入っていると、DOMContentLoaded はスタイルシートをロードしたあとに発生して、スタイルシートのあとに Javascript がないと、スタイルシートのロードを待たずに DOMContentLoaded が発生する。

これは[Parsing の仕様](http://www.w3.org/TR/html5/syntax.html#parsing-main-incdata)によると、[pending parsing-blocking script](http://www.w3.org/TR/html5/scripting-1.html#pending-parsing-blocking-script)の実行前に、Document が [has no style sheet that is blocking scripts](http://www.w3.org/TR/html5/document-metadata.html#has-no-style-sheet-that-is-blocking-scripts)の状態になるまで、[event loop を spin させる](http://www.w3.org/TR/html5/webappapis.html#spin-the-event-loop)からということになるみたい。

> If the parser's Document has a style sheet that is blocking scripts or the script's "ready to be parser-executed" flag is not set: spin the event loop until the parser's Document has no style sheet that is blocking scripts and the script's "ready to be parser-executed" flag is set.

つまり、pending parsing-blocking script（HTML パーサーが insert した script タグのうち、defer や async 属性がついていないもの）が実行前に、style sheet that is blocking scripts（HTML パーサーが追加したスタイルシートのうち、ロードされていないもの（style sheet ready flag is not yet set））がある場合、ロードされるまで[event loop をまわす](http://www.w3.org/TR/html5/webappapis.html#processing-model-3)。スタイルシートがロードされ、style sheet ready の状態になると、event loop の「update the rendering」のステップで script での利用が可能な状態になり、他にロード待ちがなければ script の実行に移ると。こうすることで、スタイルシートで指定しているフォントの色なんかの値を、script が適切に受け取ることができると。

DOMContentLoaded のイベントは、[8.2.6 The end](http://www.w3.org/TR/html5/syntax.html#the-end)に記載によれば、HTML のパースが一通り完了して、defer 属性がついた script などを処理したあとに発生する。ので、スタイルシートの後に script がある場合、script がパーサーをブロックしつつスタイルシートのロードを待った上で実行されるため、DOMContentLoaded はスタイルシートがロードされるまで待つことになる。一方、スタイルシートの後に script がない場合は、パーサーをブロックしてロードを待つことがないため、ロードが完了していなくても、HTML パースが完了して DOMContentLoaded のイベントが発生する。と、いうことになる。みたい。

ただ、[DOMContentLoaded and stylesheets · molily](http://molily.de/weblog/domcontentloaded)の[Testcase #2](http://molily.de/assets/domcontentloaded/t2-link-external-script.html)で試した感じでは、Opera は script の実行前にスタイルシートのロードを待たない雰囲気。そのため DOMContentLoaded の実行がロードより早く、getComputedStyle で取得したフォントの色の値にスタイルシートで設定した色が反映できていない（他のブラウザは head の部分でパーサーがブロックされるのでコンテンツが表示されるまでに時間がかかる）。

Opera の動作の差異を気にしないとしても、script の実行時（ダウンロード時ではない）にスタイルシートが available な状態になっていないと、実行はブロックされた状態になるので、スタイルシートのロードをできるだけ先にして、javascript はできるだけ後にする、というのが基本的には良いかもしれない。

script で現在のスタイルの値をまったく参照しないみたいな、スタイルシートと script を独立できるのであれば、script を先に読み込むというのもありかもしれません（その方がロードによるブロックは発生しない）。ただ、Safari(6)と Chrome(24)では、結局スタイルシートがロードし終わるまでコンテンツが表示されなかったですが...（Firefox は表示される）
