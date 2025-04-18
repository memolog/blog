---
title: brew update でエラー
date: 2013-11-20T11:00:00.000Z
categories:
  - web
tags:
  - homebrew
excerpt: "brew updateしたら下記のようなエラーになった。  ```bash error: Your local changes to the following files would be overwritten by merge:"
---

brew update したら下記のようなエラーになった。

```bash
error: Your local changes to the following files would be overwritten by merge:


  Library/Contributions/brew_bash_completion.sh
  Library/Contributions/brew_fish_completion.fish
  Library/Contributions/manpages/brew.1.md
  Library/ENV/4.3/cc
  Library/Formula/ace.rb
  Library/Formula/afflib.rb
  Library/Formula/android-sdk.rb
```

調べてみたら[homebrew の brew update でこけた件 - CubicLouve](http://spring-mt.tumblr.com/post/18484480866/homebrew-brew-update)と同じことで、homebrew で内部的に使用している git に変更がはいっていて、エラーになっている。特に変更した記憶はないけど。[snez commented](https://github.com/mxcl/homebrew/issues/5128#issuecomment-9020785)の内容に従うのがよさそう。

```bash
cd /usr/local
git reset head --hard
git clean -f
brew update
```

わたしは何となく stash でしましたけど。homebrew 関連ファイルの場所は brew --prefix で分かります。

cd \`brew --prefix\`
sudo git stash --include-untracked
sudo brew update
sudo git stash clear

というメモ。
