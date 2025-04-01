---
title: CryptoSwiftを使ってAES-256-CBCで暗号化してNodeで復号化する
date: 2015-08-13T14:00:00.000Z
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
iOS側で[CryptoSwift](https://github.com/krzyzanowskim/CryptoSwift)を使ってAES-256-CBCで暗号化したデータを、Node.jsで受け取って復号化するという話。

<!-- more -->

CocoaPodsのインストール
----------------

CryptoSwiftをインストールするときにCocoaPodsを使うので、まず[CocoaPods Guides - Getting Started](https://guides.cocoapods.org/using/getting-started.html)を参考にCocoaPodsのインストールをします。CocoaPodsについては[\[Swift\] CocoaPodsとCarthageの違い / ライブラリ管理 - Qiita](http://qiita.com/nori0620/items/b81ae171f0e82b0c2d8a)など参照（CarthageでもCryptoSwiftインストールできる）。

```bash
gem install cocoapods

```

インストール後にもしかしたらpod updateが必要かもしれないけど、失念してしまった..

CryptoSwiftのインストール
------------------

Xcodeで作成したプロジェクトの下にPodfileを作成して、pod install実行してCryptoSwiftをインストールします。サンプルでは ~/Desktop/sample の下に「sample」プロジェクトを作成したので、Podfileは ~/Desktop/sample/sample の下に以下のような内容で作成。CryptoSwiftはframeworkを使用するので、use_frameworks!の宣言が必要。

```text
use_frameworks!
platform :ios, "8.0"
pod 'CryptoSwift', "0.4.1"

```

これで、~/Desktop/sample/sample の下で、pod installを実行する。

```bash
pod install

```

ちなみに、user_frameworks!の宣言がないと下記のようなエラーが出ます。詳しくは[CocoaPods 0.36 - Framework and Swift Support - CocoaPods Blog](http://blog.cocoapods.org/CocoaPods-0.36/)を参照（読んでないけど）。

```bash
[!] Pods written in Swift can only be integrated as frameworks;
this feature is still in beta. Add `use_frameworks!` to your Podfile or target to opt into using it.
The Swift Pod being used is: CryptoSwift
```

あと、試した限りでは XCodeのBuild Settingsのうち「Allow Non-modular Includes In Framework Modules」を「Yes」にする必要がありました。

CryptoSwiftで暗号化
---------------

とりあえずviewDidLoadの中で使った場合の例。bytesが暗号化する文字列で。keyが暗号に使うキー。サーバー側にはivと暗号化したデータをBase64にエンコードして送ります。実装は[Convert encrypted data to string? ? Issue #20 ? krzyzanowskim/CryptoSwift](https://github.com/krzyzanowskim/CryptoSwift/issues/20#issuecomment-115217610)の[PHP compatible AES Encryption and Decryption with Swift and CryptoSwift](https://gist.github.com/tlarevo/63840cdd421937ba9174#file-php-compatible-swift-aes-encryption-using-cryptoswift-swift)と[Swift compatible AES Encryption and Decryption with PHP and mcrypt](https://gist.github.com/tlarevo/b65c94b02993fd50fc68#file-swift-compatible-php-aes-encryption-using-mcrypt-php)を参考にしてます。実装例ではPOST送信しないでprintlnしてるだけですが、送信しているつもりで。

```swift
import UIKit
import CryptoSwift

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.

        let bytes = [UInt8]("Lorem ipsum dolor sit amet".utf8)
        let key = [UInt8]("12345678901234567890123456789012".utf8)
        let iv:[UInt8] = AES.randomIV(AES.blockSize)

        do {
            let aes = try AES(key: key, iv: iv, blockMode: .CBC)
            let encrypted = try aes.encrypt(bytes)
            let encryptedData = NSData(bytes:encrypted, length:encrypted.count)
            let sendData = NSMutableData(bytes: iv, length: iv.count)
            sendData.appendData(encryptedData)
            let sendDataBase64 = sendData.base64EncodedStringWithOptions(NSDataBase64EncodingOptions())
            println(sendDataBase64)
        } catch let error as NSError {
            debugPrint(error)
        }
    }
}

```

「import CryptoSwift」の部分でエラーが発生する場合は、前述の「Allow Non-modular Includes In Framework Modules」が「YES」になっているかを確認して、それでもエラーになるならメニューから「Product->Run」を選んで一回ビルドすると解消されるかもしれない。

Node.jsで受け取って復号化
----------------

Node側の実装は下記のような感じ。[Crypto](https://nodejs.org/api/crypto.html#crypto_crypto_createdecipheriv_algorithm_key_iv)を使用します。「xl95gDHGiHnDiHrbUF+m2BTRf7BO3HibcXAhORCRatM1mfwDEVmLdDb/W4IG2lgO」が受け取ったBase64のデータのつもり。interpreterで動作の確認ができます。

```javascript
var crypto = require('crypto');
var key = new Buffer('12345678901234567890123456789012');
var buf = new Buffer('xl95gDHGiHnDiHrbUF+m2BTRf7BO3HibcXAhORCRatM1mfwDEVmLdDb/W4IG2lgO','base64')
var iv = buf.slice(0,16)
var encryptedData = buf.slice(16)
var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
var decrypted = decipher.update(encryptedData, 'base64', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);

```

以上です。同じような手順でNode.jsで暗号化したデータをiOS側で復号化ということもできるかなと思います（試してないけど）。

追記
--

[Node.js で AES-256-CBC で暗号化したデータを CryptoSwift で復号化する](/blog//2015/08/encrypt-with-nodejs-and-then-decrypt-it-with-cryptoswift/)も書きました。

2016/1/25: CryptoSwift 0.2.2向けにコードを更新

2016/5/30: CryptoSwift 0.4.1向けにコードを更新
