---
title: Bitcodeを使ったアプリがCrashlyticsでmissing dSYMsになる
date: 2016-02-03T21:37:00.000Z
categories:
- web
tags:
- ios
- xcode
---
Xcodeでpublishした内部テスター向けのビルドで、[Crashlytics](https://fabric.io/kits/ios/crashlytics)へクラッシュレポートが届かない。「missing dSYM」というエラーが出てるので、dSYMの問題だろうというところまでわかるけど、[CrashlyticsのDocument](https://docs.fabric.io/ios/crashlytics/index.html)などを読んでもわからない。Crashlyticsのmissing dSYMの画面に出てるUUIDを検索しても見つからない...

<!-- more -->

それで、わりとさんざん悩んだ末に[Any alternative to manually uploading dSYMs for bitcode enabled apps? - Crashlytics - Twitter Developers](https://twittercommunity.com/t/any-alternative-to-manually-uploading-dsyms-for-bitcode-enabled-apps/60064)に書いてある現象なのがわかった。

> Awesome question and we're actively looking at ways to simplify this process, however there's a few difficulties. When using Bitcode, which isn't required for iOS apps, Apple is recompiling your app on their servers and can do this whenever they want to, with any changes, which would result in a new dSYM that is generated. There is also no way to know currently when Apple has done this.
> 
> Also, as mentioned in the link you provided, the only way to get these dSYMs currently is via Xcode. We are looking into workarounds, but these are a few of the restrictions we're trying to get around.
> 
> In the meantime, if this is causing you pain or difficulty, I'd recommend disabling Bitcode for your app.

つまり、Bitcodeを有効にした状態でビルドをパブリッシュすると、Apple側でrecompileするときに新しいUUID/dSYMが生成されるのでそれをCrashlyticsにアップロードしないといけないと。

なので、[iTunes Connect](https://itunesconnect.apple.com/)のTestFlight -> iOS(TestFlight iOS ビルド)からビルドを選択して「dSYM をダウンロード」して、下記のような手順で解凍して検索したら、missingなUUIDを発見することができました。それをCrashlyticsのmissing dSYMの画面でアップロードしたら問題解消できました。

```bash
cd ~/Downloads
unzip dSYMs -d _dSYMs
cd _dSYMs
ls -q | grep -v META-INF | xargs dwarfdump -u
```

今のところ新しいビルドをパブリッシュしたら、毎回手動でdSYMをアップロードしないといけないみたい。AppleがrecompileしたアプリのdSYMはiTunes Connectで処理完了するまでは取得する手段もなさそう。これはなかなかに面倒くさい。

とはいえ、recompileしてもCocoaPodsでインストールしてるモジュールのUUIDは変わらない（更新しなければ）みたいだし、毎回アップロードしないといけないdSYMは自分のアプリのarmv7版とarm64版の2つだけっぽいので、いまのところこういうものとわりきって作業することにした。

というメモ。たぶんそのうちもっと良い感じになる、はず。

そのほか参考：

*   [App Thinning メモ - Qiita](http://qiita.com/usagimaru/items/cb19f283db4ac0cd8bd6#bitcode)
*   [How to solve symbolication problems / Client Integration (iOS & Mac OS X) / Knowledge Base - HockeyApp Support](http://support.hockeyapp.net/kb/client-integration-ios-mac-os-x/how-to-solve-symbolication-problems)
