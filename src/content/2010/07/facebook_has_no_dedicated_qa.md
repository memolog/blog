---
title: Facebookには専任のQAチームがいない
date: 2010-07-26T15:00:00.000Z
categories:
  - software testing
tags:
  - facebook
  - watir
excerpt: "*   Quora - What kind of automated testing does Facebook do?"
---

- [Quora - What kind of automated testing does Facebook do?](http://www.quora.com/What-kind-of-automated-testing-does-Facebook-do)

Facebook のテストエンジニアリグの技術リーダーによると、Facebook に専任の QA チームがいないらしいです ( Facebook has no dedicated QA team )。テストエンジニアはいる。どうやら大量の自動テストをエンジニアが作成/メンテナンスしていて、そのテストを断続的に実行し、テスト結果は通知が届くようにしているみたい。QA チームがやるようなことは自動化しているということか。

そんな話が[Quora - What kind of automated testing does Facebook do?](http://www.quora.com/What-kind-of-automated-testing-does-Facebook-do)に掲載されています。下記にリスト部分のてきとう抄訳で紹介します（すべての内容をきちんと訳しているわけではないので、興味のあるかたはリンクを参照してください）。

- PHP コードに対しては PHPUnit を使って 1500 を超えるクラスのテストスイートを用意している。開発ツールでは自動的にコードカバレッジデータを使用して開発サンドボックスでの目立った変更をカバーするようなテストを実施している。
  また、テスト結果はパッチがレビューにサブミットされたときに自動的にコードレビューツールに入る。
- ブラウザベースのテストでは Watir を使用している。Watir のテストはサイトの機能テストをカバーしている（特にプライバシー関連機能にフォーカスしてる）。
- 全自動の Watir テストに加えて、フォームの入力とか面倒な作業を避けるための半自動の Watir テストもある。ただそれらは正しい動作かどうかの検証は（人が）別途する必要がある
- Javascript の unit testing については JSSpec を使い始めている。
- バックグラウンドのサービスについては、サービスによって種々のテストフレームワークを使用している。オープンソースで提供しているプロジェクトでは Boost や JUnit などのようなオープソースのフレームワークを使用している。外部に公開しないプロジェクトではオープンソースのものや、C++のテストフレームワークを使ったりする。大半のバックエンドサービスは continuous integration / build system と結合していて、最新のソースコードに対して断続的にテストを実施している。テスト結果はデータベースに保存されるのと、通知システムに通知される
- HipHop は countinuous-integration system に若干のひねりをいれたシステムを持っていて、unit test の実行だけじゃなくて PHPUnit のテストも実行してくれる。テスト結果は plain な PHP interpreter で実行した PHP コードの結果と比較して、その振るまいの違いを見つける。

あと、テスト結果の通知の仕方も工夫してたり、バグ管理システムとの連携もしているみたい。ここには書かれていない取り込みもいろいろやっているのでしょう。すごいなあ。

多くのテストが"push blocking"にあたるみたいなので、そんなに細かいテストはしていないように見えなくもない。そのへんの粒度は不明。特定の条件でしか発生しないような問題はどのように対処しているのだろう。ユーザーからのフィードバックをうまく利用したりしているのか、それともそのような問題は無視するのか。いずれにせよ、Facebook 的には十分な粒度であって、うまく機能しているだろうなあ。たぶん。
