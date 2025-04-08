---
title: Primitiveを使って画像を変換する
date: 2018-01-14 06:44:06
featured:
  author: Rommanas Kongmeng
  image: rommanas-kongmeng-422586
  authorLink: https://unsplash.com/photos/yGIuVb3Pr_k?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
excerpt: Featured Image とか言いながら、ただ写真を置くだけなのも何だなあとか思い、Primitiveを使用して、上に表示されている画像を変換してみた。Primitive は画像を幾何学的な Primitive（線とか丸、三角、四角）の集まりに変換してくれる。試行錯誤した結果を貼り付けていく。画像の下に変換するときに使用したオプションを添付してある。
---

Featured Image とか言いながら、ただ写真を置くだけなのも何だなあとか思い、[Primitive](https://github.com/fogleman/primitive)を使用して、上に表示されている画像を変換してみた。Primitive は画像を幾何学的な Primitive（線とか丸、三角、四角）の集まりに変換してくれる。試行錯誤した結果を貼り付けていく。画像の下に変換するときに使用したオプションを添付してある。

## オリジナル画像

オリジナル画像はこちら

![](/assets/images/rommanas-kongmeng-422586/rommanas-kongmeng-422586_medium.jpg)

## 変換例

![](/assets/images/rommanas-kongmeng-422586_m6_n2000/rommanas-kongmeng-422586_m6_n2000_medium.jpg)
`-n 2000 -m 6` -n は`number of shapes`で、使用する Primitive の数を設定できる。ベジェ(mode=6)の場合、-n
が 2000 だとラフスケッチ的というかまあまあ原形がわかる雰囲気になる。処理は結構時間かかる。

![](/assets/images/rommanas-kongmeng-422586_m6_n1000/rommanas-kongmeng-422586_m6_n1000_medium.jpg)

`-n 1000 -m 6` -n が 1000 だとだいぶ抽象化が上がる感じ。個人的には好きなバランスで収まっている。

![](/assets/images/rommanas-kongmeng-422586_m6_n300/rommanas-kongmeng-422586_m6_n300_medium.jpg)
`-n 300 -m 6` -n が 300 になるとだとだいぶ謎な感じになる。嫌いではない。Featured
Image ならこのくらい謎でも良いような気がしている。

![](/assets/images/rommanas-kongmeng-422586_m6_n2000_bgffffff/rommanas-kongmeng-422586_m6_n2000_bgffffff_medium.jpg)
`-n 2000 -m 6 -bg ffffff`

-bg は`starting background color (hex)`で背景色になる。背景を指定していない場合と比べ、背景全体的に線が描かれてだいぶごちゃっとした感じになる。

![](/assets/images/rommanas-kongmeng-422586_m6_n1000_bgffffff/rommanas-kongmeng-422586_m6_n1000_bgffffff_medium.jpg)
`-n 1000 -m 6 -bg ffffff`

線の数が少ない状態で背景色を選ぶと、背景の描画に表現力がなくなり、もはや何だかわからない感じになる。

![](/assets/images/rommanas-kongmeng-422586_m6_n300_rep50/rommanas-kongmeng-422586_m6_n300_rep50_medium.jpg)
` -n 300 -m 6 -rep 50` rep のオプションは`add N extra shapes each iteration with
reduced search (mostly good for beziers)`とあり、-n で設定した shape それぞれで追加の
shape を入れてくれる。ので、処理量を減らしつつ書き込みを増やすことができる。

![](/assets/images/rommanas-kongmeng-422586_m6_n300_rep50_bgffffff/rommanas-kongmeng-422586_m6_n300_rep50_bgffffff_medium.jpg)
`-n 300 -m 6 rep 50 -bg ffffff` 背景の白が混じるので、少しデコボコっとした印象になる。

![](/assets/images/rommanas-kongmeng-422586_m6_n400_rep5/rommanas-kongmeng-422586_m6_n400_rep5_medium.jpg)
`-n 400 -m 6 -rep 5`

-n 2000 の画像

![](/assets/images/rommanas-kongmeng-422586_m6_n2000/rommanas-kongmeng-422586_m6_n2000_medium.jpg)
と比較すると、だいぶ似ているけどけど細部の表現力は劣る感じはある。400 の場合が 65
秒で、2000 の場合が 257 秒なので、処理はまあまあ早くなる（`-n 50 -rep 40`だと 18
秒だけど表現色は多少落ちる）。

![](/assets/images/rommanas-kongmeng-422586_m0_n400/rommanas-kongmeng-422586_m0_n400_medium.jpg)
`-n 400 -m 0` combo（丸三角四角のミックス）を使った例。

![](/assets/images/rommanas-kongmeng-422586_m3_n400/rommanas-kongmeng-422586_m3_n400_medium.jpg)
`-n 400 -m 3` ellipse（長円）を使った例。ちょっと合わないかなあという感じはある。見慣れてくると逆にありかもと思うときもあるので、何とも言えないけど。

![](/assets/images/rommanas-kongmeng-422586_m1_n400/rommanas-kongmeng-422586_m1_n400_medium.jpg)
`-n 400 -m 1` triangle を使った例。

## Primitive 所感

背景がシンプルな画像の方がわりと綺麗にいくように感じた。建物とか細かい描写があると写実さと抽象さみたいなところのバランスが悪い感じになる。サンプルを見ると背景にグラデーションがあるのも良さそうに見える。

写真の対象が鋭角なものは triangle にするなど、対象の形にあった mode を使うと綺麗にいきやすい気はする（一方でそれをあえて外してみると良い時もありそうなので何とも言い難いけど）。

多くの場合、オリジナルの写真の方がやっぱり良いなと感じた。写実性を残しすぎるとオリジナルの方が勝り、抽象度を上げすぎると何の写真だかさっぱりわからんという点でなかなか調整が難しい。

Primitive を使用した画像のサンプルは[@PrimitivePic](https://twitter.com/PrimitivePic)がたくさんアップロードしているので、参考になるかもしれない。

## Primitive のインストール

Primitive は Go で動作するアプリケーションなので、Go がなければまず Go をインストールする必要がある。自分は[HomeBrew](https://brew.sh/)でインストールした。

```bash
brew update
brew install go
```

その後、Primitive をインストール

```bash
go get -u github.com/fogleman/primitive
```

インストール先のパスが通ってなかったので.bash_profile に PATH を追加

```bash
export PATH=$PATH:/Users/USERNAME/go/bin
```

## 実行時間の計測

下記のように行った。

```bash
start_time=`date +%s` && \
primitive -i rommanas-kongmeng-422586.jpg -r 256 -o rommanas-kongmeng-422586-beziers13.jpg -n 50 -m 6 -rep 40 -s 1500 && \
end_time=`date +%s` && \
time=$((end_time - start_time)) && \
echo $time
```

以上。
