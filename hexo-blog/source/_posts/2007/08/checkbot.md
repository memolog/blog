---
title: Checkbot &#x3a; ウェブページのリンクを自動チェックしてくれるツール
date: 2007-08-18T10:07:29.000Z
categories:
- web
tags:
- tool
---
*   [Checkbot](http://degraaff.org/checkbot/)

Checkbot はウェブページのリンクを自動でチェックしてくれるツールです。ウェブページ上のリンク切れとかを探すのときに役立ちます。

<!-- more -->

Macへのインストールは簡単で、ファイルをダウンロードして解凍したのちに、ターミナル開いてperl Makefile.PL、make、make installをするだけです。いくつか依存モジュールが存在しますが、Mekefile.PLを実行したときに教えてくれます。

実際の動きとしては、HTTP で返ってきたレスポンスを集計している感じです。401とか301とか404などなど。checkbotではそれに加えて、下記のような項目を教えてくれます。

*   901 Host name expected but not found：host nameが見つからなかった  
    （In this case the URL supports a host name, but non was found in the URL. This usually indicates a mistake in the URL. An exception is that this check is not applied to news: URLs.）
*   902 Unqualified host name found：ホスト名がドメイン部分を含んでいない  
    （In this case the host name does not contain the domain part. This usually means that the pages work fine when viewed within the original domain, but not when viewed from outside it.）
*   903 Double slash in URL path：URLのパスの中にダブルスラッシュが含まれている
*   904 Unknown scheme in URL：URLが、checkbotがわからないスキーマで始まっている。  
    (The URL starts with a scheme that Checkbot does not know about. This is often caused by mistyping the scheme of the URL, but the scheme can also be a legal one. In that case please let me know so that it can be added to Checkbot.)

リンク先のページは存在しているけど意図しているリンク先と違うとか、そういうものは確認できません。
