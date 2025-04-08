---
title: Sublime Text 2 で Zen Coding (Emmet)
date: 2012-05-25T16:52:13.000Z
categories:
  - web
tags:
  - "sublime text 2"
excerpt: "（追記 2013/1/30）Packageの名前がZen Codingから「Emmet」に変わっていました。ので、Packageの名前をEmmetに差し替えました。あわせて最後に書いていたスニペットの変更方法もちゃんとした（？）方法に書き換えました。"
---

（追記 2013/1/30）Package の名前が Zen Coding から「[Emmet](https://github.com/sergeche/emmet-sublime)」に変わっていました。ので、Package の名前を Emmet に差し替えました。あわせて最後に書いていたスニペットの変更方法もちゃんとした（？）方法に書き換えました。

[Can’t Get Into Preprocessors? Try Zen Coding | Design Shack](http://designshack.net/articles/css/cant-get-into-preprocessors-try-zen-coding/)で Sublime Text 2 で Zen Coding のインストール方法が紹介されていたので、試してみました。

まず Sublime Package Control をインストール。起動して Sublime のコンソールを開く（View->Show Console）。コンソール上で、[Installation - Sublime Package Control - a Sublime Text 2 Package Manager by wbond](http://wbond.net/sublime_packages/package_control/installation)に書かれているインストール用のコマンドを実行する。

> import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','&#x25;20')).read()); print 'Please restart Sublime Text to finish installation'

コンソールに「'Please restart Sublime Text to finish installation'」と出力されるので、Sublime を再起動する。再起動後は Package Contorl が使用可能になっている。

再起動後、コマンドパレットを開く（Tools->Command Palette)。コマンドパレット上で「install」とか入力すると、候補に「Package Control: Install Package」が出てくるので、それを選択。

その後、コマンドパレットに「Emmet」と入力すると Emmet という名のパッケージが見つかるので、選択してインストールを実行。少しするとインストールが完了する。

完了したら、新規でファイルを開いて、シンタックスのモードを「HTML」にして、「html:5」と入力して、TAB のキーを押すと、HTML5 的なひな形がファイルに挿入される。簡単。

ただ、標準の Emmet のパッケージでは、下記のように lang の設定として「en-US」が入ってくる。

```
<!DOCTYPE HTML>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

</body>
</html>

```

これを変更するには、ユーザーの設定で上書きする。Sublime Text 2 のメニューから「Preferences」を選んで、「Package Settings -> Emmet -> Settings - User」を選択する。Sublime text 上にオープンされた「Emmet.sublime-settings - User」というファイルに下記のような設定を追加する。

```
{
  "snippets": {
    "html": {
        "snippets": {
          "html:5": "<!doctype html>\n<html>\n<head>\n\t<meta charset=\"${charset}\">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t${child}${2}\n</body>\n</html>"
        }
      }
  }
}

```

SASS のような Preprocessor と Emmet とどちらの方が良いかは使う人（使う目的）次第だとは思いますけど、そこそこ便利な感（まだよく分かってないけど）。SubLime は標準の入力補完も充実している感があるので、Emmet をインストールしなくても便利な感はあるけれども。
