---
title: watir-webdriver：使用できる要素を追加する
date: 2011-09-15T15:25:00.000Z
categories:
  - software testing
tags:
  - selenium
  - watir
  - webdriver
excerpt: "watir-webdriverでは広範囲のHTMLタグ（ほとんど全部）をサポートしているけれど、svgやcircleなど一部のタグは現在のところサポートしていません（参考：Does watir support svg - Watir General | Google グループ）。"
---

watir-webdriver では広範囲の HTML タグ（ほとんど全部）をサポートしているけれど、svg や circle など一部のタグは現在のところサポートしていません（参考：[Does watir support svg - Watir General | Google グループ](http://groups.google.com/group/watir-general/msg/271325e18d2b98f2?pli=1)）。

なので、自分で追加して使おうという話。watir-webdriver 上にタグを追加するのは仕組み上は簡単で、下記のように class を追加すれば良い（circle での追加例）。

```
module Watir
class Circle < HTMLElement
  attributes(:string => [:cx,:cy,:r,:stroke,:'stroke-width',
                         :'fill-opacity',:fill])
end
class CircleCollection < ElementCollection
def element_class
  Circle
 end
end

module Container
  def circle(*args)
    Circle.new(self, extract_selector(args).merge(:tag_name => "circle"))
  end

  def circles(*args)
    CircleCollection.new(self,
                     extract_selector(args).merge(:tag_name => "circle"))
  end
end
end

```

これで「b.circle」とか「b.circles」とかで circle タグの要素を取ってくることができます

ただし制限があって、「b.circle(:fill,'#ffffff')」のように属性を指定して取得することが今のところできません。watir-webdriver での要素の取得は、属性を指定する場合、最終的に selenium のインスタンスに対して、find_element メソッドと内部生成した xpath を使って取得します（element_locator.rb の locate メソッド）。しかし selenium において、find_element(:xpath,".//circle\[@fill='#ffffff'\]")というような xpath で要素を取得することができないみたいです（現在のところ）。

属性を指定しない場合（「b.circle」みたいに）は内部的に tag_name を使って取得するため大丈夫みたいです（find_element(:tag_name,'circle')）。なので、b.circle(:fill,'#ffffff')と同じ要素を取得したい場合は、b.circles.find{|c| c.fill == '#ffffff'}みたいな感じで回避することができます。ちょっと不格好ですけど。
