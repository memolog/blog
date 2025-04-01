---
title: Date.parseとタイムゾーン
date: 2013-10-06T09:50:00.000Z
categories:
- web
tags:
- javascript
---
Date.parse('1999-07-07')を実行すると、値は931305600000とUTCのタイムゾーンで解釈されるのに対して、Date.parse('1999/07/07')を実行すると、値は931273200000とJSTのタイムゾーンで解釈される。あ、ローカルの時間がJSTの場合。現時点（Firefox 24、Chrome 31）

<!-- more -->

[Date.parse](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/parse?redirectlocale=ja&redirectslug=JavaScript&#x25;2FReference&#x25;2FGlobal_Objects&#x25;2FDate&#x25;2Fparse)では引数に与えられた文字列をパースして、ミリ秒の値を値を返してくれます。タイムゾーンの指定がない場合はローカルのタイムゾーンとして解釈される。[ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm)では、以下のように説明されています（太字は私がつけた）。

> 15.9.4.2 Date.parse (string)
> 
> The parse function applies the ToString operator to its argument and interprets the resulting String as a date and time; it returns a Number, the UTC time value corresponding to the date and time. **The String may be interpreted as a local time**, a UTC time, or a time in some other time zone, depending on the contents of the String.

つまり、Date.parse('1999/07/07')ではタイムゾーンの指定がないので、ローカルのタイムゾーンの日時として解釈される。Date.parse('1999-07-07')の場合はなぜUTCになるか。ECMA-262は以下のように続く。

> **The function first attempts to parse the format of the String according to the rules called out in Date Time String Format (15.9.1.15).** If the String does not conform to that format the function may fall back to any implementation-specific heuristics or implementation-specific date formats. Unrecognisable Strings or dates containing illegal element values in the format String shall cause Date.parse to return NaN.

Date Time String Formatについては、下記のように書かれている。

> 15.9.1.15 Date Time String Format
> 
> ECMAScript defines a string interchange format for date-times based upon a simplification of the ISO 8601 Extended Format. The format is as follows: YYYY-MM-DDTHH:mm:ss.sssZ

つまり、Date.parseで渡された引数は、最初にISO8601の書式に従って解釈して、ISO8601に合わない場合はブラウザの実装されている解釈に委ねられる。

なので、Date.parse('1999-07-07')の場合はISO8601の書式として解釈される（ISO8601の書式に一致する）。そしてISO8601の書式においては、タイムゾーンの指定がない場合はUTCのタイムゾーンとなる。雰囲気。

> All numbers must be base 10. If the MM or DD fields are absent 01 is used as the value. If the HH, mm, or ss fields are absent 00 is used as the value and the value of an absent sss field is 000. **The value of an absent time zone offset is Z.**

しかし、[WikipediaのISO8601のtime zoneの記述](http://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators)を読むと、UTCに関連する情報がない場合は、時間はローカルタイムと仮定されると記されている。

> Time zone designators
> 
> Time zones in ISO 8601 are represented as local time (with the location unspecified), as UTC, or as an offset from UTC.
> 
> **If no UTC relation information is given with a time representation, the time is assumed to be in local time.** While it may be safe to assume local time when communicating in the same time zone, it is ambiguous when used in communicating across different time zones. It is usually preferable to indicate a time zone (zone designator) using the standard's notation.

うーん... どっちなのか。現時点のブラウザの実装的にはUTCになるわけですけど。

とにかく。まあ、だから、Date.parseで日本時間として解釈したい場合はDate.parse('1999-07-07T00:00:00+09:00')というように、タイムゾーンを明示的に指定した方が良い。Date.parse('1999/07/07')の方がスッキリして良いのですけど、こちらはブラウザの実装次第であるので、解釈できずにNaNになる可能性があるし、Future proofという観点からもやはりISO8601で指定する方が良い（'1999/07/07'はどのブラウザでも大丈夫だけど）。

しかし、IE8はISO8601の書式には対応していない... Date.parse('1999-07-07')はNaNになる。なので、別途対応する必要がある。そのあたり[Moment.js](http://momentjs.com/docs/#/parsing/string/)ではクロスブラウザに対応しているので便利。Moment.jsはそれ以外にもいろいろ便利。ただ、Moment.jsでmoment('1999-07-07')とすると、Timezoneがローカルタイムになるので注意。（[issue](https://github.com/moment/moment/issues/1167)にあげてみたけど、上のISO8601の内容もあってcloseになった。まあでもデフォルトでローカルタイムの方が妥当な気がする）

その後、より詳しい回答がついた（以下は抜粋）。詳しくは[こちら](https://github.com/moment/moment/issues/1167#issuecomment-25772376)。

> In reality, browsers that support the ISO format tend to follow the ES5 rule when provided an input in YYYY-MM-DD format, as long as the separator is a hyphen (-). But if the separator is a slash (/), then they usually treat that as local time. However, I don't think it would be a good idea to have moment follow this convention.
> 
> One of the primary reasons for using moment (IMHO) is to have uniformity in parsing. Browser specifics and ES5 specs are not something we should aim for feature parity with. Moment is more than just a shim. One could argue that ES5 is "doing it wrong", and that moment implements ISO8601 more precisely. Although ES5 does make it clear that theirs is a "based upon a simplification of the ISO 8601 Extended Format", so it doesn't have to precisely implement it.

ISO8601とES5とのspecの違いについて、ブラウザはES5によせる傾向があると。ES5のspecが誤っていて、momentの実装の方がISO8601に対してより正確であるという見方もできると。

まあ、そういうわけで、パースするときに使う文字列はタイムゾーンまで含めるのが良し。

というメモ。
