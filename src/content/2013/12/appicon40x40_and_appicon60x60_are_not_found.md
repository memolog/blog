---
title: AppIcon40x40とAppIcon60x60がないというエラー
date: 2013-12-29T06:20:00.000Z
categories:
  - web
tags:
  - ios
  - phonegap
  - xcode
excerpt: "Cordovaで作成したアプリでアイコンをasset catalogsに変換したら、iTunes Connectで申請したときに下記のようなエラーが発生しました。  ```none Icon specified in the Info.plist not found under the top level app wrapper: AppIcon40x40"
---

Cordova で作成したアプリでアイコンを asset catalogs に変換したら、iTunes Connect で申請したときに下記のようなエラーが発生しました。

```
Icon specified in the Info.plist not found under the top level app wrapper: AppIcon40x40


Icon specified in the Info.plist not found under the top level app wrapper: AppIcon60x60
```

エラーの内容を理解するのに時間がかかりましたが、どうやらビルドした ipa ファイルの top level に AppIcon40x40 と AppIcon60x60 がないということらしい。

なので、ipa ファイルの展開して中身を確認してみる。

```bash
mv Foobar.ipa Foobar.zip
unzip Foobar.zip
cd Payload/Foobar.app/
ls -al
```

![](http://farm4.staticflickr.com/3672/11617781174_39076cd6d0_o.png)

たしかに存在しない。AppIcon40x40@2x.pngはあるけど、AppIcon40x40 はない...

そして、asset catalogs でアサインしたアイコン（AppIcon）は、ビルドした ipa ファイルの Info.plist の「CFBundleIconFiles」に「AppIcon40x40」のように値が追加される。ゆえに、上述のエラーが返ってくると。

![](http://farm4.staticflickr.com/3785/11617666323_3b51b040c6_o.png)

しかし、AppIcon40x40 を追加したくても、asset catalogs では Retina 用の 2x のアイコンしかアサインできない。AppIcon60x60 も同じ。asset catalogs にアサインされていないアイコンは、ビルドした ipa ファイルには入ってこないので、どうしようもない。

![](http://farm8.staticflickr.com/7430/11617188865_194437a006_o.png)

うーん。Deployment Target も 7.0 にしているし、AppIcon40x40.png の出番はないはずなのだけど、何か見落としているのか...

asset catalogs を使って AppIcon40x40.png というファイル名でリソースを追加する方法が見つからなかったので、AppIcon40x40.png ファイルを作成して、プロジェクトの Resources に追加して回避することに...

![](http://farm3.staticflickr.com/2853/11617806263_e5889c6804_o.png)

Cordova で作成したプロジェクトで asset catalogs に変換した場合は、Resources の下に「icons」フォルダ（変換前に使用していたアイコンファイル）が残っているので、icon-40.png を AppIcon40x40.png に変更しても回避できます。

![](http://farm3.staticflickr.com/2850/11617536285_6d2747ce11_o.png)

うーん。

まあとにかく、これでビルドした ipa ファイル（app ファイル）に AppIcon40x40.png が含まれるようになったので、問題を回避することができました。良い方法とは思えないけど。同様の手順で AppIcon60x60 の問題も回避できます。

というメモ。
