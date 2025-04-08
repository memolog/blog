---
title: Create a new icon
featured:
  image: new-icon
date: 2018-08-12 07:28:32
excerpt: "アイコンをsvgで作り直してページの一番上につけた。"
---

アイコンを svg で作り直してページの一番上につけた。

svg にするということでベジェを使って書き直したい、svg フォーマットで書き出したい、しかし専門で使うわけでもないので有料のツールは高くて買う気がおきない... ということで今回は[Inkscape](https://inkscape.org/ja/)を試しに使ってみた。Inkscape を使った理由は特になく、単に最初に見つかったツールだからである。メニューの場所とか何ができるのかわからないところはたくさんあるけど、フォトショップやイラストレーターと似たような感じではあり、何となく用を満たすことはできた。

Inkscape のインストールは[homebrew](https://brew.sh/)でできるみたいなので、homebrew でインストールした。[Inkscape 0.92.2 - Mac-Os-X : Homebrew | Inkscape](https://inkscape.org/ja/release/0.92.2/mac-os-x/homebrew/dl/)
に書いてある

```bash
brew install caskformula/caskformula/inkscape
```

だと、`Downloading https://gitlab.com/inkscape/inkscape/commit/93ccf03162cd2e46d962822d5507865f3451168c.diff`のところで`503 Service Unavailable`となってしまいダウンロードが途中で失敗してしまった。[Update on our planned move from Azure to Google Cloud Platform | GitLab](https://about.gitlab.com/2018/07/19/gcp-move-update/)をパッと見た感じでは（読んでない）、ちょうど Azure から Google Cloud への移行メンテナンスとタイミングが重なってしまったようだ。この記事を書いている時点では 503 にならない様子。

ということで、brew cask を使ってインストールした。

```bash
brew cask install inkscape
```

こちらは`https://inkscape.org/gallery/item/11269/Inkscape-0.92.2-1-x11-10.7-x86_64.dmg`してくるようで、わりとすんなりイントールすることができた。

Inkscape で作成したファイルは svg で保存される（みたい）。保存された svg をそのまま使うこともできるけど、その svg には Inkscape で使う情報も入ってるみたいなので[ImageOptim](https://imageoptim.com/mac)使って最適化したものを Web 上では使っている。png への書き出しをサポートしているので、png ファイルを書き出して、[PWA のチェックリストを満たす | メモログ](/2018/complete-all-the-pwa-checklist.html)でてきとうに用意していたアイコン画像と差し替えた。

というメモ。
