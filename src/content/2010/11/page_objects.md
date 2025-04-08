---
title: Page Objects ：テストスイート構築のためのデザインパターン
date: 2010-11-20T10:12:10.000Z
categories:
  - software testing
tags:
  - page-objects
  - watir
excerpt: "Page objects - watir-webdriver - GitHub"
---

[Page objects - watir-webdriver - GitHub](https://github.com/jarib/watir-webdriver/wiki/Page-Objects)

> Page Objects is a design pattern to model the application under test as objects in your code. Page Objects eliminate duplication by building an abstraction that allows you to write browsers tests for maximum maintainability and robustness.

ウェブアプリケーションなどの自動テストを作成する場合に、どのようにテスト(スイート)を構成していくかは結構悩みどころであります。ブラウザの HTML(DOM)の操作を時系列に並べていくだけだと、似たような処理が重複してしまってメンテナンスできるものではなくなってしまう。だからある程度メソッドにまとめてメソッド経由で実行したい。しかし、どのようにメソッドをまとめていこう..とかいろいろ。

Page Objects はそうした自動テストスイートを構築する上でのガイドライン（デザインパターン）を提示しています。詳しくは[Page objects - watir-webdriver - GitHub](https://github.com/jarib/watir-webdriver/wiki/Page-Objects)と[PageObjects - selenium -](http://code.google.com/p/selenium/wiki/PageObjects) など。

基本的なコンセプトとしては、作成するコードの重複を避けるということ。一つの HTML の操作は一つの場所でのみ行う（重複させない）。そしてページを一つの「オブジェクト」としてとらえてカプセル化して、一つのページの操作はそこで完結させる。ページオブジェクトでメソッドを実行した後は、（別の）ページオブジェクトを渡す。

たとえば、ログイン実行後にダッシュボードの画面にいく場合は、ログインページのオブジェクトを作成してログインのメソッドを実行、ログインページのオブジェクトはメソッド実行後にダッシュボードのオブジェクトを返す。そうすることで、渡されたダッシュボードのページオブジェクトでログインした後のダッシュボードの画面でのアクションを実行することができる、みたいな。今のオブジェクトが持つ機能の実行をしたあと、実行後のアプリケーションの状態にあわせたオブジェクトを渡すことで、一つのページオブジェクトでそのページを簡潔にまとめつつ、テストはシームレスにつなげていくことができる、みたいな。

そのほかオブジェクトのメソッドは HTML(DOM)を操作するというイメージではなく、実行する機能（サービス）を表現することとか、ページオブジェクトの中ではテストのアサーションは作成しないとか、同じ機能に対するアクションでも別の結果がでる場合は別のメソッドとしてまとめるとか、そうした PageObjects のデザインパターンを使った自動テストスイートを構築するためのコツが書かれております。
