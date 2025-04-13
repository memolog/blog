---
title: Sass / Compass をインストール
date: 2012-09-09T13:17:00.000Z
categories:
  - web
tags:
  - ruby
  - sass
excerpt: "前回（RVM / JewelryBox / Homebrew をインストール - メモログ）でインストールした1.9.3に、SassとCompassをインストールするの巻。SassはCSSの記述をサポートしてくれるプリプロセッサー。CompassはSassのお役立ちMixinをたくさん用意しているCSS authoring framework。"
---

前回（[RVM / JewelryBox / Homebrew をインストール - メモログ](/2012/09/rvm_jewelrybox_homebrew/)）でインストールした 1.9.3 に、Sass と Compass をインストールするの巻。[Sass](http://sass-lang.com/)は CSS の記述をサポートしてくれるプリプロセッサー。[Compass](http://compass-style.org/)は Sass のお役立ち Mixin をたくさん用意している CSS authoring framework。

### Sass / Compass のインストール

ターミナルで下記を実行。

```
gem install sass
gem install compass

```

### Sass の使い方

コマンドライン上で下記のコマンドを実行。

```
sass --watch foobar.scss:foobar.css

```

これで foobar.scss を編集保存すると、foobar.css に CSS が生成される。

さらなる使い方は[Tutorial](http://sass-lang.com/tutorial.html)（[日本語が便利](http://hail2u.net/documents/sass-tutorial.html)）を読むと一通り分かる。

### Compass の使い方

Compass では最初にプロジェクトを作成して、作成したプロジェクトで watch する。

```
compass create foobar
cd foobar
watch

```

sass で--compass オプションを使って使用することもできる。

```
sass --watch foobar.scss:foobar.css --compass

```

たとえば Compass を使って linear-gradient を作成する場合は下記のように、必要な partial を import して、[compass の書式](http://compass-style.org/reference/compass/css3/images/)にあわせて記述する。

```
@import "compass/css3/images";

#foobar{
  @include background(linear-gradient(45deg, #333 30&#x25;, #0c0));
}

```

下記のような CSS になる（-ms-は入らないのか）。

```
#foobar {
  background: -webkit-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: -moz-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: -o-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: linear-gradient(45deg, #333333 30&#x25;, #00cc00);
}

```

さらなる使い方は[Compass Help | Compass Documentation](http://compass-style.org/help/)を参照。日本語のドキュメントとしては、[Sass 入門](https://gihyo.jp/dp/ebook/2012/978-4-7741-5123-6)にチュートリアル的なのがある。[Compass を触ってみて、CSS3 のモジュールを眺めてみる。｜ linker journal ｜ linker](http://linker.in/journal/2011/07/compasscss3.php)も参考に。

### 自分で mixin を書く

compass は便利だけど、都合にあわせて自分で mixin 用意するなりした方が良い場合もあるかもしれない。たとえば vendor prefix をつけたいだけなら[@each](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#each-directive)を使うのでもいい。

```
#foobar{
  @each $vendor in -webkit-,-moz-,-ms-,-o-,null {
    background: #{$vendor}linear-gradient(45deg,#333 30&#x25;, #0c0);
  }
}

```

@each の最後の null は、non prefix 用。Sass 上で使われる null は、#{}で指定された場合そこに何も出力しない。

```
#foobar {
  background: -webkit-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: -moz-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: -ms-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: -o-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: linear-gradient(45deg, #333333 30&#x25;, #00cc00);
}

```

### カスタムファンクションを書く

ruby で自分用のカスタムファンクションを書くという手もある。

```
module Sass::Script::Functions
  def generate_linear_gradient(*list)
    array = []
    list.each_with_index do |li,i|
      if i == 0 || li.is_a?(Sass::Script::Color) then
        array.push(li)
      else
        array[i-1] = Sass::Script::String.new("#{array[i-1]} #{li}")
      end
    end
    Sass::Script::List.new(array,',')
  end
end

```

sass の-r オプションで用意したスクリプトを require する（ 上記の ruby スクリプトが~/Desktop/sample.rb という名前で存在すると想定）。

```
sass --watch foobar.scss:foobar.css -r /Users/username/Desktop/sample.rb

```

上のスクリプトの場合は、

```
#foobar{
  @each $vendor in -webkit-,-moz-,-ms-,-o-,null {
    background-image: #{$vendor}linear-gradient(generate_linear_gradient(45deg,#333,30&#x25;,#0c0));
  }
}

```

とすると、

```
#foobar {
  background-image: -webkit-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background-image: -moz-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background-image: -ms-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background-image: -o-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background-image: linear-gradient(45deg, #333333 30&#x25;, #00cc00);
}

```

となる。color と percentage を分けて指定できるようになっている。

という感じ。compass で簡単に対応可能かをみつつ、都合にあわせて自作 mixin を作るというのが良いかもしれない。
