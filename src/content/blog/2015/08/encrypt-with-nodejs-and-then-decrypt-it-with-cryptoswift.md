---
title: Node.js で AES-256-CBC で暗号化したデータを CryptoSwift で復号化する
date: 2015-08-27T14:15:00.000Z
categories:
- web
tags:
- ios
- javascript
- node
- security
- swift
- xcode
---
[CryptoSwiftを使ってAES-256-CBCで暗号化してNodeで復号化する](/blog//2015/08/encrypt-with-cryptswift-and-then-decrypt-it-with-nodejs/)の記事で、CryptoSwift (iOS) で暗号化したデータをサーバー側（Node.js）で復号化する話をしましたが、今回はその逆向きで、Node.jsでABS-256-CBCで暗号化したデータをCryptoSwiftで復号化するという話。

<!-- more -->

Node.jsで暗号化
-----------

```javascript
var crypto = require('crypto');
var data = "Lorem ipsum dolor sit amet";
var key = new Buffer('12345678901234567890123456789012');
var iv = crypto.randomBytes(16);
var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
var encrypted = cipher.update(data, 'utf-8');
encrypted = Buffer.concat([iv, encrypted, cipher.final()]);
return res.json({
  encryptedToken: encrypted.toString('hex')
});

```

上の例だとBase64で返しても良くて（たぶんbinary arrayでも大丈夫）、たぶんBase64の方がswiftでの取り扱いがやりやすいと思うのですが、「?token=xxxx」みたいにクエリストリングで返したい場合があったのでhexにしました。

「637c04482cf264a7b39cc...」みたいな値が暗号化されたデータとして送られます。最後のresは[Express](http://expressjs.com/)のレスポンスオブジェクトを想定。

CryptoSwiftで復号化
---------------

iOS(swift)側では、decryptというfuncを使って復号化するようにしてみました。encryptedStringに暗号化された文字列が入ります。hex string から UInt8 array にする簡単な方法がなかったので、hexStringToUInt8 という funcで処理するようにしています（もっといい方法ないのかな）。

あと最後のCStringのencodingは「NSASCIIStringEncoding」にしていますけど（暗号化した文字列にアルファベットのみだったので）、日本語を暗号化するときは「NSUTF8StringEncoding」にしないと文字化けする（と思う）。

```swift
import UIKit
import CryptoSwift

func decrypt(encryptedString: String) -> String? {
    let key = [UInt8]("12345678901234567890123456789012".utf8)

    let ivRange = NSMakeRange(0, 32)
    let iv = hexStringToUInt8(encryptedString, range: ivRange)

    let dataLength = encryptedStr.characters.count - 32
    if dataLength < 0 {
        return nil
    }
        
    let dataRange = NSMakeRange(32, dataLength)
    let data = hexStringToUInt8(encryptedStr, range: dataRange)
        
    do {
        let aes = try AES(key: key, iv: iv, blockMode: .CBC)
        let decrypted = try aes.decrypt(data)
        let result = convertUInt8ToUTF(decrypted)
        return result
    } catch let error as NSError {
        debugPrint(error)
        return nil
    }
}

// http://stackoverflow.com/questions/24465475/how-can-i-create-a-string-from-utf8-in-swift
func convertUInt8ToUTF(bytes:[UInt8]) -> String {
  var ret = ""
  var decoder = UTF8()
  var generator = bytes.generate()
  var finished = false
  
  repeat {
    let decodingResult = decoder.decode(&generator)
    switch decodingResult {
    case .Result(let char):
      ret.append(char)
    default:
      finished = true
    }
  } while (!finished)
  
  return ret
}

func hexStringToUInt8(str:String, range:NSRange) -> [UInt8]{
    let nsstr:NSString = (str as NSString).substringWithRange(range)
    let strLength = String(nsstr).characters.count
    var result:[UInt8] = []

    for(var i=0; i<strLength; i += 2){
        let r = NSMakeRange(i, 2)
        let substr = nsstr.substringWithRange(r)
        result.append(UInt8(strtoul(substr, nil, 16)))
    }

    return result
}

```

以上です。

(2015/12/22 追記) UInt8からUTF8に変換するときの処理を以下のようにしていたのですが

```swift

let p = UnsafePointer(decrypted)
let ret = String(CString: p, encoding: NSUTF8StringEncoding)

```

これだと結果が不安定になる様子（原因までは追求していない）。1000回実行するとnilになったり、末尾に変な文字がついたりする。なので、[How can I create a String from UTF8 in Swift? - Stack Overflow](http://stackoverflow.com/a/30629181/634197)の回答を参考にして処理を変更しました。

(2016/01/25 追記) CryptoSwift 0.2.2 用のコードに変更。

(2016/05/30 追記) CryptoSwift 0.4.1 用のコードに変更。
