---
title: CSS Transforms&#x3a; transform-origin
date: 2012-09-15T14:00:00.000Z
categories:
  - web
tags:
  - css
  - transform
excerpt: "CSS Transforms (2D) - メモログの続きで、transform-originについて。回転などtransformの変換はデフォルトでは要素の中心（50&#x25; 50&#x25;）を軸に行われる。たとえば、rotate(45deg)の場合は以下のような感じ"
---

[CSS Transforms (2D) - メモログ](/blog//2012/09/css_transforms_2d/)の続きで、transform-origin について。回転など transform の変換はデフォルトでは要素の中心（50&#x25; 50&#x25;）を軸に行われる。たとえば、rotate(45deg)の場合は以下のような感じ

サンプル

サンプル

transform-origin のプロパティではその軸の場所を変更することができる。transform-origin を 100&#x25; 100&#x25;に設定すると、下記のような感じになる。要素の右下を中心に回転する。

サンプル

サンプル

transform-origin を 150&#x25; 150&#x25;などに設定することで、要素の外側に軸を設定することもできる。ので、たとえば下記のようなアニメーションをすることもできる

@-moz-keyframes rotate { from { -moz-transform: rotate(0deg); } to { -moz-transform: rotate(360deg); } } @-webkit-keyframes rotate { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } } @-o-keyframes rotate { from { -o-transform: rotate(0deg); } to { -o-transform: rotate(360deg); } } @keyframes rotate { from { -o-transform: rotate(0deg); } to { -o-transform: rotate(360deg); } } .sample { font-size: 0.5em; width: 40px; height: 40px; border: 1px solid #ddd; background: #f0f0f0; -moz-transform-origin: 150&#x25; 150&#x25;; -moz-animation-duration: 2s; -moz-animation-name: rotate; -moz-animation-iteration-count: infinite; -moz-animation-timing-function: linear; -webkit-transform-origin: 150&#x25; 150&#x25;; -webkit-animation-duration: 2s; -webkit-animation-name: rotate; -webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: linear; -ms-transform-origin: 150&#x25; 150&#x25;; -ms-animation-duration: 2s; -ms-animation-name: rotate; -ms-animation-iteration-count: infinite; -ms-animation-timing-function: linear; -o-transform-origin: 150&#x25; 150&#x25;; -o-animation-duration: 2s; -o-animation-name: rotate; -o-animation-iteration-count: infinite; -o-animation-timing-function: linear; transform-origin: 150&#x25; 150&#x25;; animation-duration: 2s; animation-name: rotate; animation-iteration-count: infinite; animation-timing-function: linear; }

サンプル

```
@-moz-keyframes rotate {
  from { -moz-transform: rotate(0deg); }
  to { -moz-transform: rotate(360deg); }
}

@-webkit-keyframes rotate {
  from { -webkit-transform: rotate(0deg); }
  to { -webkit-transform: rotate(360deg); }
}

@-o-keyframes rotate {
  from { -o-transform: rotate(0deg); }
  to { -o-transform: rotate(360deg); }
}

@keyframes rotate {
  from { -o-transform: rotate(0deg); }
  to { -o-transform: rotate(360deg); }
}

.sample {
  font-size: 0.5em;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: #f0f0f0;
  -moz-transform-origin: 150&#x25; 150&#x25;;
  -moz-animation-duration: 2s;
  -moz-animation-name: rotate;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -webkit-transform-origin: 150&#x25; 150&#x25;;
  -webkit-animation-duration: 2s;
  -webkit-animation-name: rotate;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -ms-transform-origin: 150&#x25; 150&#x25;;
  -ms-animation-duration: 2s;
  -ms-animation-name: rotate;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  -o-transform-origin: 150&#x25; 150&#x25;;
  -o-animation-duration: 2s;
  -o-animation-name: rotate;
  -o-animation-iteration-count: infinite;
  -o-animation-timing-function: linear;
  transform-origin: 150&#x25; 150&#x25;;
  animation-duration: 2s;
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

```

CSS Transforms 関連記事
