---
title: MT：記事の出力ファイル名がハイフンになる
date: 2010-02-01T14:33:07.000Z
categories:
  - web
tags:
  - mt
excerpt: "メモ。例えば記事の出力ファイル名を「test_test」とアンダースコアを入れてに設定しているのに、実際に出力されるファイル名は「test-test」とハイフンになってしまう。  なんでかなあと思っていたら、テンプレートのアーカイブマッピングのパスが「basenameyyyy/mm/entry-basename.php（&#x25;-f）」となっていました。この場合、区切り文字がハイフンに統一される。バージョンアップしたときにここが変更されてしまったみたいです。パスを「&#x25;f」に変更して再構築を実行。"
---

メモ。例えば記事の出力ファイル名を「test_test」とアンダースコアを入れてに設定しているのに、実際に出力されるファイル名は「test-test」とハイフンになってしまう。

なんでかなあと思っていたら、テンプレートのアーカイブマッピングのパスが「basenameyyyy/mm/entry-basename.php（&#x25;-f）」となっていました。この場合、区切り文字がハイフンに統一される。バージョンアップしたときにここが変更されてしまったみたいです。パスを「&#x25;f」に変更して再構築を実行。

いい加減にバージョンアップするとこういう切ないことになりますが、これもバージョンアップの一つの楽しみということで。前向きに。

- [アーカイブマッピングで利用するアーカイブファイル名の定義](http://www.movabletype.jp/documentation/appendices/archive-file-path-specifiers.html)
