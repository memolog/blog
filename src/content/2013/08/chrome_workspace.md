---
title: Chrome の workspace を使う
date: 2013-08-06T14:30:00.000Z
categories:
- web
tags:
- chrome
- css
---
[Chrome DevTools Revolutions 2013 - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/#toc-workspaces)で紹介されていた話で、最近になってChromeにも追加されました。Workspaceを追加して、変更するファイルにマップを設定すると、ChromeのDeveloper tool上で行った変更がマップしたファイルにも反映されるようになります。

<!-- more -->

設定は簡単。ChromeのDeveloper Toolを開いて、Settingsにある「Workspace」をクリックする。Add Folderのボタンで変更を反映させるローカルの置き場所を指定する。  
![](http://farm3.staticflickr.com/2809/9452380734_0d4fba6a6c_o.png)

そのあと、変更するサイトを表示している状態で「Source」タブを選択して、変更するファイルをcontrol+クリックすると「Map to File System Resource」というメニューが表示されるので、それを選択。  
![](http://farm3.staticflickr.com/2807/9449517007_ae0b6ac182_o.png)

これで完了。あとはdeveloper toolでファイルを変更して保存すると、ファイルの変更がローカルのファイルに反映されるようになります。

何が便利かというと、たとえば、CSSの変更では、表示をブラウザで確認して、CSSの編集画面を開いて微調整してリロード、表示を確認して、微調整して保存してリロード... ということを繰り返すことがままありますが、Workspaceを使うと、Chromeで変更して保存すればローカルファイルに反映されるので、行ったり来たりしないで微調整を終了させることができる。リロードしないで表示が反映されるので、リロードが終わるまでの1秒くらいの妙にしんどい時間を回避することができます。ローカルファイルで行った変更がChrome側にリロードなしで反映されるのもうれしい。

というメモ
