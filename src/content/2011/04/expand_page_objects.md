---
title: Site-Page-Data Object Pattern (Page Objects 拡張)
date: 2011-04-20T14:43:00.000Z
categories:
  - software testing
tags:
  - page-objects
excerpt: "以前にPage Objects : テストスイート構築のためのデザインパターン - メモログというのを紹介しました。今回はそのパターンをちょっと拡張してみようという話。なお、特に参考にした訳ではないのですが、Selenium Page Objects + Site Objects, Data Objects & High Level Navigation « Fiji Ecuador Seattle Greece Montanaに同じような話を提示している人はいます（2年前に）。"
---

以前に[Page Objects : テストスイート構築のためのデザインパターン - メモログ](/2010/11/page_objects/)というのを紹介しました。今回はそのパターンをちょっと拡張してみようという話。なお、特に参考にした訳ではないのですが、[Selenium Page Objects + Site Objects, Data Objects & High Level Navigation « Fiji Ecuador Seattle Greece Montana](http://fijiaaron.wordpress.com/2009/09/02/selenium-page-objects-site-objects-data-objects-high-level-navigation/)に同じような話を提示している人はいます（2 年前に）。

Page Objects は、自動化テストのスクリプトをまとめるための一つのパターン。ページを一つのオブジェクトとして捉えて、そのページのアクション（サービス）を一つの「区切り」にしてスクリプトをまとめます。他のページに移動する場合は、移動するページのオブジェクトを返り値として渡す（そうすることで複数ページのアクションを続けていくことができる）。

ただ、テスト手順として、連続性のない複数のページのアクションを実行する場合、Page Objects のパターンでは悩ましいところがあります。たとえば、ブログの設定ページで設定をしたあとに、記事作成ページで記事を作成して、その記事がブログに期待通りに生成されているかを確認する、とか。それぞれのページは独立していて、アクション間の連携はない場合、Page Object を渡すわけにはいかない。リンクをクリックしてページを遷移していくことで連携させることもできるけれど、効率性から考えるとやはり直接該当のページにアクセスしたい（リンクをたどった方がより人間的と言えるかもしれないけど）。とか。

Page Objects の上位のオブジェクトして「Site Object」を設けて、そこから操作するとそうした悩みがなくなります。たとえば[zenback](http://zenback.jp)なら、「Dashboard」とか「Customize」とかの Page Objects の他に「zenback」という Site Object を設ける。zenback という Site Object から、Dashboard や Customize などの Page Objects を操作したり、ページ間の移動を行うことで Dashboard と Customize のページがアクション（サービス）で連携がない場合でも連続的に操作を行うことができる。

イメージとしてはこんな感じ。

```
(lib/zenback)
require 'watir-webdriver'

module Zenback
class Zenback
  def initialize
    @b = Webdriver::Browser.new
  end
  def dashboard
    Dashboard.new @b
  end
  def customize
    Customize.new @b
  end
end

class Dashboard
  def initialize(b)
    @b = b
  end
  def add(blog)
     @b.link(:href,/add_blog/).click
     # scripts for adding blog action (service)
  end
end
....
end

```

```
require 'lib/zenback'
z = Zenback::Zenback.new
z.goto 'http://zenback.jp/dashboard'
z.dashboard.add 'http://memolog.org'
z.goto 'http://zenback.jp/dashboard/blog/123456789/'
z.customize.set_modules

```

実際のスクリプトはページごとにスクリプトファイル変えたりとか、単純に goto メソッドで画面遷移しないとかいろいろあったりしますが、基本的なイメージとしてはこんな感じです。「zenback」という Site Object を呼び出して、Site Object から Page Objects を操作していく。Page Objects のパターンではアクション実行後に Page Object を返すのが基本ですが、Site Object があると Page Objects の選択は Site Object 上で自分で選択できるので Page Object の返りはあってもなくてもいい。あと zenback の Site Object で起動した watir-webdriver のオブジェクトを Page Objects の引数として渡すことで Page Objects 個々の独立性を保ちつつ、サイト全体で watir-webdriver のオブジェクトを使えるようにしています。

そして、Page Object の下位のオブジェクトとして「Data Objects」も（必要に応じて）設けます。たとえば記事の一覧のページなど、ページには表示するデータがあって、それをひとつのオブジェクトとして捉えて、データの各要素（id とか title とか）を取り出しやすい形にしておく。イメージとしてはこんな感じ（こちらもかなり省略しています）。

```
module Zenback
class Dashboard
  class Blog
    attr_accessor :id, :name
    def initialize(tr)
       @id = tr.th.link.href.slice(/[0-9]+/)
       @name = tr.tr.link.text
    end
  end
  def blog(tr)
    Blog.new tr
  end
end
end

```

zenback で言うと、ダッシュボードに表示されるブログ一覧の一つのブログを「Data Object」として捉えて、id や名前を取り出しやすい形にしておく。これで blog.id とかでブログの id を取り出すことできます。Blog の class に「tr」を渡していますが、これはこの一覧が table で組まれていて、tr ごとにブログのデータが記載されるためです。

このへん、私自身としてはまだ試行錯誤中といったところではありますが、今のところテストスクリプトを構築する上でのモデルになっています。
