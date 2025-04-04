---
title: watir&#x3a; click_no_wait が動作しない その2
date: 2010-11-06T15:50:00.000Z
categories:
  - software testing
tags:
  - watir
excerpt: "watir 1.6.5ではclick\_no\_waitが動作しないという話をして、その後watir 1.6.6では修正されているという話をしました。1.6.6では性能も改善されていて、click\_no\_waitのメソッドを実行すると、10〜20秒くらい止まってしまうということもなくなりました。"
---

[watir 1.6.5 では click_no_wait が動作しない](/blog//2010/07/watir_click_no_wait_doesnt_work/)という話をして、その後[watir 1.6.6](/blog//2010/10/watir_166/)では修正されているという話をしました。[1.6.6 では性能も改善されていて](http://jira.openqa.org/browse/WTR-449)、click_no_wait のメソッドを実行すると、10〜20 秒くらい止まってしまうということもなくなりました。

それで基本的に動作に問題はなくなったのですが、自分の環境で動作させたときに click_no_wait が動作しない場合がありました。それのメモ。

click_no_wait のメソッドのソースを[rdoc.info](http://rdoc.info/gems/watir/1.6.7/Watir/Element:click_no_wait)から抜粋

```
# File 'lib/watir/element.rb', line 234

def click_no_wait
  assert_exists
  assert_enabled
  highlight(:set)
  element = "#{self.class}.new(#{@page_container.attach_command}, :unique_number, #{self.unique_number})"
  ruby_code = "require 'rubygems';" <<
          "require '#{File.expand_path(File.dirname(__FILE__))}/core';" <<
          "#{element}.click!"
  system(spawned_click_no_wait_command(ruby_code))
  highlight(:clear)
end

```

element = ほにゃららというところで、"Button.new(Watir::IE.attach(:hwnd, 11111),:unique_number, 1)"みたいな文字列を生成する。最初が self.class なので、button メソッドを実行しているときは Button となる。[attach_command](http://rdoc.info/gems/watir/1.6.7/Watir/IE:attach_command)というメソッドは"Watir::IE.attach(:hwnd, #{hwnd})"という書式の文字列を返す。[hwnd](http://rdoc.info/gems/watir/1.6.7/Watir/IE:hwnd)は window の handle を返す。この handle の ID で window を特定して attach している。

次の ruby_code の行で、system に渡すコマンドの文字列を生成しています。rubygems を require したあとに、\_\_FILE\_\_（実行中のファイル）からパスをとって、watir/lib/core を require して、上の行で作成したエレメントを click!する。その下の spawned_click_no_wait_command というのは、ruby_code で作成した文字列に"start rubyw -e"を追加する。また、$DEBUG が true の場合はコマンドの実行ログ的なものを出力します。

ruby_code の最後に指定している element.click!の[click!メソッド](http://rdoc.info/gems/watir/1.6.7/Watir/Element:click!)のソースは下記のような感じ。ole_object という COM で操作できるオブジェクトがあって[click メソッド](http://msdn.microsoft.com/en-us/library/ms536363%28v=VS.85%29.aspx)を実行します。

```
def click!
  assert_exists
  assert_enabled

  highlight(:set)
  ole_object.click
  highlight(:clear)
end

```

COM の click メソッドについては詳細はよくわからず... とにかくクリックした後に戻りを待つようでボタン押した後にエラーが発生すると、待ちっぱなしの状態になってしまいます。そのために、click_no_wait のメソッドではそれを回避するために、system メソッドを使用して動作中の ruby とは別のプロセスで click メソッドを実行するようにしています。

別のプロセスで実行されるため、click_no_wait が失敗した場合は（$DEBUG を true にしていない限り）エラーとして何も出力されずに次の処理に進んでしまう。なので外部的にはいつまでもクリックが実行されないで止まっているように見える（実際に実行に時間がかかっている場合もあるが、外部的には失敗しているか実行待ちの状態かはわからない）。

実行が失敗する要因としては 2 カ所あって、ひとつは window を操作する hwnd が異なる場合。hwnd は最初に hwnd が呼ばれたときに@ie（WIN32OLE.new('InternetExplorer.Application')のオブジェクト）の hwnd を参照する。それ以降はその値が保存されている限りは更新されないので、一度 close したあとに[\_new_window_init](http://rdoc.info/gems/watir/1.6.7/Watir/IE:_new_window_init)とかで新しいウィンドウを呼び出し直すと、hwnd が更新されないということが起きます。自分で hwnd=ie.hwnd 的なことをしないといけない（あと close したあとは@closing が true になるので、ie.closing=nil とかしないと exist?したときに false になってしまう）。これをしないと attach したときに失敗してしまいます。

もう一つは click_no_wait メソッドを自分用のスクリプトファイルで上書きした場合。\_\_FILE\_\_が実行中のファイルのパスを表示するので、自分用のスクリプトファイルで上書きしていると\_\_FILE\_\_の場所が変わってしまって、うまく require ができなくなってしまう。click_no_wait メソッドは上書きしないか、\_\_FILE\_\_の場所を"#{Gem.loaded_specs("watir").full_gem_path}/lib/watir/"とかに変更する（または直接 watir のディレクトリを指定）。

という感じのメモ、です（ながい）。click_no_wait はどうしても時間がかかってしまうのでできるだけ使用しない方が良いですね。

これはまだ実験中なのですが、Thread.new{ buttons.first.click! } みたいに Thread で囲んだらどうかなーと思ったのですが、やはりボタンが押された後で止まってしまう。下記のような感じで Watir::IE.attach で同じブラウザを別のオブジェクトでボタンだけ操作するというのはどうかなあ。まだ試していないので結果は不明。

```
b = Watir::Browser.new
b.goto "http://memolog.org"

Thread.new do
  c = Watir::Attach(:hwnd,b.hwnd)
  c.button(:id,"id").click
end

b.wait_until(30){ Watir.autoit.WinExists(title) == 1 }
...
...

```
