---
title: watirでJavascriptのアラートを操作する
date: 2009-05-09T16:27:30.000Z
categories:
  - software testing
tags:
  - watir
excerpt: "watirで操作をしているときに、Javascriptのアラートを操作しないといけないときがたまにあります。私は、最近は下記のようにautoitを使って操作しています。"
---

watir で操作をしているときに、Javascript のアラートを操作しないといけないときがたまにあります。私は、最近は下記のように autoit を使って操作しています。

```ruby
def handling_javascript()
  title = @ie.Name
  Watir.autoit.WinWait(title,"","10")
  if Watir.autoit.WinExists(title) == 1
    Watir.autoit.ControlFocus(title,"","")
    Watir.autoit.ControlClick(title,"","OK")
  end
end

```

title=@ie.Name では、IE の名称を取得しています。これは Javascript のアラートを操作するときの window の title として必要なのですが、IE の名称は IE6 と IE7 以降では異なるため、その都度取得しています。WinWait は、title に合致した window が表示されるまで待ちます。3 つ目の引数でタイムアウトを設定できます。WinExists は、title で指定した window が存在する場合は 1 を返します。ControlFocus は title で指定した window にフォーカスします。ControlClick では title で指定した window にある、3 つ目の引数で指定した文字列のボタンをクリックします。

これだけなのですが、最低限の操作はこれで可能です。そのほか Javascript の操作の方法は、[watir の FAQ](http://wiki.openqa.org/display/WTR/JavaScript+Pop+Ups)や[WinClicker による操作](http://wtr.rubyforge.org/rdoc/)とかを参照するといいかもしれません。
