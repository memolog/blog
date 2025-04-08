---
title: Bitcodeを使ったアプリがCrashlyticsでmissing dSYMsになる
date: 2016-02-03T21:37:00.000Z
categories:
  - web
tags:
  - ios
  - xcode
excerpt: "Xcodeでpublishした内部テスター向けのビルドで、Crashlyticsへクラッシュレポートが届かない。「missing dSYM」というエラーが出てるので、dSYMの問題だろうというところまでわかるけど、CrashlyticsのDocumentなどを読んでもわからない。Crashlyticsのmissing dSYMの画面に出てるUUIDを検索しても見つからない..."
---

Xcode で publish した内部テスター向けのビルドで、[Crashlytics](https://fabric.io/kits/ios/crashlytics)へクラッシュレポートが届かない。「missing dSYM」というエラーが出てるので、dSYM の問題だろうというところまでわかるけど、[Crashlytics の Document](https://docs.fabric.io/ios/crashlytics/index.html)などを読んでもわからない。Crashlytics の missing dSYM の画面に出てる UUID を検索しても見つからない...

それで、わりとさんざん悩んだ末に[Any alternative to manually uploading dSYMs for bitcode enabled apps? - Crashlytics - Twitter Developers](https://twittercommunity.com/t/any-alternative-to-manually-uploading-dsyms-for-bitcode-enabled-apps/60064)に書いてある現象なのがわかった。

> Awesome question and we're actively looking at ways to simplify this process, however there's a few difficulties. When using Bitcode, which isn't required for iOS apps, Apple is recompiling your app on their servers and can do this whenever they want to, with any changes, which would result in a new dSYM that is generated. There is also no way to know currently when Apple has done this.
>
> Also, as mentioned in the link you provided, the only way to get these dSYMs currently is via Xcode. We are looking into workarounds, but these are a few of the restrictions we're trying to get around.
>
> In the meantime, if this is causing you pain or difficulty, I'd recommend disabling Bitcode for your app.

つまり、Bitcode を有効にした状態でビルドをパブリッシュすると、Apple 側で recompile するときに新しい UUID/dSYM が生成されるのでそれを Crashlytics にアップロードしないといけないと。

なので、[iTunes Connect](https://itunesconnect.apple.com/)の TestFlight -> iOS(TestFlight iOS ビルド)からビルドを選択して「dSYM をダウンロード」して、下記のような手順で解凍して検索したら、missing な UUID を発見することができました。それを Crashlytics の missing dSYM の画面でアップロードしたら問題解消できました。

```bash
cd ~/Downloads
unzip dSYMs -d _dSYMs
cd _dSYMs
ls -q | grep -v META-INF | xargs dwarfdump -u
```

今のところ新しいビルドをパブリッシュしたら、毎回手動で dSYM をアップロードしないといけないみたい。Apple が recompile したアプリの dSYM は iTunes Connect で処理完了するまでは取得する手段もなさそう。これはなかなかに面倒くさい。

とはいえ、recompile しても CocoaPods でインストールしてるモジュールの UUID は変わらない（更新しなければ）みたいだし、毎回アップロードしないといけない dSYM は自分のアプリの armv7 版と arm64 版の 2 つだけっぽいので、いまのところこういうものとわりきって作業することにした。

というメモ。たぶんそのうちもっと良い感じになる、はず。

そのほか参考：

- [App Thinning メモ - Qiita](http://qiita.com/usagimaru/items/cb19f283db4ac0cd8bd6#bitcode)
- [How to solve symbolication problems / Client Integration (iOS & Mac OS X) / Knowledge Base - HockeyApp Support](http://support.hockeyapp.net/kb/client-integration-ios-mac-os-x/how-to-solve-symbolication-problems)
