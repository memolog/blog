---
title: watir-webdriver：要素で使用できる属性を増やす
date: 2011-09-13T15:30:00.000Z
featured:
  image: add-attribute-in-element-about-watir-webdriver.webp
  author: chatGPT
categories:
  - software testing
tags:
  - watir
  - webdriver
excerpt: "watir-webdriverでは、たとえば「b.link(:id,'memolog').href」みたいなかたちで要素を特定させて、特定した要素の属性を取得することができます（詳細はAPIなどを参照）。ただW3Cで規定されている属性しかメソッド化されていないので、たとえばtwitterのt.coのリンクの元URLの属性（data-expanded-url）などは通常では取得することができません。"
---

watir-webdriver では、たとえば `b.link(:id,'memolog').href` みたいなかたちで要素を特定させて、特定した要素の属性を取得することができます（詳細は[API](http://jarib.github.com/watir-webdriver/doc/)などを参照）。ただ[W3C](http://dev.w3.org/html5/spec/Overview.html#the-a-element)で規定されている属性しかメソッド化されていないので、たとえば twitter の t.co のリンクの元 URL の属性（data-expanded-url）などは通常では取得することができません。

`html.slice(/data-expanded-url=\\"(\[^"\]+)\\"/,1)`みたいにして html から slice することはできますけど、やはり`link.data-expanded-url`みたいなかたちで取得できる方が良い

そこで要素で使用できる属性を追加するという話。属性は module Watir の中の class で attributes のクラスメソッドによってメソッド化されています。同じような手順で好きな属性を追加することができます。

```
require 'watir-webdriver'

module Watir
  class Anchor
    attributes(:string => [:'data-expanded-url'])
  end
end

```

これで link のメソッドに `data-expaneded-url` が追加されます（メソッド名にハイフンが含まれると、その部分がマイナスの演算子として認識されてしまうので、実際には `link.send('data-expanded-url')` みたいな形で使用するかなんとかにしないといけませんが）。

meta タグの property 属性（og:image とか指定するのに使う）を取得したい場合も同じ要領で簡単にとれるようになります。

```
module Watir
  class Meta
    attributes(:string => [:property])
  end
end

b.meta(:property,'og:image').content
```
