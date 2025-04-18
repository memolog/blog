---
title: main要素 と default implicit ARIA semantics
date: 2013-01-31T17:00:00.000Z
categories:
  - web
tags:
  - aria
  - html
  - html5
  - semantics
excerpt: "Open Web Platform Weekly Summary - 2013-01-20 - 2013-01-27 - W3C Blogにて、HTML5.1で追加されるmain要素がFirefoxのコードにお目見えしたという話が掲載されていました。Firefox Nightlyで確認してみたら、確かに入っている雰囲気（main要素確認用codepenでmain要素をinspectすると、main要素用にstyleが追加されているのが分かる）。Chrome Canaryでも対応している雰囲気。"
---

[Open Web Platform Weekly Summary - 2013-01-20 - 2013-01-27 - W3C Blog](http://www.w3.org/QA/2013/01/openweb-weekly-02.html)にて、HTML5.1 で追加される[main 要素](http://www.w3.org/html/wg/drafts/html/master/grouping-content.html#the-main-element)が Firefox のコードにお目見えしたという話が掲載されていました。[Firefox Nightly](http://nightly.mozilla.org/)で確認してみたら、確かに入っている雰囲気（[main 要素確認用 codepen](http://codepen.io/memolog/pen/ozlGs)で main 要素を inspect すると、main 要素用に style が追加されているのが分かる）。[Chrome Canary](https://www.google.com/intl/ja/chrome/browser/canary.html)でも対応している雰囲気。

main 要素は、ドキュメントの中で「メイン」にあたるコンテンツを囲う要素として定義されています（The main element represents the main content section of the body of a document or application. ）。sectioning content は作らない。ドキュメントの中には一つしかおけず、article、aside、footer、header、nav 要素の子要素としても含めることは禁止されている。main 要素はメインコンテンツ全体を包含するのだから article 要素の 1 コンテンツの子要素にはなりえないし、メインを補完するような要素の aside の中には含まれない、サイトのナビゲーションもメインの要素ではないと。main 要素の導入に至る背景などを含めた詳細は[HTML に提案中の main 要素 - fragmentary](http://myakura.hatenablog.com/entry/2012/12/01/025158)に書かれています。

また、main 要素には[WAI-ARIA](http://www.w3.org/html/wg/drafts/html/master/dom.html#wai-aria)の項目で、「Strong native semantics and default implicit ARIA semantics」として main role が定義されています。main 要素は明示的に role 属性を付与しなくても、main role の属性（をつけたのと同じ意味的情報）を持っている（仕様にはブラウザが実装的にそれをサポートするまでは、明示的に role='main'を付与した方が良いとも書いてありますけど）。

「default implicit ARIA semantics」の意味は WAI-ARIA の「[implicit WAI-ARIA semantics](http://www.w3.org/TR/wai-aria/host_languages#implicit_semantics)」と同等の意味らしいのですが、そこには下記のように書かれてあります。

> WAI-ARIA is designed to provide semantic information about objects when host languages lack native semantics for the object. WAI-ARIA is designed, however, to provide additional semantics for many host languages. Furthermore, host languages over time can evolve and provide new native features that correspond to WAI-ARIA features. Therefore, there are many situations in which WAI-ARIA semantics are redundant with host language semantics.
>
> These host language features can be viewed as having "implicit WAI-ARIA semantics". User agent processing of features with implicit WAI-ARIA semantics would be similar to the processing for the WAI-ARIA feature. The processing might not be identical because of lexical differences between the host language feature and the WAI-ARIA feature, but generally the user agent would expose the same information to the accessibility API. Features with implicit WAI-ARIA semantics satisfy WAI-ARIA structural requirements such as required owned elements, required states and properties, etc. and do not require explicit WAI-ARIA semantics to be provided.
>
> For example, if an element with the functionality already exists, such as a checkbox or radio button, use the native semantics of the host language. WAI-ARIA markup is only intended to be used to enhance the native semantics (e.g., indicating that the element is required with aria-required), or to change the semantics to a different purpose form the standard functionality of the element.

WAI-ARIA は、対象のオブジェクトとか機能が、本来的に持っている意味（native semantics）が不足している場合に、意味的な情報を提供するためにデザインされている。一方で、明示しなくても WAI-ARIA が提供している意味的な情報を含有しているとみなせる機能もあり、それがその機能の implicit WAI-ARIA semantics という。たとえば、a 要素で作られたリンクは[link の role](http://www.w3.org/TR/wai-aria/roles#link)を意味的に含有していると見なせる。

native semantics とは、対象の機能が本来的に持っている意味的な情報で、たとえば、checkbox は checkbox としての意味をそもそも持っている、みたいな。その本来的に持っている意味情報が、WAI-ARIA の定義と重なっていれば、implicit WAI-ARIA semantics を含有しているとも言える。その場合、たとえば「必須」の checkbox みたいに、その機能が本来的に持っていない意味を追加したい場合だけ、area-required みたいな属性を追加すれば良い。または、その要素の標準的な使用方法と異なる意味で使うときに、意味的な情報を override するために WAI-ARIA を使用する（HTML の場合、default implict ARIA semantics の変更には、制約(Restriction)が定義されている）。

Strong native semantics については、下記のように書かれています。

> Host languages MAY document features that cannot be overridden with WAI-ARIA (these are called **"strong native semantics"**). These can be features that have implicit WAI-ARIA semantics, as well as features where the processing would be uncertain if the semantics were changed with WAI-ARIA. Conformance checkers MAY signal an error or warning when a WAI-ARIA role is used on elements with strong native semantics, but as described above, user agents MUST still use the value of the the semantic of the WAI-ARIA role when exposing the element to accessibility APIs.

native semantics（とそれに付帯する implicit ARIA semantics）は、意味的な情報を変更したければ変更することが許容される。たとえば、a 要素のリンクを「link」という意味ではなく、「tab」型のナビゲーションのタブとしても使うこともできる。

strong native semantics の場合は、本来的な意味以外での使用を想定しなくて良いみたいな含意がある（と思う）。たとえば、nav 要素は navigation role が strong native semantics な implicit ARIA semantics として付与されている。nav 要素はナビゲーション用途以外の使い方なんてないんだから、別途 role 属性がついていても、それを無視しても良いと（HTML など host language が）定義するかもしれないと（一方で accessibility APIs を通して要素の情報を得る場合は role 属性の意味を使わないといけないとしている）。

つまり、main 要素は、HTML の定義からも、WAI-ARIA semantics な面からも「メインコンテンツを囲う」という、それだけの用途を持った要素と言えます。他の用途で使う余地がないという意味で、わかりやすいといえば分かりやすい。あえて新しい要素を定義しなくても良いような気もしますけど（div role='main'でも十分な感はある）、HTML タグを適切に使用するだけで適切な WAI-ARIA semantics も持たせることができるというのは意味のあることかなと思います。
