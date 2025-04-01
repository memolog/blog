---
title: weinreでAndroidのWebViewをInspectする
date: 2013-02-02T13:52:00.000Z
categories:
- web
tags:
- android
- node
- phonegap
---
AndroidのWebViewをinspectするという話。調べてたら[第3回　weinreを使ったiOS／Androidアプリの動作検証：もっと使おうPhoneGap／Cordova 2.0.0｜gihyo.jp ... 技術評論社](http://gihyo.jp/dev/serial/01/phonegap2/0003)にすでに詳細に書いてあったのでそちらも参考に。[Remote Debugging Firefox OS with Weinre ✩Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2013/01/remote-debugging-firefox-os-with-weinre/)の話だと、Firefox OSでも同じようにinspectができるみたい。

<!-- more -->

なお、iOSの場合は、[SafariからUIWebViewのHTMLをinspectする](/blog//2012/11/inspect_uiwebview_with_safari/)で紹介した方法で簡単にinspectをすることができます（アプリ内のUIWebViewをinspectする場合は、Xcodeでアプリをビルドしないとできません）。

Androidの場合、標準的な方法としては、[Remote Debugging](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)があるのですが、これは携帯端末側のブラウザで開いているページを共有するような感じなので、アプリ内のページをinspectすることができない。あとUSBでの接続が必要。（ちなみにAndoridの4.2では開発者用のオプションは設定のAbout PhoneのBuild numberを7回タップしないと表示されないらしい。）

もう一つの方法として、[Adobe Edge Inspect](http://html.adobe.com/jp/edge/inspect/)を使用するという方法があります。Adobe Edge Inspectではweinreを使用してinspectするので、基本的な操作はweinreと同じですが、複数台の端末を同時に扱えるところが便利（無償版だと1台のみ）。あとweinreでは必要なscriptを埋め込む作業が必要ない。これもありがたい。なので、普通のWebページをinspectする場合はAdobe Edge Inspectがおすすめなのですが、Adobe Edge InspectはPC側のChromeで表示したページを携帯端末側に表示させるため、アプリ内のWebViewを表示することができない。

それで最初の[第3回　weinreを使ったiOS／Androidアプリの動作検証：もっと使おうPhoneGap／Cordova 2.0.0｜gihyo.jp ... 技術評論社](http://gihyo.jp/dev/serial/01/phonegap2/0003)に戻るのですが、Androidアプリ内のWebViewをinspectするには自分でweinreを起動してinspectするしかなさそう。

weinreのインストール方法は下記のような感じ。Nodeが必要なのでHomebrewを使って一緒にインストール。Homebrewのインストールは[RVM / JewelryBox / Homebrew をインストール](/blog//2012/09/rvm_jewelrybox_homebrew/)を参考。

```
brew install node
npm -g install weinre

```

HomebrewでインストールしたNode(npm)でweinreをインストールした場合、/usr/local/share/npm/bin/weinre にアプリケーションのエイリアスが作られるのですが、ここはパスが通っていないので、.bash_profileを開いて、PATHの設定を追加（PATH=$PATH:/usr/local/share/npm/bin）。なお、[Nodeのインストーラー](http://nodejs.org/download/)でインストールした場合は、エイリアスが/usr/local/bin/weinreに作られるのでパスを通さなくても大丈夫。これで新しいターミナルを開いて「weinre」と入力するだけで、weinreが起動できます。

```
weinre

```

weinreは、オプションなしだと[localhost:8080](http://localhost:8080/)で動くので、そこにアクセスすると実際にweinreの画面が確認できます。

しかしlocalhostで動かすと、あとで埋め込む予定のスクリプトに携帯端末からアクセスできなくなります。ので、Wifiで使用しているIPでアドレスを設定します。同じWifiで接続すれば、このIPで携帯端末からでもアクセスが可能になります。

Macの場合、システム環境設定のネットワークの項目で、Wifiに接続済みの場合「状況」の箇所にIPが表示されます（もしくはアプリケーションフォルダのユーティリティから、ネットワークユーティリティを開いて、Wifiのインターフェース情報を確認する）。weinreのオプションについては[weinre - Running](http://people.apache.org/~pmuellr/weinre/docs/latest/Running.html)などを参照。

```
weinre --boundHost 192.168.0.1(WifiでMacに設定されているIP)

```

そして確認する画面のHTMLに次のようなスクリプトを埋め込む。PhoneGap(Cordova)の場合は、config.xmlに<access origin="192.168.0.1" />を加えて、スクリプトへのアクセスを許可する。そしてビルドしなおして端末にインストールする。

```
<script src="http://192.168.0.1:8080/target/target-script-min.js"></script>

```

これで、Android携帯でアプリ画面にアクセスすると、先ほどのweinreの画面で携帯からのアクセスがあったことが分かります。そこから「debug client user interface」のリンクをクリックすると、inspectのための画面(/client)が表示されます。

という感じで、若干手間がかかるのですが、Node/weinreのインストール自体は簡単ですし、Androidの端末上でしか再現しない問題をinspectなしで解決する方がずっと大変なので、それよりはましかなと。
