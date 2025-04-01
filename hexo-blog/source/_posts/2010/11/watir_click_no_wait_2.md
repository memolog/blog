---
title: watir&#x3a; click_no_wait が動作しない その2
date: 2010-11-06T15:50:00.000Z
categories:
- software testing
tags:
- watir
---
[watir 1.6.5ではclick\_no\_waitが動作しない](/blog//2010/07/watir_click_no_wait_doesnt_work/)という話をして、その後[watir 1.6.6](/blog//2010/10/watir_166/)では修正されているという話をしました。[1.6.6では性能も改善されていて](http://jira.openqa.org/browse/WTR-449)、click\_no\_waitのメソッドを実行すると、10〜20秒くらい止まってしまうということもなくなりました。

<!-- more -->

それで基本的に動作に問題はなくなったのですが、自分の環境で動作させたときにclick\_no\_waitが動作しない場合がありました。それのメモ。

click\_no\_waitのメソッドのソースを[rdoc.info](http://rdoc.info/gems/watir/1.6.7/Watir/Element:click_no_wait)から抜粋

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

element = ほにゃららというところで、"Button.new(Watir::IE.attach(:hwnd, 11111),:unique_number, 1)"みたいな文字列を生成する。最初がself.classなので、buttonメソッドを実行しているときはButtonとなる。[attach_command](http://rdoc.info/gems/watir/1.6.7/Watir/IE:attach_command)というメソッドは"Watir::IE.attach(:hwnd, #{hwnd})"という書式の文字列を返す。[hwnd](http://rdoc.info/gems/watir/1.6.7/Watir/IE:hwnd)はwindowのhandleを返す。このhandleのIDでwindowを特定してattachしている。

次のruby\_codeの行で、systemに渡すコマンドの文字列を生成しています。rubygemsをrequireしたあとに、\_\_FILE__（実行中のファイル）からパスをとって、watir/lib/coreをrequireして、上の行で作成したエレメントをclick!する。その下のspawned\_click\_no\_wait\_commandというのは、ruby_codeで作成した文字列に"start rubyw -e"を追加する。また、$DEBUGがtrueの場合はコマンドの実行ログ的なものを出力します。

ruby_codeの最後に指定しているelement.click!の[click!メソッド](http://rdoc.info/gems/watir/1.6.7/Watir/Element:click!)のソースは下記のような感じ。ole_objectというCOMで操作できるオブジェクトがあって[clickメソッド](http://msdn.microsoft.com/en-us/library/ms536363&#x25;28v=VS.85&#x25;29.aspx)を実行します。

```
def click!
  assert_exists
  assert_enabled

  highlight(:set)
  ole_object.click
  highlight(:clear)
end

```

COMのclickメソッドについては詳細はよくわからず... とにかくクリックした後に戻りを待つようでボタン押した後にエラーが発生すると、待ちっぱなしの状態になってしまいます。そのために、click\_no\_waitのメソッドではそれを回避するために、systemメソッドを使用して動作中のrubyとは別のプロセスでclickメソッドを実行するようにしています。

別のプロセスで実行されるため、click\_no\_waitが失敗した場合は（$DEBUGをtrueにしていない限り）エラーとして何も出力されずに次の処理に進んでしまう。なので外部的にはいつまでもクリックが実行されないで止まっているように見える（実際に実行に時間がかかっている場合もあるが、外部的には失敗しているか実行待ちの状態かはわからない）。

実行が失敗する要因としては2カ所あって、ひとつはwindowを操作するhwndが異なる場合。hwndは最初にhwndが呼ばれたときに@ie（WIN32OLE.new('InternetExplorer.Application')のオブジェクト）のhwndを参照する。それ以降はその値が保存されている限りは更新されないので、一度closeしたあとに[\_new\_window_init](http://rdoc.info/gems/watir/1.6.7/Watir/IE:_new_window_init)とかで新しいウィンドウを呼び出し直すと、hwndが更新されないということが起きます。自分でhwnd=ie.hwnd的なことをしないといけない（あとcloseしたあとは@closingがtrueになるので、ie.closing=nil とかしないとexist?したときにfalseになってしまう）。これをしないとattachしたときに失敗してしまいます。

もう一つはclick\_no\_waitメソッドを自分用のスクリプトファイルで上書きした場合。\_\_FILE\_\_が実行中のファイルのパスを表示するので、自分用のスクリプトファイルで上書きしていると\_\_FILE\_\_の場所が変わってしまって、うまくrequire ができなくなってしまう。click\_no\_waitメソッドは上書きしないか、\_\_FILE\_\_の場所を"#{Gem.loaded\_specs("watir").full\_gem_path}/lib/watir/"とかに変更する（または直接watirのディレクトリを指定）。

という感じのメモ、です（ながい）。click\_no\_waitはどうしても時間がかかってしまうのでできるだけ使用しない方が良いですね。

これはまだ実験中なのですが、Thread.new{ buttons.first.click! } みたいにThreadで囲んだらどうかなーと思ったのですが、やはりボタンが押された後で止まってしまう。下記のような感じでWatir::IE.attachで同じブラウザを別のオブジェクトでボタンだけ操作するというのはどうかなあ。まだ試していないので結果は不明。

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
