---
title: Featured Image を設置する
date: 2018-01-08 11:07:38
featured:
  image: display-featured-image.webp
  author: chatGPT
excerpt: "記事のタイトル下によくあるFeatured Imageを設置してみようと思い立って、Unsplashから良い感じの画像をダウンロードして入れてみた。ちょっと大きい気もするけどまあ良いか。ページサイズ的には特に内容と関係ない画像を入れることのメリットはないけど、、しばらくはそのまま使ってみようと思う。"
---

記事のタイトル下によくある Featured Image を設置してみようと思い立って、[Unsplash](https://unsplash.com)から良い感じの画像をダウンロードして入れてみた。ちょっと大きい気もするけどまあ良いか。ページサイズ的には特に内容と関係ない画像を入れることのメリットはないけど、、しばらくはそのまま使ってみようと思う。

でも大きな画像をそのまま使うのはファイルサイズ的に大きすぎるので、リサイズしたい。できれば各端末に適したサイズにしておきたい... と、なんかいろいろ思ってしまい、最終的に Unsplash のサイトからダウンロードしたデータを個人的に使いたい大きさにリサイズするサービスを用意してみた。[convert-a-image-to-responsive-images](https://github.com/memolog/convert-a-image-to-responsive-images)に公開している（ES2015 をターゲットにしているので、IE11 では動かない）。ただの思いつきに思ったより時間をかけてしまった。最初は AWS Lambda で画像をリサイズするつもりだったが、リサイズに使っている[Sharp](https://github.com/lovell/sharp)の扱いが少し難しく、メモリ容量のところでエラーになってしまった（これを解決する方法はありそうなのだが、やってる時間がなくなったので、しばし保留）。いずれにせよ最終的には WEB サービスとして公開したいなと思っている。週末に時間があれば。

サーバーの実装は簡単で、[busboy](https://github.com/mscdex/busboy)でファイルを受け取ったあとに、指定したサイズで sharp を実行するだけである。

```javascript
function resizeImage(buffer, size, name, ext, scale) {
  return new Promise((fulfill, reject) => {
    scale = scale || 1;
    ext = ext.replace(/^\./, "");
    const scaleStr = scale === 1 ? "" : `@${scale}x`;
    const relativePath = `images/${name}/${name}_${size}${scaleStr}.${ext}`;
    const filePath = path.resolve(
      __dirname,
      `../static/public/${relativePath}`
    );

    sharp(buffer)
      .resize(size * scale)
      .toFile(filePath, (err) => {
        if (err) {
          reject(err);
          return;
        }
        fulfill(relativePath);
      });
  });
}
```

フロント側も簡単で、基本的には Fetch API を使ってリクエストを送っているだけである。レンダリングには[preact](https://preactjs.com/)を使ってみた。preact/TypeScript/SCSS などを Webpack でバンドルするのが一番面倒くさいは面倒くさい（最初だけだけど）。

```javascript
submitHandler(event){
		event.preventDefault();
		event.stopPropagation();

    const fileElement = document.getElementById('upload-image');
    if (!(fileElement instanceof HTMLInputElement)) {
      return;
    }

    const uploadFile = fileElement.files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);

    fetch('http://localhost:3000/convert', {
      method: 'POST',
      body: formData
    })
    .then((resp)=>{
      return resp.json();
    })
    .then((data) => {
      this.setState({
        images: data && data.filePaths || []
      });
    })
    .catch(err => console.log(err));
  }
```

Hexo のテンプレートの方は、[Front-matter | Hexo](https://hexo.io/docs/front-matter.html)の部分にイメージ画像に関する情報を入れて、それをテンプレートに追加する。

```yaml
title: Featured Image を設置する
date: 2018-01-08 11:07:38
featured:
  image: benjamin-voros-365387
  author: Benjamin Voros
  authorLink: https://unsplash.com/photos/StFUwkNsvcY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
```

```html
<div class="header__feature">
  <div class="featured__image">
    <picture>
      <source
        data-srcset="/blog/assets/images/<%= featured.image %>/<%= featured.image %>_450.jpg, /blog/assets/images/<%= featured.image %>/<%= featured.image %>_450@2x.jpg 2x, /blog/assets/images/<%= featured.image %>/<%= featured.image %>_450@3x.jpg 3x"
        type="image/jpeg"
        media="(max-width: 450px)"
      />
      <source
        data-srcset="/blog/assets/images/<%= featured.image %>/<%= featured.image %>_750.webp, /blog/assets/images/<%= featured.image %>/<%= featured.image %>_750@2x.webp 2x"
        type="image/webp"
      />
      <source
        data-srcset="/blog/assets/images/<%= featured.image %>/<%= featured.image %>_750.jpeg, /blog/assets/images/<%= featured.image %>/<%= featured.image %>_750@2x.jpeg 2x"
        type="image/jpeg"
      />
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANS...VORK5CYII="
        data-src="/blog/assets/images/<%= featured.image %>/<%= featured.image %>_750.jpg"
        class="lazyload blur-up"
      />
    </picture>
  </div>
  <div class="featured__credit">
    Photo by
    <a href="<%= featured.authorLink %>" target="_blank" rel="noopener"
      ><%= featured.author %></a
    >
    on
    <a
      href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noopener"
      >Unsplash</a
    >
  </div>
</div>
```

```css
.lazyload,
.lazyloading {
  opacity: 0;
}

.lazyloaded {
  opacity: 1;
  transition: opacity 2s 0.3s cubic-bezier(0, 0.5, 0, 1);
}
```

最初のロードで画像は表示したくないので[lazysizes](https://github.com/aFarkas/lazysizes)で画像を遅延読み込みしている。

あと CloudFormation で作成した画像を配信するためのスタックを用意しているけど、、書いてる時間がなくなったのでまた別の機会に書く。

まだいろいろ課題はあって...

- アプリケーションとして公開したい（Lambda か Amazon ECS 使いたい）
- S3 / CloudFront からのファイルを gzip で配信したい
- リサイズするサイズより小さい画像の扱いができない
- 若干、手作業が多い（最終的には Unsplash の API を使いたい）
- imageOptim みたいな最適化処理をしたい

など、いろいろ。時間があって、まだ興味が持続していれば、、対応していきたい。
