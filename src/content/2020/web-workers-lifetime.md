---
title: The Web Worker's lifetime
featured:
  image: harley-davidson-4ixHdlcROPI-unsplash
  author: Harley-Davidson
  authorLink: https://unsplash.com/@harleydavidson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2020-02-13 20:17:00
excerpt: "Web Worker（以下worker）はいつ止まるのか。端的に言うと、画面遷移した時など、関連するDocumentがなくなった時に止まる。workerの実行は`closing`フラグで管理されていて、このフラグがtrueになるとworkerはそれ以降の処理をしなくなる。workerのインスタンスが削除されるかどうかは仕様上では考慮されていない雰囲気だけど（ガベージコレクトされたときに削除されるのではなかろうか）、とにかく、実質的に、closingフラグがtrueになったタイミングでworkerは止まると言える。"
---

Web Worker（以下 worker）はいつ止まるのか。端的に言うと、画面遷移した時など、関連する Document がなくなった時に止まる。worker の実行は`closing`フラグで管理されていて、このフラグが true になると worker はそれ以降の処理をしなくなる。worker のインスタンスが削除されるかどうかは仕様上では考慮されていない雰囲気だけど（ガベージコレクトされたときに削除されるのではなかろうか）、とにかく、実質的に、closing フラグが true になったタイミングで worker は止まると言える。

[The worker's lifetime](https://www.w3.org/TR/workers/#the-worker-s-lifetime)には、Worker がどのように他の Worker や Document と関係を持つかが記載されている。端的には、worker は関係する Document や、関係する他の worker のポートのリストを持っている。

それで関係してる Document の状態によって、Worker の呼び名（状態）が定義されている。Shared Worker については記述が煩雑になるので省略。

- **permissible worker**: 何らかの Document と関係している場合（リストが空ではない）
- **active needed worker**: 関係する Document のいずれかが `fully active` である場合
- **protected worker**: worker が active needed worker であり、かつ、以下のいずれかの状態である
  - 未処理のタイマー、DB トランザクション、ネットワーク接続を持っている
  - Worker のポートが空ではない
- **suspendable worker**: active needed worker ではないが permissible worker である場合

[fully active](https://html.spec.whatwg.org/multipage/browsers.html#fully-active)は端的に言うと現在利用中の状態であることだから、worker と関連したページが移動したり閉じられたりしなければ、worker は「active needed worker」の状態を保つことになる。suspendable worker は、関係している Document がすべて現在利用中（fully active）ではない場合になる。

そして[Processing model](https://www.w3.org/TR/workers/#processing-model)の 10 番目と 11 番目に以下のように記述されている。

> **10\. Closing orphan workers:** Start monitoring the worker such that no sooner than it stops being a protected worker, and no later than it stops being a permissible worker, worker global scope's closing flag is set to true.

> **11\. Suspending workers:** Start monitoring the worker, such that whenever worker global scope's closing flag is false and the worker is a suspendable worker, the user agent suspends execution of script in that worker until such time as either the closing flag switches to true or the worker stops being a suspendable worker.

仕様は Shared Worker が考慮された記述なのでわかりにくいのだけど、つまり、関連するドキュメントがなくなり worker が孤立（orphan）したと判定されたら、worker の closing フラグが true になる。

suspendable 状態の worker は suspendable 状態から復帰（関連している Document が fully active に戻る）するまではスクリプトの処理を一時中断する。

そしてそして[The event loop](https://www.w3.org/TR/workers/#the-event-loop)には、closing フラグが true になったら以降の処理の実行はされなくなる旨が書かれている。

> Once the WorkerGlobalScope's closing flag is set to true, the event loop's task queues must discard any further tasks that would be added to them (tasks already on the queue are unaffected except where otherwise specified). **Effectively, once the closing flag is true, timers stop firing, notifications for all pending background operations are dropped, etc.**

というメモ。
