---
title: CSS Transforms&#x3a; くるくる回るサイコロのサンプル
date: 2012-09-26T22:00:00.000Z
categories:
  - web
tags:
  - css
excerpt: "CSS Transforms関連記事のまとめ的意味を込めて、くるくる回るサイコロを作成してみました。下のサイコロ（の開き）をクリック（またはhover）すると、クリックした間だけアニメーションします。CSSのみ（と思ったらiPhoneだと期待したようにactive状態にならないので、touchstartしたときにdice-actionというclassを追加するようにJavascriptを入れた）。"
---

CSS Transforms 関連記事のまとめ的意味を込めて、くるくる回るサイコロを作成してみました。下のサイコロ（の開き）をクリック（または hover）すると、クリックした間だけアニメーションします。CSS のみ（と思ったら iPhone だと期待したように active 状態にならないので、touchstart したときに dice-action という class を追加するように Javascript を入れた）。

\* { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } .dice { -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-perspective: 1000px; -moz-perspective: 1000px; -ms-perspective: 1000px; -o-perspective: 1000px; perspective: 1000px; -webkit-perspective-origin: 50&#x25; 50&#x25;; -moz-perspective-origin: 50&#x25; 50&#x25;; -ms-perspective-origin: 50&#x25; 50&#x25;; -o-perspective-origin: 50&#x25; 50&#x25;; perspective-origin: 50&#x25; 50&#x25;; position: relative; width: 400px; height: 400px; } .dice > div, .dice .five, .dice .six { position: absolute; width: 100px; height: 100px; border: 1px solid #ddd; background-color: rgba(158, 158, 158, 0.1); line-height: 100px; text-align: center; } .dice .one { top: 100px; left: 200px; } .dice .two { top: 0; left: 200px; -webkit-transform-origin: bottom left; -moz-transform-origin: bottom left; -ms-transform-origin: bottom left; -o-transform-origin: bottom left; transform-origin: bottom left; border-bottom: none; } .dice .three { top: 100px; left: 300px; -webkit-transform-origin: top left; -moz-transform-origin: top left; -ms-transform-origin: top left; -o-transform-origin: top left; transform-origin: top left; border-left: none; } .dice .three .inner { -webkit-transform: rotateZ(90deg); -moz-transform: rotateZ(90deg); -ms-transform: rotateZ(90deg); -o-transform: rotateZ(90deg); transform: rotateZ(90deg); } .dice .four { top: 100px; left: 100px; -webkit-transform-origin: top right; -moz-transform-origin: top right; -ms-transform-origin: top right; -o-transform-origin: top right; transform-origin: top right; border-right: none; } .dice .four .inner { -webkit-transform: rotateZ(-90deg); -moz-transform: rotateZ(-90deg); -ms-transform: rotateZ(-90deg); -o-transform: rotateZ(-90deg); transform: rotateZ(-90deg); } .dice .five-six { top: 200px; left: 200px; -webkit-transform-origin: top left; -moz-transform-origin: top left; -ms-transform-origin: top left; -o-transform-origin: top left; transform-origin: top left; border: none; background: transparent; height: 200px; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -ms-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d; } .dice .five { top: 0; left: 0; border-top: none; border-bottom: none; } .dice .five .inner { -webkit-transform: rotateZ(180deg); -moz-transform: rotateZ(180deg); -ms-transform: rotateZ(180deg); -o-transform: rotateZ(180deg); transform: rotateZ(180deg); } .dice .six { top: 100px; left: 0; -webkit-transform-origin: top left; -moz-transform-origin: top left; -ms-transform-origin: top left; -o-transform-origin: top left; transform-origin: top left; } .dice .six .inner { -webkit-transform: rotateZ(180deg); -moz-transform: rotateZ(180deg); -ms-transform: rotateZ(180deg); -o-transform: rotateZ(180deg); transform: rotateZ(180deg); } .dice:hover, .dice:active, .dice-active { -moz-animation-duration: 5s; -moz-animation-name: cube; -moz-animation-iteration-count: infinite; -moz-animation-timing-function: linear; -webkit-animation-duration: 5s; -webkit-animation-name: cube; -webkit-animation-iteration-count: infinite; -webkit-animation-timing-function: linear; -ms-animation-duration: 5s; -ms-animation-name: cube; -ms-animation-iteration-count: infinite; -ms-animation-timing-function: linear; -o-animation-duration: 5s; -o-animation-name: cube; -o-animation-iteration-count: infinite; -o-animation-timing-function: linear; animation-duration: 5s; animation-name: cube; animation-iteration-count: infinite; animation-timing-function: linear; } .dice:hover .two, .dice:active .two, .dice-active .two { -webkit-transform: rotateX(-90deg); -moz-transform: rotateX(-90deg); -ms-transform: rotateX(-90deg); -o-transform: rotateX(-90deg); transform: rotateX(-90deg); } .dice:hover .three, .dice:active .three, .dice-active .three { -webkit-transform: rotateY(-90deg); -moz-transform: rotateY(-90deg); -ms-transform: rotateY(-90deg); -o-transform: rotateY(-90deg); transform: rotateY(-90deg); } .dice:hover .four, .dice:active .four, .dice-active .four { -webkit-transform: rotateY(90deg); -moz-transform: rotateY(90deg); -ms-transform: rotateY(90deg); -o-transform: rotateY(90deg); transform: rotateY(90deg); } .dice:hover .five-six, .dice:active .five-six, .dice-active .five-six { -webkit-transform: rotateX(90deg); -moz-transform: rotateX(90deg); -ms-transform: rotateX(90deg); -o-transform: rotateX(90deg); transform: rotateX(90deg); } .dice:hover .six, .dice:active .six, .dice-active .six { -webkit-transform: rotateX(90deg); -moz-transform: rotateX(90deg); -ms-transform: rotateX(90deg); -o-transform: rotateX(90deg); transform: rotateX(90deg); } .dice:hover .two, .dice:active .two, .dice-active .two { -moz-animation-duration: 2s; -moz-animation-name: cube-two; -moz-animation-iteration-count: 1; -moz-animation-timing-function: ease; -moz-animation-delay: 0s; -webkit-animation-duration: 2s; -webkit-animation-name: cube-two; -webkit-animation-iteration-count: 1; -webkit-animation-timing-function: ease; -webkit-animation-delay: 0s; -ms-animation-duration: 2s; -ms-animation-name: cube-two; -ms-animation-iteration-count: 1; -ms-animation-timing-function: ease; -ms-animation-delay: 0s; -o-animation-duration: 2s; -o-animation-name: cube-two; -o-animation-iteration-count: 1; -o-animation-timing-function: ease; -o-animation-delay: 0s; animation-duration: 2s; animation-name: cube-two; animation-iteration-count: 1; animation-timing-function: ease; animation-delay: 0s; } .dice:hover .three, .dice:active .three, .dice-active .three { -moz-animation-duration: 2s; -moz-animation-name: cube-three; -moz-animation-iteration-count: 1; -moz-animation-timing-function: ease; -moz-animation-delay: 0s; -webkit-animation-duration: 2s; -webkit-animation-name: cube-three; -webkit-animation-iteration-count: 1; -webkit-animation-timing-function: ease; -webkit-animation-delay: 0s; -ms-animation-duration: 2s; -ms-animation-name: cube-three; -ms-animation-iteration-count: 1; -ms-animation-timing-function: ease; -ms-animation-delay: 0s; -o-animation-duration: 2s; -o-animation-name: cube-three; -o-animation-iteration-count: 1; -o-animation-timing-function: ease; -o-animation-delay: 0s; animation-duration: 2s; animation-name: cube-three; animation-iteration-count: 1; animation-timing-function: ease; animation-delay: 0s; } .dice:hover .four, .dice:active .four, .dice-active .four { -moz-animation-duration: 2s; -moz-animation-name: cube-four; -moz-animation-iteration-count: 1; -moz-animation-timing-function: ease; -moz-animation-delay: 0s; -webkit-animation-duration: 2s; -webkit-animation-name: cube-four; -webkit-animation-iteration-count: 1; -webkit-animation-timing-function: ease; -webkit-animation-delay: 0s; -ms-animation-duration: 2s; -ms-animation-name: cube-four; -ms-animation-iteration-count: 1; -ms-animation-timing-function: ease; -ms-animation-delay: 0s; -o-animation-duration: 2s; -o-animation-name: cube-four; -o-animation-iteration-count: 1; -o-animation-timing-function: ease; -o-animation-delay: 0s; animation-duration: 2s; animation-name: cube-four; animation-iteration-count: 1; animation-timing-function: ease; animation-delay: 0s; } .dice:hover .five-six, .dice:active .five-six, .dice-active .five-six { -moz-animation-duration: 2s; -moz-animation-name: cube-five-six; -moz-animation-iteration-count: 1; -moz-animation-timing-function: ease; -moz-animation-delay: 0s; -webkit-animation-duration: 2s; -webkit-animation-name: cube-five-six; -webkit-animation-iteration-count: 1; -webkit-animation-timing-function: ease; -webkit-animation-delay: 0s; -ms-animation-duration: 2s; -ms-animation-name: cube-five-six; -ms-animation-iteration-count: 1; -ms-animation-timing-function: ease; -ms-animation-delay: 0s; -o-animation-duration: 2s; -o-animation-name: cube-five-six; -o-animation-iteration-count: 1; -o-animation-timing-function: ease; -o-animation-delay: 0s; animation-duration: 2s; animation-name: cube-five-six; animation-iteration-count: 1; animation-timing-function: ease; animation-delay: 0s; } .dice:hover .six, .dice:active .six, .dice-active .six { -moz-animation-duration: 4s; -moz-animation-name: cube-six; -moz-animation-iteration-count: 1; -moz-animation-timing-function: ease; -moz-animation-delay: 0s; -webkit-animation-duration: 4s; -webkit-animation-name: cube-six; -webkit-animation-iteration-count: 1; -webkit-animation-timing-function: ease; -webkit-animation-delay: 0s; -ms-animation-duration: 4s; -ms-animation-name: cube-six; -ms-animation-iteration-count: 1; -ms-animation-timing-function: ease; -ms-animation-delay: 0s; -o-animation-duration: 4s; -o-animation-name: cube-six; -o-animation-iteration-count: 1; -o-animation-timing-function: ease; -o-animation-delay: 0s; animation-duration: 4s; animation-name: cube-six; animation-iteration-count: 1; animation-timing-function: ease; animation-delay: 0s; } @-moz-keyframes cube { 0&#x25; { -moz-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); } 20&#x25; { -moz-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); } 40&#x25; { -moz-transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); } 60&#x25; { -moz-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); } 80&#x25; { -moz-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); } 100&#x25; { -moz-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); } } @-moz-keyframes cube-two { 0&#x25; { -moz-transform: rotateX(0deg); } 100&#x25; { -moz-transform: rotateX(-90deg); } } @-moz-keyframes cube-three { 0&#x25; { -moz-transform: rotateY(0deg); } 100&#x25; { -moz-transform: rotateY(-90deg); } } @-moz-keyframes cube-four { 0&#x25; { -moz-transform: rotateY(0deg); } 100&#x25; { -moz-transform: rotateY(90deg); } } @-moz-keyframes cube-five-six { 0&#x25; { -moz-transform: rotateX(0deg); } 100&#x25; { -moz-transform: rotateX(90deg); } } @-moz-keyframes cube-six { 0&#x25; { -moz-transform: rotateX(0deg); } 100&#x25; { -moz-transform: rotateX(90deg); } } @-webkit-keyframes cube { 0&#x25; { -webkit-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); } 20&#x25; { -webkit-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); } 40&#x25; { -webkit-transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); } 60&#x25; { -webkit-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); } 80&#x25; { -webkit-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); } 100&#x25; { -webkit-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); } } @-webkit-keyframes cube-two { 0&#x25; { -webkit-transform: rotateX(0deg); } 100&#x25; { -webkit-transform: rotateX(-90deg); } } @-webkit-keyframes cube-three { 0&#x25; { -webkit-transform: rotateY(0deg); } 100&#x25; { -webkit-transform: rotateY(-90deg); } } @-webkit-keyframes cube-four { 0&#x25; { -webkit-transform: rotateY(0deg); } 100&#x25; { -webkit-transform: rotateY(90deg); } } @-webkit-keyframes cube-five-six { 0&#x25; { -webkit-transform: rotateX(0deg); } 100&#x25; { -webkit-transform: rotateX(90deg); } } @-webkit-keyframes cube-six { 0&#x25; { -webkit-transform: rotateX(0deg); } 100&#x25; { -webkit-transform: rotateX(90deg); } } @-o-keyframes cube { 0&#x25; { -o-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); } 20&#x25; { -o-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); } 40&#x25; { -o-transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); } 60&#x25; { -o-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); } 80&#x25; { -o-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); } 100&#x25; { -o-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); } } @-o-keyframes cube-two { 0&#x25; { -o-transform: rotateX(0deg); } 100&#x25; { -o-transform: rotateX(-90deg); } } @-o-keyframes cube-three { 0&#x25; { -o-transform: rotateY(0deg); } 100&#x25; { -o-transform: rotateY(-90deg); } } @-o-keyframes cube-four { 0&#x25; { -o-transform: rotateY(0deg); } 100&#x25; { -o-transform: rotateY(90deg); } } @-o-keyframes cube-five-six { 0&#x25; { -o-transform: rotateX(0deg); } 100&#x25; { -o-transform: rotateX(90deg); } } @-o-keyframes cube-six { 0&#x25; { -o-transform: rotateX(0deg); } 100&#x25; { -o-transform: rotateX(90deg); } } @keyframes cube { 0&#x25; { -webkit-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); -moz-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); -ms-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); -o-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); } 20&#x25; { -webkit-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); -moz-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); -ms-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); -o-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg); } 40&#x25; { -webkit-transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); -moz-transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); -ms-transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); -o-transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); transform: rotateY(60deg) rotateX(230deg) rotateZ(144deg); } 60&#x25; { -webkit-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); -moz-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); -ms-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); -o-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg); } 80&#x25; { -webkit-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); -moz-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); -ms-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); -o-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg); } 100&#x25; { -webkit-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); -moz-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); -ms-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); -o-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg); } } @keyframes cube-two { 0&#x25; { -webkit-transform: rotateX(0deg); -moz-transform: rotateX(0deg); -ms-transform: rotateX(0deg); -o-transform: rotateX(0deg); transform: rotateX(0deg); } 100&#x25; { -webkit-transform: rotateX(90deg); -moz-transform: rotateX(90deg); -ms-transform: rotateX(90deg); -o-transform: rotateX(90deg); transform: rotateX(90deg); } } @keyframes cube-three { 0&#x25; { -webkit-transform: rotateY(0deg); -moz-transform: rotateY(0deg); -ms-transform: rotateY(0deg); -o-transform: rotateY(0deg); transform: rotateY(0deg); } 100&#x25; { -webkit-transform: rotateY(90deg); -moz-transform: rotateY(90deg); -ms-transform: rotateY(90deg); -o-transform: rotateY(90deg); transform: rotateY(90deg); } } @keyframes cube-four { 0&#x25; { -webkit-transform: rotateY(0deg); -moz-transform: rotateY(0deg); -ms-transform: rotateY(0deg); -o-transform: rotateY(0deg); transform: rotateY(0deg); } 100&#x25; { -webkit-transform: rotateY(-90deg); -moz-transform: rotateY(-90deg); -ms-transform: rotateY(-90deg); -o-transform: rotateY(-90deg); transform: rotateY(-90deg); } } @keyframes cube-five-six { 0&#x25; { -webkit-transform: rotateX(0deg); -moz-transform: rotateX(0deg); -ms-transform: rotateX(0deg); -o-transform: rotateX(0deg); transform: rotateX(0deg); } 100&#x25; { -webkit-transform: rotateX(-90deg); -moz-transform: rotateX(-90deg); -ms-transform: rotateX(-90deg); -o-transform: rotateX(-90deg); transform: rotateX(-90deg); } } @keyframes cube-six { 0&#x25; { -webkit-transform: rotateX(0deg); -moz-transform: rotateX(0deg); -ms-transform: rotateX(0deg); -o-transform: rotateX(0deg); transform: rotateX(0deg); } 100&#x25; { -webkit-transform: rotateX(-90deg); -moz-transform: rotateX(-90deg); -ms-transform: rotateX(-90deg); -o-transform: rotateX(-90deg); transform: rotateX(-90deg); } }

1

2

3

4

5

6

Firefox/Chrome では動作確認済み。Opera は[transform の 3D が未対応](http://caniuse.com/transforms3d)なので、動作しません。IE10 でも動きますが、何か変...

sass のコードは下記のような感じ。

```
@import "compass/css3/box-sizing";
@import "compass/css3/transform";

@mixin position($top:null,$right:null,$bottom:null,$left:null){
  @if($top){ top: $top }
  @if($right){ right: $right }
  @if($left){ left: $left }
  @if($bottom){ bottom: $bottom }
}

* {
  @include box-sizing(border-box);
}

.dice {
  @include transform-style(preserve-3d);
  @include perspective(1000px);
  @include perspective-origin(50&#x25; 50&#x25;);

  position: relative;
  width: 400px;
  height: 400px;

  > div,
  .five,.six {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    background-color: rgba(158,158,158,0.1);
    line-height: 100px;
    text-align: center;
  }

  .one {
    @include position(100px,null,null,200px);
  }

  .two {
    @include position(0,null,null,200px);
    @include transform-origin(bottom,left);
    border-bottom: none;
  }

  .three {
    @include position(100px,null,null,300px);
    @include transform-origin(top,left);
    border-left: none;
    .inner {
      @include transform(rotateZ(90deg));
    }
  }

  .four {
    @include position(100px,null,null,100px);
    @include transform-origin(top,right);
    border-right: none;
    .inner {
      @include transform(rotateZ(-90deg));
    }
  }

  .five-six {
    @include position(200px,null,null,200px);
    @include transform-origin(top,left);
    border: none;
    background: transparent;
    height: 200px;
    @include transform-style(preserve-3d);
  }

  .five {
    @include position(0,null,null,0);
    border-top: none;
    border-bottom: none;
    .inner {
      @include transform(rotateZ(180deg));
    }
  }

  .six {
    @include position(100px,null,null,0);
    @include transform-origin(top,left);
    .inner {
      @include transform(rotateZ(180deg));
    }
  }

}

.dice:hover,
.dice:active,
.dice-active {
  @each $vendor in -moz-,-webkit-,-ms-,-o-,null {
    #{$vendor}animation-duration: 5s;
    #{$vendor}animation-name: cube;
    #{$vendor}animation-iteration-count: infinite;
    #{$vendor}animation-timing-function: linear;
  }

  .two {
    @include transform(rotateX(-90deg));
  }

  .three {
    @include transform(rotateY(-90deg));
  }

  .four {
    @include transform(rotateY(90deg));
  }

  .five-six {
    @include transform(rotateX(90deg));

  }

  .six {
    @include transform(rotateX(90deg));
  }

  @each $num in two,three,four,five-six {
    .#{$num} {
      @each $vendor in -moz-,-webkit-,-ms-,-o-,null {
        #{$vendor}animation-duration: 2s;
        #{$vendor}animation-name: cube-#{$num};
        #{$vendor}animation-iteration-count: 1;
        #{$vendor}animation-timing-function: ease;
        #{$vendor}animation-delay: 0s;
      }
    }
  }

    .six {
      @each $vendor in -moz-,-webkit-,-ms-,-o-,null {
        #{$vendor}animation-duration: 4s;
        #{$vendor}animation-name: cube-six;
        #{$vendor}animation-iteration-count: 1;
        #{$vendor}animation-timing-function: ease;
        #{$vendor}animation-delay: 0s;
      }
    }
}

  @-moz-keyframes cube {
    0&#x25; { -moz-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg) }
    20&#x25; { -moz-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg) }
    40&#x25; { -moz-transform:rotateY(60deg) rotateX(230deg) rotateZ(144deg) }
    60&#x25; { -moz-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg) }
    80&#x25; { -moz-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg) }
    100&#x25; { -moz-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg) }
  }

  @-moz-keyframes cube-two {
    0&#x25; { -moz-transform: rotateX(0deg) }
    100&#x25;{ -moz-transform: rotateX(-90deg) }
  }

  @-moz-keyframes cube-three {
    0&#x25; { -moz-transform: rotateY(0deg) }
    100&#x25;{ -moz-transform:rotateY(-90deg) }
  }

  @-moz-keyframes cube-four {
    0&#x25;{ -moz-transform: rotateY(0deg) }
    100&#x25;{ -moz-transform: rotateY(90deg) }
  }

  @-moz-keyframes cube-five-six {
    0&#x25;{ -moz-transform: rotateX(0deg) }
    100&#x25;{ -moz-transform: rotateX(90deg) }
  }

  @-moz-keyframes cube-six {
    0&#x25;{ -moz-transform: rotateX(0deg) }
    100&#x25;{ -moz-transform: rotateX(90deg) }
  }

  @-webkit-keyframes cube {
    0&#x25; { -webkit-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg) }
    20&#x25; { -webkit-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg) }
    40&#x25; { -webkit-transform:rotateY(60deg) rotateX(230deg) rotateZ(144deg) }
    60&#x25; { -webkit-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg) }
    80&#x25; { -webkit-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg) }
    100&#x25; { -webkit-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg) }
  }

  @-webkit-keyframes cube-two {
    0&#x25; { -webkit-transform: rotateX(0deg) }
    100&#x25;{ -webkit-transform: rotateX(-90deg) }
  }

  @-webkit-keyframes cube-three {
    0&#x25; { -webkit-transform: rotateY(0deg) }
    100&#x25;{ -webkit-transform:rotateY(-90deg) }
  }

  @-webkit-keyframes cube-four {
    0&#x25;{ -webkit-transform: rotateY(0deg) }
    100&#x25;{ -webkit-transform: rotateY(90deg) }
  }

  @-webkit-keyframes cube-five-six {
    0&#x25;{ -webkit-transform: rotateX(0deg) }
    100&#x25;{ -webkit-transform: rotateX(90deg) }
  }

  @-webkit-keyframes cube-six {
    0&#x25;{ -webkit-transform: rotateX(0deg) }
    100&#x25;{ -webkit-transform: rotateX(90deg) }
  }

  @-o-keyframes cube {
    0&#x25; { -o-transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg) }
    20&#x25; { -o-transform: rotateY(30deg) rotateX(180deg) rotateZ(72deg) }
    40&#x25; { -o-transform:rotateY(60deg) rotateX(230deg) rotateZ(144deg) }
    60&#x25; { -o-transform: rotateY(90deg) rotateX(280deg) rotateZ(236deg) }
    80&#x25; { -o-transform: rotateY(180deg) rotateX(300deg) rotateZ(298deg) }
    100&#x25; { -o-transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg) }
  }

  @-o-keyframes cube-two {
    0&#x25; { -o-transform: rotateX(0deg) }
    100&#x25;{ -o-transform: rotateX(-90deg) }
  }

  @-o-keyframes cube-three {
    0&#x25; { -o-transform: rotateY(0deg) }
    100&#x25;{ -o-transform:rotateY(-90deg) }
  }

  @-o-keyframes cube-four {
    0&#x25;{ -o-transform: rotateY(0deg) }
    100&#x25;{ -o-transform: rotateY(90deg) }
  }

  @-o-keyframes cube-five-six {
    0&#x25;{ -o-transform: rotateX(0deg) }
    100&#x25;{ -o-transform: rotateX(90deg) }
  }

  @-o-keyframes cube-six {
    0&#x25;{ -o-transform: rotateX(0deg) }
    100&#x25;{ -o-transform: rotateX(90deg) }
  }

  @keyframes cube {
    0&#x25; { @include transform(rotateY(0deg) rotateX(0deg) rotateZ(0deg)) }
    20&#x25; { @include transform(rotateY(30deg) rotateX(180deg) rotateZ(72deg)) }
    40&#x25; { @include transform(rotateY(60deg) rotateX(230deg) rotateZ(144deg)) }
    60&#x25; { @include transform(rotateY(90deg) rotateX(280deg) rotateZ(236deg)) }
    80&#x25; { @include transform(rotateY(180deg) rotateX(300deg) rotateZ(298deg)) }
    100&#x25; { @include transform(rotateY(360deg) rotateX(360deg) rotateZ(360deg)) }
  }

  @keyframes cube-two {
    0&#x25; { @include transform(rotateX(0deg)) }
    100&#x25;{ @include transform(rotateX(90deg)) }
  }

  @keyframes cube-three {
    0&#x25; { @include transform(rotateY(0deg)) }
    100&#x25;{ @include transform(rotateY(90deg)) }
  }

  @keyframes cube-four {
    0&#x25;{ @include transform(rotateY(0deg)) }
    100&#x25;{ @include transform(rotateY(-90deg)) }
  }

  @keyframes cube-five-six {
    0&#x25;{ @include transform(rotateX(0deg)) }
    100&#x25;{ @include transform(rotateX(-90deg)) }
  }

  @keyframes cube-six {
    0&#x25;{ @include transform(rotateX(0deg)) }
    100&#x25;{ @include transform(rotateX(-90deg)) }
  }

```

vendor prefix のせいもありやたら長いですが、やっていることは全体をてきとうに回転させつつ、サイコロの各面の要素を 90 度に回転させているだけです。あとは、各面の接しているところが離れないように transform-origin を設定していたりとか、「5」と「6」は二面を 90 度に曲げたあとに「6」だけさらに 90 度曲げるために、five-six という親 div を用意してそこに 3D rendering context を別途生成しています。でも、そのくらい。

という感じ。実用的かどうかはさておき、いつの間にか CSS だけでここまでできるようになっていて、いろいろすごい。隔世の感があります。

CSS Transforms 関連記事
