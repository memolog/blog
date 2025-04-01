---
title: watir 1.6.6 リリース
date: 2010-10-15T15:45:00.000Z
categories:
- software testing
tags:
- watir
---
2週間近く前ですが、watirの1.6.6がリリースされましたね。変更点は[Watir 1.6.6 final released](http://watir.com/2010/10/04/watir-1-6-6-final-released/)に書かれている通りで、個人的には確実に使用するclick\_no\_waitのメソッドが修正されているのが大きいなあと思います。以前に「[watir: click\_no\_wait が動作しない - メモログ](/blog//2010/07/watir_click_no_wait_doesnt_work/)」で行った修正で動作することにはするのですが、処理に妙に時間がかかってしまってました。1.6.6ではそういう副作用もなく解消されているようです。

<!-- more -->

その他いくつか魅力的な実装が追加されています。一つは#elementと#elementsのメソッド。詳しくは[implement IE#element and IE#elements](http://jira.openqa.org/browse/WTR-103)に書いてある通りなのですが、ie.link(:id, "id").click とリンクタグを特定する代わりに、ie.element(:id, 'id').click とタグを特定しなくてもできるようになりました。

あと、ie.link(:id,'id').styleみたいな指定で、インラインのCSS以外の情報も取得できるようになったようです。watir上でCSSファイルに書かれているスタイル情報を取得するのは難しそうなので、必要としている人にはありがたい機能と思われます。私はこのメソッドを使用したことありませんが。

そのほかtable(:id,'id').row(:index,1).to_a みたいな形で、特定したtableの行のテキストを配列で返してくれるようなったみたいです。いつ使用するんだろうと思わなくもありませんが。

まあ、とにかく。1.6.5から1.6.6にアップデートしてみましたが、特に問題なく動作しているみたいです。うむうむ。すばらしい。ちなみにrubyのバージョンは1.8.6です。

留意点としては、watirを1.6.6にアップデートするとactionsupportも2.3.9にアップデートされることでしょうか。actionsupportはactionpackとactionmailerの2.3.9が必要のようで、それらをインストールしている場合は一緒にアップデートする必要があります。そして、これらの2.3.9では[actionmailer 2.3.9 should now require 'uri'](https://rails.lighthouseapp.com/projects/8994-ruby-on-rails/tickets/5555-actionmailer-239-should-now-require-uri#ticket-5555-11)というエラーが発生するようですが、このURLのdiffを適用すれば問題解消します。actionpackもactionmailerも3.0.0が最新のようですが、rubyのバージョンが1.8.7である必要があるみたいです。
