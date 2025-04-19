---
title: Primitive Image についてもう一度
date: 2025-04-19 13:00
featured:
    image: tomoko-uji-gJQoYqpqkhY-unsplash-svg
    author: TOMOKO UJI
    authorLink: https://unsplash.com/ja/@ujitomo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
excerpt: "最近まで使っていたPrimitiveを使ったSVGの実装を見直して、WebP画像とどちらが良いかなと比較。"
---
最近まで使っていた[Primitiveを使って画像を変換する](/2018/image-manipulation-with-primitive.html)とか[Primitiveの変換をまとめて行う](/2018/convert-multiple-primitive-images-at-once.html)の実装を見直しつつ、WebP画像とどちらが良いかなと比較。[primitive_bulk_output](https://github.com/memolog/primitive_bulk_output)の実装も何年かぶりに変更して、リサイズしてからSVGを生成するようにしたり、最後にファイルサイズを最適化して出力するようにしました。

オリジナル画像を単純にリサイズして WebP に変換すると、通常サイズで約 29KB、@2x の高解像度用だと約 66KBになる。WebP は同じ画像サイズでも、内容によってファイルサイズにばらつきがあり、@2x の場合は 50KB〜400KB くらいと幅がある。
<img src="/assets/images/tomoko-uji-gJQoYqpqkhY-unsplash/tomoko-uji-gJQoYqpqkhY-unsplash.webp" class="screenshot" />

以下は、Primitive で `n（シェイプの数）= 300` に設定して作成した SVG 画像で、Featured Image として使っているもの。サイズは約 52KB。Primitive の SVG は、画像の内容にも左右されるけど、ファイルサイズに最も影響を与えるのは `n` の値。`n` が同じなら、画像内容に関係なくファイルサイズはほぼ一定になる。
<img src="/assets/images/tomoko-uji-gJQoYqpqkhY-unsplash-svg/tomoko-uji-gJQoYqpqkhY-unsplash-svg.svg" class="screenshot" />

`n`が`1000`の場合は174KB。
<img src="/assets/images/tomoko-uji-gJQoYqpqkhY-unsplash-svg/tomoko-uji-gJQoYqpqkhY-unsplash_n1000.svg" class="screenshot" />

`n`が`2000`の場合。347KB。
<img src="/assets/images/tomoko-uji-gJQoYqpqkhY-unsplash-svg/tomoko-uji-gJQoYqpqkhY-unsplash_n2000.svg" class="screenshot" />

ファイルサイズだけで見れば、Primitive で作った SVG の方が安定していて扱いやすい。でも、400KB くらいのサイズなら WebP の方がクオリティと容量のバランスが良いかもしれない。

`n = 300` の Primitive SVG の、ディテールが少し削がれてる感じもわりと好き。ただ、Primitive は生成に時間がかかるし、m（モード）によって印象も大きく変わる。単に画像を切り取るだけとは違って、それなりに手間もある。

オリジナル画像をそのまま使うのはどうかな…という迷いもあるけど、やっぱり映えるのはオリジナル画像かもしれない。

というメモ。