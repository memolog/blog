---
title: Hello Hexo
date: 2017-12-30
featured:
    image: hello-hexo.webp
    author: chatGPT
excerpt: "Gatsby はなかなかに高機能で素晴らしく、React、GraphQL、PWAなど技術的なプレイグラウンドとしても魅力的だったのだけど、結局Hexoにすることにした。"
---

[Gatsby](https://www.gatsbyjs.org/) はなかなかに高機能で素晴らしく、React、GraphQL、PWA など技術的なプレイグラウンドとしても魅力的だったのだけど、結局[Hexo](https://hexo.io/)にすることにした。

[Gatsby](https://www.gatsbyjs.org/) は高機能ゆえにたとえばデザインを少し変えたいというときに、[Typography](http://kyleamathews.github.io/typography.js/) の実装上でどう変更するかを調べる必要があったり、[react-responsive-grid](https://github.com/KyleAMathews/react-responsive-grid) とかバンドルされてる React Component がどんな実装になっているかを確認したりとか、とにかく面倒くさい。この最初のラーニングカーブを乗り切ってしまえば便利なのかもしれないけど、メモ書きサイトを作るのにあまり時間をかけたくない（でもデザインは調整したい）という目的には、どうもオーバースペック感があった。あと public に生成されるファイルが変に多くて把握しにくいし、LightHouse の Performance のスコアも 70 前後（十分だけど）なのが少し気になった。

なので、何か別のスタティックサイトジェネレーターを使おうと思っていろいろ探した。[preact cli](https://github.com/developit/preact-cli) からのサイト生成も良さそうだったけど、この状態から個別のページを生成する実装を作るのはだいぶ面倒くさそうだったので諦めた。[jekyll](https://jekyllrb.com/) は必要十分な感じはあるけど実装が Ruby なので、できれば Node.js で実装されているものを使いたい。

それで結局[Hexo](https://hexo.io/) を試している。今のところ簡単にスタティックサイトを作成したい（学習コストは低めに）という目的に十分あっているような気はしている。

Hexo のインストールと公開はとりたてていうことがないくらい簡単で、`npm install -g hexo-cli` で CLI をインストールしたあとで

```bash
hexo init hexo-site
```

でサイトを新規作成し、作成したサイトを Github で作成した新規レポジトリに割り当てして、

```bash
git init
git remote add origin git@github.com:memolog/site.git
git add .
git commit
git push origin master
```

Github Pages 用のデプロイヤーをインストール

```bash
yarn add hexo-deployer-git --save
```

して、\_config.yml の deploy の箇所の repo 欄にレポジトリの URL を追加して、

```bash
hexo deploy -g
```

しただけである。

そのあとは、デフォルトで入ってた landscape のテーマをコピーして、以前に使おうと思って作成していた HTML と CSS をそのまま適用させただけである。Microdata とか今どき必要なのかは不明ではあるが、そのあたりの修正とかはそのうちにやろうと思っている。リソースの最適化もそのうちやるであろうけど、現時点では何もしなくても大丈夫な感は大いにある。Author の情報とかは少しは必要かなと思っている。

あとは `yarn add hexo-prism-plugin --save` してコードのハイライトを prism にしたくらいかな。

ejs のフォーマットは初めて利用するので、少し変な感じはあるけれど、このくらいの学習は全く問題ない。やはり始めるときはこのくらいの手軽さがいいなと思う。
