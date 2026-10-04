---
title: contrast-color() が Safari (Beta) で利用可能になる
featured:
  image: css-contrast-color-function-in-safari.webp
  author: chatGPT
  color: "#f1e6c3"
date: 2025-06-19 06:00
excerpt: "contrast-color()は CSS Color Module Level 5 で定義されている新しい関数の一つで、白か黒のどちらかの色を、背景色に対してコントラストの高い方を自動的に選ぶというもの。アクセシビリティの基準を達成する上で、文字色と背景色のコントラスト比は基本的な項目なので、それがCSSで解決できるようになるのは嬉しい。"
---

[WebKit in Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/#css)にて、Safari 26 beta で追加されるいろんな新機能について紹介されている。その中のひとつが [contrast-color()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color) の対応。これは [CSS Color Module Level 5](https://www.w3.org/TR/css-color-5/) で定義されている新しい関数の一つで、白か黒のどちらかの色を、背景色に対してコントラストの高い方を自動的に選ぶというもの。アクセシビリティの基準を達成する上で、文字色と背景色のコントラスト比は基本的な項目なので、それがCSSで解決できるようになるのは嬉しい。

`contrast-color()`は以下のような感じで背景色となる色を指定する。

```css
:root {
  --brand-color: rebeccapurple;
}

h1 {
  background-color: var(--brand-color);
  color: contrast-color(var(--brand-color));
}
```
すると、背景色の`--brand-color`が暗い色なら白、明るい色なら黒が選ばれる。

コントラスト比をどう算出するのかは、 [WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum#dfn-contrast-ratio) に書かれている以下のような仕様に準じているらしい。

> (L1 + 0.05) / (L2 + 0.05), where
>
> * L1 is the relative luminance of the lighter of the colors, and
> * L2 is the relative luminance of the darker of the colors.

L1が明るい方の色で、L2が暗い色の方。文字色が白の場合はL1が文字色になってL2が背景色になる。黒の場合はその逆という仕組み。

relative luminance （相対輝度（きど））は、[relative luminance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum#dfn-relative-luminance)に計算方法が記載されている。

> For the sRGB colorspace, the relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
>
> * if RsRGB <= 0.04045 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
> * if GsRGB <= 0.04045 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
> * if BsRGB <= 0.04045 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
>
> and RsRGB, GsRGB, and BsRGB are defined as:
>
> * RsRGB = R8bit/255
> * GsRGB = G8bit/255
> * BsRGB = B8bit/255

計算的には文章の下から上に処理していく感じで、sRGBの各色の値（0から255）を255で割って、`RsRGB`という0から1までの値に変換する。値が0.04045以下だったら 12.92 で割って、0.04045より上だったら `((RsRGB+0.055)/1.055) ^ 2.4` みたいな計算をする。各色で同じ計算をしたら、`L = 0.2126 * R + 0.7152 * G + 0.0722 * B` で合計して相対輝度が求まる。

ただ、`contrast-color()`は白か黒のうちコントラスト比の高い方の色を選んでいるだけで、コントラスト比がアクセシビリティの基準を超えているかどうかを保証しているわけではないので、そこは留意する必要がある（アクセシビリティの[コントラスト比の基準（AA）](https://www.w3.org/TR/WCAG22/#contrast-minimum)は通常のフォントサイズの場合、4.5に規定されている）。[MDNのcontrast-color()の説明](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color)にもそんなことが書いてある。

> Warning: There is no guarantee that the values returned using the contrast-color() function will produce an accessible result. Mid-tone background colors generally don't provide enough contrast. It is recommended therefore to use light or dark colors with the contrast-color() function.

また、[How to have the browser pick a contrasting color in CSS](https://webkit.org/blog/16929/contrast-color/)のページでは、WCAGのコントラスト比の計算アルゴリズムが、`#317CFF` のような色で算出した場合に、直観とは異なる結果となることを例としてあげている。見た目には白文字のほうがはっきり読めそうでも、計算上は黒文字のほうがコントラスト比が高いと判定されてしまう。アルゴリズムに関しては[WCAG 3](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/)では、[APCA (Accessible Perceptual Contrast Algorithm)](https://github.com/Myndex/SAPC-APCA)という、より人間の知覚に沿った新しい算出アルゴリズムを採用するかもしれないそうで、将来的には改善の見込みがあるようです。

というメモ。