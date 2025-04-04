---
title: npm script warns permission errors in the cache directory
featured:
  image: pavan-prasad-nw1slFnKRYE-unsplash
  author: Pavan Prasad
  authorLink: https://unsplash.com/@light_rays?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2022-11-07 17:30:00
excerpt: "（そんなことするかどうかは置いておいて）たとえばdocker-node-npm-scripti-permission-issue-demoをGithub codespaces上で起動して、`npm ci`して、`npm run build`を実行すると、`permission denied, scandir '/root/.npm/_logs'` というエラーのWARNが発生する。"
---

（そんなことするかどうかは置いておいて）たとえば[docker-node-npm-scripti-permission-issue-demo](https://github.com/memolog/docker-node-npm-scripti-permission-issue-demo)を[Github codespaces](https://github.co.jp/features/codespaces)上で起動して、`npm ci`して、`npm run build`を実行すると、`permission denied, scandir '/root/.npm/_logs'` というエラーの WARN が発生する。

原因は`npm run build`の中身が `npm run tsc` になっているため。root ユーザーで別のユーザーが所有権を持つディレクトリで実行すると問題になる。

解決方法は Docker container を実行するユーザーを`node`に変更するとか、[npm config](https://docs.npmjs.com/cli/v6/using-npm/config#cache)で、`npm config set cache /tmp`と設定するとか（`export npm_config_cache=/tmp`でもいける雰囲気）、所有権を調整すると解決する。解決方法は他にもいろいろあると思う。

再現手順は[docker-node-npm-scripti-permission-issue-demo](https://github.com/memolog/docker-node-npm-scripti-permission-issue-demo)の codespaces の VS code の中でターミナルを開いて、以下のような感じで Docker container を起動して、`npm ci`と`npm run build`を実行するとエラーを再現することができる。動作環境は Node.js 16.18.0 で npm は 8.19.2。たぶん Node.js 18.x でも発生する（npm のバージョンは変わらないので）。

```bash
docker build -f Dockerfile -t demo .
docker run -it --rm -v `pwd`:/current -w /current demo bash
```

```bash
root@71524f7f2bea:/current# npm ci
... (snip) ...
added 1 package, and audited 2 packages in 2s
found 0 vulnerabilities
... (snip) ...
```

```bash
root@71524f7f2bea:/current# npm run build

> docker-node-npm-scripti-permission-issue-demo@1.0.0 build
> npm run tsc

npm WARN logfile Error: EACCES: permission denied, scandir '/root/.npm/_logs'
npm WARN logfile  error cleaning log files [Error: EACCES: permission denied, scandir '/root/.npm/_logs'] {
npm WARN logfile   errno: -13,
npm WARN logfile   code: 'EACCES',
npm WARN logfile   syscall: 'scandir',
npm WARN logfile   path: '/root/.npm/_logs'
npm WARN logfile }

> docker-node-npm-scripti-permission-issue-demo@1.0.0 tsc
> tsc

npm ERR! code EACCES
npm ERR! syscall mkdir
npm ERR! path /root/.npm/_cacache/tmp
npm ERR! errno -13
npm ERR!
npm ERR! Your cache folder contains root-owned files, due to a bug in
npm ERR! previous versions of npm which has since been addressed.
npm ERR!
npm ERR! To permanently fix this problem, please run:
npm ERR!   sudo chown -R 1000:0 "/root/.npm"

npm ERR! Log files were not written due to an error writing to the directory: /root/.npm/_logs
npm ERR! You can rerun the command with `--loglevel=verbose` to see the logs in your terminal
```

以下は詳細。

npm の script は[@npmcli/run-script](https://github.com/npm/run-script)が実行スクリプトで`/usr/local/lib/node_modules/npm/node_modules/@npmcli`にある。これのバージョンは 4.2.1 なので、[run-script.js](https://github.com/npm/run-script/blob/v4.2.1/lib/run-script.js)が実際の処理になる。これを[run-script-pkg.js](https://github.com/npm/run-script/blob/v4.2.1/lib/run-script-pkg.js)、[@npmcli/promise-spawn](https://github.com/npm/promise-spawn)と辿っていくと、[promise-spawn/lib/index.js](https://github.com/npm/promise-spawn/blob/v3.0.0/lib/index.js)に到達する。

ここで実行している[infer-owner](https://github.com/npm/infer-owner)は、スクリプトを実行するディレクトリの所有権を推測して、ディレクトリの uid、gid を返してくれる。run-script.js ではこれを利用して[child_process.spawn](https://nodejs.org/docs/latest-v16.x/api/child_process.html#child_processspawncommand-args-options)を uid, gid 付きで実行する。

codespaces のディレクトリは codespace(uid:1000)がオーナーで、Docker container のユーザーはデフォルトでは root（uid:0）なので、codespace が所有するディレクトリで root ユーザーが処理を実行する形になる。

具体的には root ユーザーが npm script が実行したとき、uid:1000, gid:0 で[child_process.spawn](https://nodejs.org/docs/latest-v16.x/api/child_process.html#child_processspawncommand-args-options)を実行する。ここまでは特に問題ない。

npm script の中で`npm run`を記述していると、`run-script`の中で`run-script`を実行する状態になる（npm script も npm run も`run-script`で実行するので）。

つまり、root（uid:0）ユーザーが、uid:1000, gid:0 で実行した処理の中で、uid:1000, gid:0 で処理を実行する。すると[npm cache](https://docs.npmjs.com/cli/v8/commands/npm-cache#configuration)のディレクトリ、`/root/.npm` に対してログを出力しようとしてパーミッションエラーとなる雰囲気。なぜ root ユーザーのキャッシュディレクトリを参照するとエラーになるかは理解できていない。run-script を実行してるユーザーの uid でファイルアクセスしようとするためなのだろうか。

なので、Docker container の実行ユーザーを root ではないユーザーに変更するか、root ユーザーを維持したければ、スクリプト実行前に`npm config set cache /tmp`みたいな感じで、キャッシュディレクトリを適当な場所に変更しておけば、問題は発生しない。
