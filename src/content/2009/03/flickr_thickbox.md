---
title: ThickBox対応したFlickrのAction Streamを作成する
date: 2009-03-29T07:26:10.000Z
categories:
  - web
tags:
  - mt
excerpt: "Action Streamで得たFlickrのActivityをThickBoxを利用して表示したいなと思いたち、そこで独自のAction Streamsプラグインを作成するのページと、既存のAction Stream pluginとGoogle検索などを見ながら、自分用のFlickr for thickbox pluginを作成してみました。"
---

Action Stream で得た Flickr の Activity を ThickBox を利用して表示したいなと思いたち、そこで[独自の Action Streams プラグインを作成する](http://www.movabletype.jp/documentation/actionstreams/building_action_streams_plugin.html)のページと、既存の Action Stream plugin と Google 検索などを見ながら、自分用の Flickr for thickbox plugin を作成してみました。

作成した config.yaml（action_streams 部分のみ）はこんな感じ。

```
action_streams:
    flickrthickbox:
        photos:
            name: Photos
            description: Photos you posted
            fields:
                - thumbnail_b
            html_form: '<a href="[_2]" class="thickbox"><img src="[_3]" title="[_4]"></a> on <a href="[_5]">Flickr</a>'
            html_params:
                - thumbnail_b
                - thumbnail
                - title
                - url
            url: 'http://www.flickr.com/photos/{{ident}}/'
            identifier: url
            scraper:
                foreach: 'p.Photo'
                get:
                    title:
                        - a
                        - '@title'
                    url:
                        - a
                        - '@href'
                    thumbnail:
                        - img
                        - '@src'
                    thumbnail_b:
                        - img
                        - '@src'

callbacks:
    pre_build_action_streams_event.flickrthickbox_photos: sub { $_[2]->{thumbnail_b} =~ s/_m\.jpg/_b\.jpg/ }


```

scraper で行ったのは、thickbox 　実行時に表示するための大きな画像(thumbnail_b)の URL を取得するために　'thumbnail_b'=> \['@src',sub { s/\_m\\.jpg/\_b\\.jpg/}\]　みたいなことをやろうとしてのことだったのですが、Action Stream 　の plugin 上ではうまく動かず・・。結局、callbacks で置換するようにしました。scraper でやる必然性は特になく、atom でも rss でも同じことはできそう。

そして実際に表示させてみたのですが、思ったより収まりが悪い。外観についてはまたそのうち考えてみよう・・

**そして追記。**

やはり atom から取得する方法変えてみました。あとストリームの名前を「flickr」にして、既存の flickr ストリームを上書きするかたちにしました（それに伴って favorites も一応追加）。plugin を追加する前の flickr のストリームには「thumbnail_b」がないので、リンクをクリックしても何も表示されないのが難点。

```
action_streams:
    flickr:
        favorites:
            name: Favorites
            description: Photos you marked as favorites
            fields:
                - by
            html_form: '[_1] saved <a href="[_2]">[_3]</a> as a favorite photo'
            html_params:
                - url
                - title
            url: 'http://api.flickr.com/services/feeds/photos_faves.gne?nsid={{ident}}&lang=en-us&format=atom_10'
            atom:
                thumbnail: content
                by: author/name
        photos:
            name: Photos
            description: Photos you posted
            fields:
                - thumbnail_b
            html_form: '<a href="[_2]" class="thickbox"><img src="[_3]" title="[_4]"></a> on <a href="[_5]">Flickr</a>'
            html_params:
                - thumbnail_b
                - thumbnail
                - title
                - url
            url: 'http://api.flickr.com/services/feeds/photos_public.gne?id={{ident}}&lang=en-us&format=atom_10'
            identifier: url
            atom:
                thumbnail: content

callbacks:
    pre_build_action_streams_event.flickr_photos:           $ActionStreams::ActionStreams::Fix::flickr_photo_thumbnail
    pre_build_action_streams_event.flickr_photos:           sub { $_[2]->{thumbnail_b} = $_[2]->{thumbnail}; $_[2]-> {thumbnail_b} =~ s/_t\.jpg/_b\.jpg/ }
    pre_build_action_streams_event.flickr_favorites:        $ActionStreams::ActionStreams::Fix::flickr_photo_thumbnail

```
