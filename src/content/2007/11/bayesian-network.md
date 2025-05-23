---
title: 本：ベイジアンネットワーク技術
date: 2007-11-04T17:30:00.000Z
categories:
  - 本
tags:
  - book
excerpt: " 副題は「ユーザ・顧客のモデル化と不確実性推論」。「ベイジアンネットワーク」とは何かを解説した本で、初めにベイジアンネットワークの理論的な基礎を解説した後に、ユーザーモデル、関連ソフトウェアの紹介、人間のモデル化から「ユーザー適応システム」への取り組みの紹介など、基礎から応用まで幅広くあつかっています。分量的には160ページ程度ですが、理解するのに時間がかかりました。わたしは最初の基礎部分をじっくり読んで、最後の応用事例は軽く読み流す感じで読みました。"
---

副題は「ユーザ・顧客のモデル化と不確実性推論」。「ベイジアンネットワーク」とは何かを解説した本で、初めにベイジアンネットワークの理論的な基礎を解説した後に、ユーザーモデル、関連ソフトウェアの紹介、人間のモデル化から「ユーザー適応システム」への取り組みの紹介など、基礎から応用まで幅広くあつかっています。分量的には 160 ページ程度ですが、理解するのに時間がかかりました。わたしは最初の基礎部分をじっくり読んで、最後の応用事例は軽く読み流す感じで読みました。

ベイジアンネットワークとは「複数の確率変数の間の定性的な依存関係をグラフ構造によって表し、個々の変数の間の定量的な関係を条件付き確率で表した確率モデル（p10）」です。自分の言葉に置き換えて言うならば「原因と要因をつなげてグラフ化して、多方向的に推測しまくる技術」という感じでしょうか。

ベイジアンネットワークの特徴は確率的推論を再帰的に行い値を導きだすというところ。たとえば A（親ノード）→B→C（子ノード）という事象があったとして、B の値を計算しようとする場合、A から B に与えられる観測可能な情報と、B から C に与えらえる観測可能な情報から、B の取りうる値を条件付き確率表として導出する。たとえば親ノードの上にさらに親ノードがある場合は、再帰的に計算をしていくことで確率分布を更新していく。ベイジアンネットワーク内でつながりのある変数から観測できる情報を元にどんどん計算して、知りたい情報の確率分布を更新していくから、情報の精度が高くなる（ということなのだと思う）。

応用例のひとつとして、プリンタの診断モデルが上げられている。たとえば紙送りモータの状態を知りたい場合、「紙送りモータの電流」「用紙通過時間」「紙送りモータの振動」、親ノードの親ノードの「紙送りモーターオン信号」などからもっともありうる状態を推測する。たとえばユーザーの FAQ なんかでも、ユーザーの知識レベルや、よく閲覧する FAQ、タスクの難易度などから、必要な情報が何かを推測することで、よりユーザーが欲しい FAQ 情報を表示することができるようになる、かもしれない。

難しいのは、ベイジアンネットワークのモデル構築であり、ユーザーの行動がなぜ行われたのかを推測するための要因・結果のつながりをどのように定めていくかというところ。本書の後半では、ユーザーの行動から、今欲しい情報が何かを推測するという、人間のモデル化から「ユーザー適応システム」への応用までを取り上げています。認知科学とか行動科学とかの領域に足を踏み入れていく感じ。

[アンビエント・ファインダビリティ](/2007/08/post_143/)では、情報の発見のしやすさが今後重要性を増していくと語られていました。ユーザーがタイムリーに欲しいと思う情報を推測する技術として、ベイジアンネットワーク技術がこれからますます注目されていくだろうと本書を読んで感じました。モデルの構築がすごく大変な感じで、たぶんそれを専門に行うようなチームが存在しないと、技術の導入はなかなか難しいかなとは思いますけど。
