---
title: Convert screen capture to animation GIF
featured:
  image: convert-screen-capture-with-ffmpeg.webp
  author: chatGPT
date: 2020-02-10 06:49:09
excerpt: "Macの場合、Quicktime Playerのファイルメニューの「新規画面収録」から簡単にスクリーンキャプチャを録画することができる（iPhoneの場合はiPhone、iPad、iPod touch で画面を録画する方法参照）。再現性が難しいケースなどで複雑な手順を書き記すよりずっとわかりやすく動作を見せることができるのでとても便利。だけれども、動画はmov形式で保存されるので、githubのissueに貼り付ける事ができない。なので、ffmpegを使ってgifに変換しようという話。gifならgithubのissueに貼り付けられる。"
---

Mac の場合、[Quicktime Player](https://support.apple.com/ja-jp/HT201066#record)のファイルメニューの「新規画面収録」から簡単にスクリーンキャプチャを録画することができる（iPhone の場合は[iPhone、iPad、iPod touch で画面を録画する方法](https://support.apple.com/ja-jp/HT207935)参照）。再現性が難しいケースなどで複雑な手順を書き記すよりずっとわかりやすく動作を見せることができるのでとても便利。だけれども、動画は mov 形式で保存されるので、github の issue に貼り付ける事ができない。なので、[ffmpeg](https://www.ffmpeg.org/)を使って gif に変換しようという話。gif なら github の issue に貼り付けられる。

ffmpeg のインストールは[Homebrew](https://brew.sh/)にて行う。

```bash
brew install ffmpeg
```

ffmpeg をインストールしたら、以下のようなコマンドを実行

```bash
ffmpeg -i foo.mov -r 24 foo.gif
```

`-r`のオプションは[フレームレート](https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E3%83%AC%E3%83%BC%E3%83%88)の設定で fps で指定する。このオプションはなくても良いけど、24 くらいなら品質を損わずにファイルサイズを減らすことができる。場合によってはもっと減らしても大丈夫と思う。

というメモ。
