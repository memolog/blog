---
title: IE float bug
date: 2006-11-27T01:47:26.000Z
featured:
  image: sebastian-pena-lambarri-YV593oyMKmo-unsplash.webp
  author: Sebastian Pena Lambarri
  authorLink: https://unsplash.com/ja/@sebaspenalambarri?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
categories:
  - web
tags:
  - css
  - ie
excerpt: "IE にはいろいろなバグが存在するのは周知の事実ですが、その一つに float された要素の margin（または padding）を二重に計算してしまうというものがあるそうです。"
---

IE にはいろいろなバグが存在するのは周知の事実ですが、その一つに float された要素の margin（または padding）を二重に計算してしまうというものがあるそうです。今回作成した CSS と HTML ではこのバグに直面したようです。

調べていくと、float をかけている要素を display:inline にすれば回避できるようなのですが、どうもうまくいかない（人違いならず、バグ違いだったかも）。時間もないので、美しくないですが main-navigation の下に`<br clear="left;" />`を追加しててきとうに回避しました。一番最後のリストタグに、`style="clear:left;"`と入れても良かったかもしれませんが、検証し直すほどのことでもない気がするので、そのまま。このまま。気の向くままに。
