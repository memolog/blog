---
title: weinreでAndroidのWebViewをInspectする
date: 2013-02-02T13:52:00.000Z
categories:
  - web
tags:
  - android
  - node
  - phonegap
excerpt: "AndroidのWebViewをinspectするという話。調べてたら第3回　weinreを使ったiOS／Androidアプリの動作検証：もっと使おうPhoneGap／Cordova 2.0.0｜gihyo.jp ... 技術評論社にすでに詳細に書いてあったのでそちらも参考に。Remote Debugging Firefox OS with Weinre ✩Mozilla Hacks – the Web developer blogの話だと、Firefox OSでも同じようにinspectができるみたい。"
---

Android の WebView を inspect するという話。調べてたら[第 3 回　 weinre を使った iOS／Android アプリの動作検証：もっと使おう PhoneGap／Cordova 2.0.0 ｜ gihyo.jp ... 技術評論社](http://gihyo.jp/dev/serial/01/phonegap2/0003)にすでに詳細に書いてあったのでそちらも参考に。[Remote Debugging Firefox OS with Weinre ✩Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2013/01/remote-debugging-firefox-os-with-weinre/)の話だと、Firefox OS でも同じように inspect ができるみたい。

なお、iOS の場合は、[Safari から UIWebView の HTML を inspect する](/blog//2012/11/inspect_uiwebview_with_safari/)で紹介した方法で簡単に inspect をすることができます（アプリ内の UIWebView を inspect する場合は、Xcode でアプリをビルドしないとできません）。

Android の場合、標準的な方法としては、[Remote Debugging](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)があるのですが、これは携帯端末側のブラウザで開いているページを共有するような感じなので、アプリ内のページを inspect することができない。あと USB での接続が必要。（ちなみに Andorid の 4.2 では開発者用のオプションは設定の About Phone の Build number を 7 回タップしないと表示されないらしい。）

もう一つの方法として、[Adobe Edge Inspect](http://html.adobe.com/jp/edge/inspect/)を使用するという方法があります。Adobe Edge Inspect では weinre を使用して inspect するので、基本的な操作は weinre と同じですが、複数台の端末を同時に扱えるところが便利（無償版だと 1 台のみ）。あと weinre では必要な script を埋め込む作業が必要ない。これもありがたい。なので、普通の Web ページを inspect する場合は Adobe Edge Inspect がおすすめなのですが、Adobe Edge Inspect は PC 側の Chrome で表示したページを携帯端末側に表示させるため、アプリ内の WebView を表示することができない。

それで最初の[第 3 回　 weinre を使った iOS／Android アプリの動作検証：もっと使おう PhoneGap／Cordova 2.0.0 ｜ gihyo.jp ... 技術評論社](http://gihyo.jp/dev/serial/01/phonegap2/0003)に戻るのですが、Android アプリ内の WebView を inspect するには自分で weinre を起動して inspect するしかなさそう。

weinre のインストール方法は下記のような感じ。Node が必要なので Homebrew を使って一緒にインストール。Homebrew のインストールは[RVM / JewelryBox / Homebrew をインストール](/blog//2012/09/rvm_jewelrybox_homebrew/)を参考。

```
brew install node
npm -g install weinre

```

Homebrew でインストールした Node(npm)で weinre をインストールした場合、/usr/local/share/npm/bin/weinre にアプリケーションのエイリアスが作られるのですが、ここはパスが通っていないので、.bash_profile を開いて、PATH の設定を追加（PATH=$PATH:/usr/local/share/npm/bin）。なお、[Node のインストーラー](http://nodejs.org/download/)でインストールした場合は、エイリアスが/usr/local/bin/weinre に作られるのでパスを通さなくても大丈夫。これで新しいターミナルを開いて「weinre」と入力するだけで、weinre が起動できます。

```
weinre

```

weinre は、オプションなしだと[localhost:8080](http://localhost:8080/)で動くので、そこにアクセスすると実際に weinre の画面が確認できます。

しかし localhost で動かすと、あとで埋め込む予定のスクリプトに携帯端末からアクセスできなくなります。ので、Wifi で使用している IP でアドレスを設定します。同じ Wifi で接続すれば、この IP で携帯端末からでもアクセスが可能になります。

Mac の場合、システム環境設定のネットワークの項目で、Wifi に接続済みの場合「状況」の箇所に IP が表示されます（もしくはアプリケーションフォルダのユーティリティから、ネットワークユーティリティを開いて、Wifi のインターフェース情報を確認する）。weinre のオプションについては[weinre - Running](http://people.apache.org/~pmuellr/weinre/docs/latest/Running.html)などを参照。

```
weinre --boundHost 192.168.0.1(WifiでMacに設定されているIP)

```

そして確認する画面の HTML に次のようなスクリプトを埋め込む。PhoneGap(Cordova)の場合は、config.xml に<access origin="192.168.0.1" />を加えて、スクリプトへのアクセスを許可する。そしてビルドしなおして端末にインストールする。

```
<script src="http://192.168.0.1:8080/target/target-script-min.js"></script>

```

これで、Android 携帯でアプリ画面にアクセスすると、先ほどの weinre の画面で携帯からのアクセスがあったことが分かります。そこから「debug client user interface」のリンクをクリックすると、inspect のための画面(/client)が表示されます。

という感じで、若干手間がかかるのですが、Node/weinre のインストール自体は簡単ですし、Android の端末上でしか再現しない問題を inspect なしで解決する方がずっと大変なので、それよりはましかなと。
