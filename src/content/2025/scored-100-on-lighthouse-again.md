---
title: Lighthouseで再び100点をとる
date: 2025-04-13 18:40
featured:
    image: 106498absdl.webp
    author: John Marin
    authorLink: https://artvee.com/artist/john-marin/
excerpt: 特に意味はないんだけど、LighthouseのScoreが微妙に100点になっていなかったので、ふたたび100点を目指して修正してみました。
---
特に意味はないんだけど、Lighthouseのスコアが微妙に100点に届いていなかったので、前回の対応（[Got 100 lighthouse score in all categories on mobile](/2020/got-100-lighthouse-score-in-all-categories-on-mobile.html)）に続いて、また100点を目指して修正してみました。

今回は「[遅延読み込みが多すぎるとパフォーマンスに影響する](https://web.dev/articles/lcp-lazy-loading)」という項目にひっかかっていました。とりあえずなんでも`loading="lazy"` を付けておけばいいと思っていたんですが、初期ビューポート内の画像まで lazy にしてしまうと、LCP（Largest Contentful Paint）の指標がむしろ悪化することがあるらしい。

あと「[適切なサイズの画像](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images)」という項目にもひっかかっていた。ChatGPTで生成した1024×1024の正方形画像をFeatured Imageに使っていたのですが、横長で表示する場合には表示されない部分のピクセルが無駄になってるという、なんかそういうことらしい。

そこで、[generate-responsive-images-service](https://github.com/memolog/generate-responsive-images-service)の中で[sharp](https://github.com/lovell/sharp)を使って画像リサイズする処理に、表示サイズに合わせて中央を切り取る処理を追加し、画像を再生成しました。コードはChatGPTが出してくれたものをほぼそのまま使ってる。

```javascript
if (cropWidth || cropHeight) {
  cropWidth = cropWidth || width;
  cropHeight = cropHeight || height;

  const left = Math.floor((width - cropWidth) / 2);
  const top = Math.floor((height - cropHeight) / 2);

  sharpObject = sharpObject.extract({
    left,
    top,
    width: cropWidth,
    height: cropHeight
  });
}
```

また、Best Practice の「Avoids third-party cookies」で Google Analytics が引っかかっていたので、今回は単純にスクリプトごと削除しました（そもそも特に見ていなかったし）。真面目に対応しようとすると結構面倒くさそう。

> Chrome is moving towards a new experience that allows users to choose to browse without third-party cookies. [Learn more about third-party cookies](https://privacysandbox.google.com/cookies).

----

まあとにかく、100点いったので記念のスクリーンショット。以前と同じく花火っぽいのが出てくる。

<img src="/assets/images/lighthouse_100_again/lighthouse_100_again.webp" srcset="/assets/images/lighthouse_100_again/lighthouse_100_again.webp, /assets/images/lighthouse_100_again/lighthouse_100_again@2x.webp" class="screenshot" width="921" height="612" loading="lazy" alt="Lighthouseが100点満点のスクリーンショット">

----
追記（2025/4/15)

上の `extract` だと、たとえば画像の横幅が3000pxあったりすると、画像の真ん中を小さなエリアを切り取る感じになってしまうので、[sharp.resize](https://sharp.pixelplumbing.com/api-resize/)でリサイズしつつ切り取る方が自分のやりたいケースとしては適切だった。

```javascript
const sharpObject = sharp(buffer);
const { width, height } = await sharpObject.metadata();

if (cropWidth || cropHeight) {
  cropWidth = (cropWidth || width) * scale;
  cropHeight = (cropHeight || height) * scale;
  sharpObject.resize(cropWidth, cropHeight, {
    fit: "cover",
    position: "centre"
  });
}
```
