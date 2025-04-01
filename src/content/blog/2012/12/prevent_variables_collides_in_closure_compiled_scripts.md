---
title: Google Closure&#x3a; compileしたjavascriptを複数同時に使う
date: 2012-12-29T22:00:00.000Z
categories:
- web
tags:
- google-closure
- javascript
---
Closure CompilerのAdvanced modeでscriptをcompileした場合、Property RenamingとFlatteningがかかるので、global scope上にabとかBaとか短い名前のプロパティがたくさん作られるようになります。compileしたスクリプトが一つの場合は問題ありませんが、まったく別にcompileしたスクリプトを複数併用しようとすると、プロパティ名が衝突してしまって使うことができないという状態になります。

<!-- more -->

併用するスクリプトを全部まとめて1つのファイルにcompileすることで回避することもできますが、--output_wrapperというオプションでスクリプト全体を無名関数で囲われるかたちにすれば、複数のスクリプトを併用しつつ、global scope上でプロパティ名が衝突するのを回避することができます。

```
java -jar compiler.jar --output_wrapper="(function(){&#x25;output&#x25;})();" ....

```

と、ブログに書く前にGoogleで検索したら[FAQ - closure-compiler - Frequently asked questions. - Closure Compiler (When using Advanced Optimizations, Closure Compiler adds new variables to the global scope. How do I make sure my variables don't collide with other scripts on the page?)](http://code.google.com/p/closure-compiler/wiki/FAQ#When_using_Advanced_Optimizations,_Closure_Compiler_adds_new_var)にさらっと書いてありました。

併用するスクリプトにおいて利用ライブラリがほぼ共通するような場合は、使用するスクリプトファイルをまとめてcompileしつつ、--moduleオプションで共有部分とそうでない部分のファイルを分割する、という方が良いかもしれません（試してないけど）。
