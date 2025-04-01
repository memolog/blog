---
title: Sass / Compass をインストール
date: 2012-09-09T13:17:00.000Z
categories:
- web
tags:
- ruby
- sass
---
前回（[RVM / JewelryBox / Homebrew をインストール - メモログ](/blog//2012/09/rvm_jewelrybox_homebrew/)）でインストールした1.9.3に、SassとCompassをインストールするの巻。[Sass](http://sass-lang.com/)はCSSの記述をサポートしてくれるプリプロセッサー。[Compass](http://compass-style.org/)はSassのお役立ちMixinをたくさん用意しているCSS authoring framework。

<!-- more -->

### Sass / Compass のインストール

ターミナルで下記を実行。

```
gem install sass
gem install compass

```

### Sassの使い方

コマンドライン上で下記のコマンドを実行。

```
sass --watch foobar.scss:foobar.css

```

これでfoobar.scssを編集保存すると、foobar.cssにCSSが生成される。

さらなる使い方は[Tutorial](http://sass-lang.com/tutorial.html)（[日本語が便利](http://hail2u.net/documents/sass-tutorial.html)）を読むと一通り分かる。

### Compassの使い方

Compassでは最初にプロジェクトを作成して、作成したプロジェクトでwatchする。

```
compass create foobar
cd foobar
watch

```

sassで--compassオプションを使って使用することもできる。

```
sass --watch foobar.scss:foobar.css --compass

```

たとえばCompassを使ってlinear-gradientを作成する場合は下記のように、必要なpartialをimportして、[compassの書式](http://compass-style.org/reference/compass/css3/images/)にあわせて記述する。

```
@import "compass/css3/images";

#foobar{
  @include background(linear-gradient(45deg, #333 30&#x25;, #0c0));
}

```

下記のようなCSSになる（-ms-は入らないのか）。

```
#foobar {
  background: -webkit-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: -moz-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: -o-linear-gradient(45deg, #333333 30&#x25;, #00cc00);
  background: linear-gradient(45deg, #333333 30&#x25;, #00cc00);
}

```

さらなる使い方は[Compass Help | Compass Documentation](http://compass-style.org/help/)を参照。日本語のドキュメントとしては、[Sass入門](https://gihyo.jp/dp/ebook/2012/978-4-7741-5123-6)にチュートリアル的なのがある。[Compassを触ってみて、CSS3のモジュールを眺めてみる。｜linker journal｜linker](http://linker.in/journal/2011/07/compasscss3.php)も参考に。

### 自分でmixinを書く

compassは便利だけど、都合にあわせて自分でmixin用意するなりした方が良い場合もあるかもしれない。たとえばvendor prefixをつけたいだけなら[@each](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#each-directive)を使うのでもいい。

```
#foobar{
  @each $vendor in -webkit-,-moz-,-ms-,-o-,null {
    background: #{$vendor}linear-gradient(45deg,#333 30&#x25;, #0c0);
  }
}

```

@eachの最後のnullは、non prefix用。Sass上で使われるnullは、#{}で指定された場合そこに何も出力しない。

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

rubyで自分用のカスタムファンクションを書くという手もある。

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

sassの-rオプションで用意したスクリプトをrequireする（ 上記のrubyスクリプトが~/Desktop/sample.rbという名前で存在すると想定）。

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

となる。colorとpercentageを分けて指定できるようになっている。

という感じ。compassで簡単に対応可能かをみつつ、都合にあわせて自作mixinを作るというのが良いかもしれない。
