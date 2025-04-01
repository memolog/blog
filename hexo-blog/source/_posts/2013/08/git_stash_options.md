---
title: git stash の便利なオプション
date: 2013-08-05T13:00:00.000Z
categories:
- web
tags:
- git
---
git stash は、コミットしていない変更されたファイルを一時的にstashとして保存して、変更がない状態に戻すことができます。仕掛かり中の作業の間に別の緊急の作業が入ってしまったりとか、変更前の状態から違う方法で修正をやり直してみたい場合とか、とりあえず現状を保存しておいて戻すことができるので、大変便利。

<!-- more -->

最近[Code School](http://www.codeschool.com)のサイトでちょこちょこ学習してみてるのですが（有料でやってるのもあり比較的まじめに）、[Git Real 2](http://www.codeschool.com/courses/git-real-2)のコースで知ったgit stashのオプションがわりと便利だなと思った次第。

ひとつは、 --keep-index のオプションで、git add で追加したファイルはstashに入れずに現状維持するオプション。オプションなしの場合は、git addしているファイルもgit stashするとstackに保存される。

> If the --keep-index option is used, all changes already added to the index are left intact.

ひとつは、 --include-untracked のオプションで、現在のリポジトリに存在しない untrackedの状態のファイルもstashに保存してくれる。オプションなしの場合は、untrackedなファイルは現状維持となる。

> If the --include-untracked option is used, all untracked files are also stashed and then cleaned up with git clean, leaving the working directory in a very clean state. If the --all option is used instead then the ignored files are stashed and cleaned in addition to the untracked files.

たいていの場合、git stashとgit popだけで事足りますが、たとえば問題を修正した後にデバッグ目的で入れた処理とかの変更を一時的になしの状態にして動作確認をしたいとか、何らかのファイルをタスクか何かで出力するときにuntrackedなファイルが影響するのをなくしたいときなど、そういうときに地味に便利。

というメモ
