---
title: npm script warns permission errors in the cache directory
featured:
  image: pavan-prasad-nw1slFnKRYE-unsplash
  author: Pavan Prasad
  authorLink: https://unsplash.com/@light_rays?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
date: 2022-11-07 17:30:00
---
（そんなことするかどうかは置いておいて）たとえば[docker-node-npm-scripti-permission-issue-demo](https://github.com/memolog/docker-node-npm-scripti-permission-issue-demo)を[Github codespaces](https://github.co.jp/features/codespaces)上で起動して、`npm ci`して、`npm run build`を実行すると、`permission denied, scandir '/root/.npm/_logs'` というエラーのWARNが発生する。<!-- more -->

原因は`npm run build`の中身が `npm run tsc` になっているため。rootユーザーで別のユーザーが所有権を持つディレクトリで実行すると問題になる。

解決方法はDocker containerを実行するユーザーを`node`に変更するとか、[npm config](https://docs.npmjs.com/cli/v6/using-npm/config#cache)で、`npm config set cache /tmp`と設定するとか（`export npm_config_cache=/tmp`でもいける雰囲気）、所有権を調整すると解決する。解決方法は他にもいろいろあると思う。

再現手順は[docker-node-npm-scripti-permission-issue-demo](https://github.com/memolog/docker-node-npm-scripti-permission-issue-demo)のcodespacesのVS codeの中でターミナルを開いて、以下のような感じでDocker containerを起動して、`npm ci`と`npm run build`を実行するとエラーを再現することができる。動作環境はNode.js 16.18.0でnpmは8.19.2。たぶんNode.js 18.xでも発生する（npmのバージョンは変わらないので）。

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

npmのscriptは[@npmcli/run-script](https://github.com/npm/run-script)が実行スクリプトで`/usr/local/lib/node_modules/npm/node_modules/@npmcli`にある。これのバージョンは4.2.1なので、[run-script.js](https://github.com/npm/run-script/blob/v4.2.1/lib/run-script.js)が実際の処理になる。これを[run-script-pkg.js](https://github.com/npm/run-script/blob/v4.2.1/lib/run-script-pkg.js)、[@npmcli/promise-spawn](https://github.com/npm/promise-spawn)と辿っていくと、[promise-spawn/lib/index.js](https://github.com/npm/promise-spawn/blob/v3.0.0/lib/index.js)に到達する。

ここで実行している[infer-owner](https://github.com/npm/infer-owner)は、スクリプトを実行するディレクトリの所有権を推測して、ディレクトリのuid、gidを返してくれる。run-script.jsではこれを利用して[child_process.spawn](https://nodejs.org/docs/latest-v16.x/api/child_process.html#child_processspawncommand-args-options)をuid, gid付きで実行する。

codespacesのディレクトリはcodespace(uid:1000)がオーナーで、Docker containerのユーザーはデフォルトではroot（uid:0）なので、codespaceが所有するディレクトリでrootユーザーが処理を実行する形になる。

具体的にはrootユーザーがnpm scriptが実行したとき、uid:1000, gid:0で[child_process.spawn](https://nodejs.org/docs/latest-v16.x/api/child_process.html#child_processspawncommand-args-options)を実行する。ここまでは特に問題ない。

npm scriptの中で`npm run`を記述していると、`run-script`の中で`run-script`を実行する状態になる（npm scriptもnpm runも`run-script`で実行するので）。

つまり、root（uid:0）ユーザーが、uid:1000, gid:0で実行した処理の中で、uid:1000, gid:0で処理を実行する。すると[npm cache](https://docs.npmjs.com/cli/v8/commands/npm-cache#configuration)のディレクトリ、`/root/.npm` に対してログを出力しようとしてパーミッションエラーとなる雰囲気。なぜrootユーザーのキャッシュディレクトリを参照するとエラーになるかは理解できていない。run-scriptを実行してるユーザーのuidでファイルアクセスしようとするためなのだろうか。

なので、Docker containerの実行ユーザーをrootではないユーザーに変更するか、rootユーザーを維持したければ、スクリプト実行前に`npm config set cache /tmp`みたいな感じで、キャッシュディレクトリを適当な場所に変更しておけば、問題は発生しない。

----

ところで、この[infer-owner](https://github.com/npm/infer-owner)による処理、[feat: remove infer-owner](https://github.com/npm/promise-spawn/pull/40)のプルリクエストで削除されることになった。@npmcli/promise-spawnの5.0以降は同じ問題は発生しなくなる。npm cliでは[9.0.1](https://github.com/npm/cli/releases/tag/v9.0.1)で5.0がインストールされるようになる。Node.jsでは[deps: upgrade npm to 9.1.0](https://github.com/nodejs/node/pull/45323)にて進行中のよう。

しかしながら、run-scriptの処理は（[npm install](https://github.com/npm/cli/blob/v8.19.2/lib/commands/install.js#L158) / 詳細は未確認）でも利用されている。つまり今までは、npm installを実行するユーザーが誰であれ、インストール先のディレクトリのオーナーでインストールしてくれるということであり、インストールする実行ユーザーを気にしないで済んでいた。npm v9.0.1以降はそうはいかなくなる。

たとえば、Docker container中で、rootユーザーで`npm ci`したりして、node_modulesの中だけ所有権がrootになってしまったり、npm scriptで生成したファイルの所有権がrootユーザーになったり（生成したファイルを他ユーザーで削除しようとしてエラーになったり）などという問題が発生する可能性がある。

なのでnpm install、npm scriptの実行するユーザーは今のうちに見直しておくのが良いかもしれない。

という長いメモであった。
