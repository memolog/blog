---
title: ThickBox対応したFlickrのAction Streamを作成する
date: 2009-03-29T07:26:10.000Z
categories:
- web
tags:
- mt
---
Action Streamで得たFlickrのActivityをThickBoxを利用して表示したいなと思いたち、そこで[独自のAction Streamsプラグインを作成する](http://www.movabletype.jp/documentation/actionstreams/building_action_streams_plugin.html)のページと、既存のAction Stream pluginとGoogle検索などを見ながら、自分用のFlickr for thickbox pluginを作成してみました。
<!-- more -->
作成したconfig.yaml（action_streams部分のみ）はこんな感じ。

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

scraperで行ったのは、thickbox　実行時に表示するための大きな画像(thumbnail\_b)のURLを取得するために　'thumbnail\_b'=> \['@src',sub { s/\_m\\.jpg/\_b\\.jpg/}\]　みたいなことをやろうとしてのことだったのですが、Action Stream　のplugin上ではうまく動かず・・。結局、callbacksで置換するようにしました。scraperでやる必然性は特になく、atomでもrssでも同じことはできそう。

そして実際に表示させてみたのですが、思ったより収まりが悪い。外観についてはまたそのうち考えてみよう・・

**そして追記。**

やはりatomから取得する方法変えてみました。あとストリームの名前を「flickr」にして、既存のflickrストリームを上書きするかたちにしました（それに伴ってfavoritesも一応追加）。pluginを追加する前のflickrのストリームには「thumbnail_b」がないので、リンクをクリックしても何も表示されないのが難点。

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