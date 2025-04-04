---
title: aria-hiddenについて
date: 2012-05-26T15:48:00.000Z
categories:
  - web
tags:
  - accessibility
  - html
featured:
  image: anthony-delanoix-28851-unsplash
  author: Anthony DELANOIX
  authorLink: https://unsplash.com/photos/Hk7l6DmgO7Q?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
excerpt: "HTML for Icon Font Usage | CSS-Tricksでアイコン用フォントを使用して、対象の左側にアイコン画像を表示するという方法が紹介されているのですが、その中でスクリーンリーダー対策として「aria-hidden」という属性を入れている。"
---

[HTML for Icon Font Usage | CSS-Tricks](http://css-tricks.com/html-for-icon-font-usage/)でアイコン用フォントを使用して、対象の左側にアイコン画像を表示するという方法が紹介されているのですが、その中でスクリーンリーダー対策として「aria-hidden」という属性を入れている。

```html
<h2 id="stats">
  <span aria-hidden="true" data-icon="&#x21dd;"></span>
  Stats
</h2>
```

```css
[data-icon]:before {
  font-family: icons; /* BYO icon font, mapped smartly */
  content: attr(data-icon);
  speak: none; /* Not to be trusted, but hey. */
}
```

この aria-hidden について知らなかったので（というより ARIA は landmark しか分からない...）、[仕様](http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden)を読んだ。

> Indicates that the element and all of its descendants are not visible or perceivable to any user as implemented by the author. See related aria-disabled.
>
> If an element is only visible after some user action, authors MUST set the aria-hidden attribute to true. When the element is presented, authors MUST set the aria-hidden attribute to false or remove the attribute, indicating that the element is visible. Some assistive technologies access WAI-ARIA information directly through the DOM and not through platform accessibility supported by the browser. Authors MUST set aria-hidden="true" on content that is not displayed, regardless of the mechanism used to hide it. This allows assistive technologies or user agents to properly skip hidden elements in the document.
>
> ...
>
> Authors MAY, with caution, use aria-hidden to hide visibly rendered content from assistive technologies only if the act of hiding this content is intended to improve the experience for users of assistive technologies by removing redundant or extraneous content. Authors using aria-hidden to hide visible content from screen readers MUST ensure that identical or equivalent meaning and functionality is exposed to assistive technologies.

aria-hidden は、その要素と子孫要素が、どんなユーザーにも表示されない、または知覚されないということを示すために使用される。たとえば、何かのアクションをしたときにはじめて表示されるような要素は、aria-hidden を true に設定して、その要素が表示されたときに aria-hidden を false にする（または属性を取り除く）ということをする。コンテンツの状態をスクリーンリーダーなどに明示することができると。

また、aria-hidden ではコンテンツが冗長だったり無関係なコンテンツなどを取り除いて、スクリーンリーダなど assistive technologies でのエクスペリエンスを向上させるために、それらのみに対して非表示にするという使用方法にも言及している。ただ、その場合は、意味的・機能的に同じになるように配慮しなければならない。

上の例の場合は「Stats」というテキストが、アイコン画像と意味的に同じだから問題ないと。CSS-Tricks の記事の次の例では、アイコンだけ表示したい場合に、スクリーンリーダー用の代替テキストも HTML 上に記述するように配慮されてある（通常の PC では見えないように CSS を指定している）。

なるほど！

このへんの勉強のために、[HTML5 Accessibility Chops: hidden and aria-hidden | The Paciello Group Blog](http://www.paciellogroup.com/blog/2012/05/html5-accessibility-chops-hidden-and-aria-hidden/)という記事と[HTML5 Accessibility: aria-hidden and role=”presentation” « Unrepentant](http://john.foliot.ca/aria-hidden/)も読みました。hidden 要素や role=presentation についても別の機会にきちんと勉強したい。

あと、この CSS-Tricks の記事についての蛇足としては、コメント欄で data-icon 属性で content の内容を指定するより普通に class を使って指定した方が分かりやすいという意見が出ていました。個人的には data-icon の方が汎用的で魅力的に感じますけど、その意見も一理あるかも。
