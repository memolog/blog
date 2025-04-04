---
title: Genarate Anki Cards Tool
featured:
  image: kate-krivanec-212730-unsplash
  author: Kate Krivanec
  authorLink: https://unsplash.com/photos/moW-dSe5CiU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2019-01-04 11:47:48
excerpt: "最近Ankiを使って単語の記憶をしようという試みをしている。もともとはFluent Foreverという本に載っていたところからこのアプリを知った（最近になって邦訳「脳が認める外国語勉強法」があると知った）。"
---

最近[Anki](https://apps.ankiweb.net/)を使って単語の記憶をしようという試みをしている。もともとは[Fluent Forever](https://fluent-forever.com/book/)という本に載っていたところからこのアプリを知った（最近になって邦訳「[脳が認める外国語勉強法](https://amzn.to/2F35KpT)」があると知った）。

最初は英語とその日本語訳を入れたシンプルなカードを作ろうとしていたのですが、なんとなく味気ないなとということで、画像を追加したり、音声を追加してみたりと色々しているうちに、手作業でやるのがしんどいなということになり、[generate-anki-cards](https://github.com/memolog/generate-anki-cards)というツールを作成してみた。他の人に使ってもらいたい意図もなく、npm ツールとしては公開する必要性がまったくないのですが、なんとなくついでだったので npm にも公開[generate-anki-cards - npm](https://www.npmjs.com/package/generate-anki-cards)。npm でインストールできる。

```bash
npm install -g generate-anki-cards
```

下のような CSV を用意して、

```csv
apple,リンゴ
banana,バナナ
cherry,さくらんぼ
```

```bash
generate-anki-cards -i ./data.csv -o ./out
```

みたいに実行すると、Puppeteer で[Cambridge Dictionary](https://dictionary.cambridge.org/dictionary/english/apple) のサイトにアクセスして、データがあれば、画像と音声データをダウンロードして保存します。Anki で実際に利用する場合は、collection.media フォルダにそれらをコピーする必要がある（参考：[File Locations](https://apps.ankiweb.net/docs/manual.html#files)）。

Cambridge Dictionary に画像または音声データがない場合は、[Google Translate](https://translate.google.com/) のサイトから音声データを取得したり、Unsplash からダウンロードしたりします。Google Translate に Puppeteer で音声データを取得するより、[CLOUD TEXT-TO-SPEECH](https://cloud.google.com/text-to-speech/)を使う方が良いのかなという思いはありつつ、大量にアクセスするようなものでもないし、とりあえずそのまま。Unsplash についても API を使うべきと思いつつ、Puppeteer でアクセスしてダウンロードしている。個人利用だし、単語リストの元になる CSV ファイルは公開してないので、、このくらいは良いかなと...

なんやかんやで作成した読み込みファイルを使って Anki カードを作成した結果がこんな感じ。
{% youtube id=zRsiGZloIaY title="he screen cast to describe how to work Anki cards with my 'generate-anki-cards' cli tool" %}

なんやかんやで作りながら紆余曲折してしまったので、この年末年始の時間をだいぶ費やしてしまったけど、wikipedia や weblio からもデータの取得が可能で、こんな風に英語以外の暗記でも使える。使うかどうかはわからないけど。

![](/assets/images/screen_anki.png)

というメモ。
