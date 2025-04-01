---
title: AppIcon40x40とAppIcon60x60がないというエラー
date: 2013-12-29T06:20:00.000Z
categories:
- web
tags:
- ios
- phonegap
- xcode
---
Cordovaで作成したアプリでアイコンをasset catalogsに変換したら、iTunes Connectで申請したときに下記のようなエラーが発生しました。

```none
Icon specified in the Info.plist not found under the top level app wrapper: AppIcon40x40

<!-- more -->
Icon specified in the Info.plist not found under the top level app wrapper: AppIcon60x60
```

エラーの内容を理解するのに時間がかかりましたが、どうやらビルドしたipaファイルのtop levelにAppIcon40x40とAppIcon60x60がないということらしい。

なので、ipaファイルの展開して中身を確認してみる。

```bash
mv Foobar.ipa Foobar.zip
unzip Foobar.zip
cd Payload/Foobar.app/
ls -al
```

![](http://farm4.staticflickr.com/3672/11617781174_39076cd6d0_o.png)  
  
たしかに存在しない。AppIcon40x40@2x.pngはあるけど、AppIcon40x40はない...

そして、asset catalogsでアサインしたアイコン（AppIcon）は、ビルドしたipaファイルのInfo.plistの「CFBundleIconFiles」に「AppIcon40x40」のように値が追加される。ゆえに、上述のエラーが返ってくると。  
  
![](http://farm4.staticflickr.com/3785/11617666323_3b51b040c6_o.png)

しかし、AppIcon40x40を追加したくても、asset catalogsではRetina用の2xのアイコンしかアサインできない。AppIcon60x60も同じ。asset catalogsにアサインされていないアイコンは、ビルドしたipaファイルには入ってこないので、どうしようもない。  
  
![](http://farm8.staticflickr.com/7430/11617188865_194437a006_o.png)

うーん。Deployment Targetも7.0にしているし、AppIcon40x40.pngの出番はないはずなのだけど、何か見落としているのか...

asset catalogsを使ってAppIcon40x40.pngというファイル名でリソースを追加する方法が見つからなかったので、AppIcon40x40.pngファイルを作成して、プロジェクトのResourcesに追加して回避することに...  
  
![](http://farm3.staticflickr.com/2853/11617806263_e5889c6804_o.png)

Cordovaで作成したプロジェクトでasset catalogsに変換した場合は、Resourcesの下に「icons」フォルダ（変換前に使用していたアイコンファイル）が残っているので、icon-40.pngをAppIcon40x40.pngに変更しても回避できます。  
  
![](http://farm3.staticflickr.com/2850/11617536285_6d2747ce11_o.png)

うーん。

まあとにかく、これでビルドしたipaファイル（appファイル）にAppIcon40x40.pngが含まれるようになったので、問題を回避することができました。良い方法とは思えないけど。同様の手順でAppIcon60x60の問題も回避できます。

というメモ。
