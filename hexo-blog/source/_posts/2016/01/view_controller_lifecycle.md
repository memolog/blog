---
title: View Controller Lifecycle
date: 2016-01-11T22:15:00.000Z
categories:
- web
tags:
- ios
- swift
---
viewDidLoadとviewDidAppearの使い方についてのメモ（ほぼ公式ドキュメントのコピペ）。引用中の太字装飾は私。

[Work with View Controllers](https://developer.apple.com/library/ios/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Lesson4.html)にある「Understand the View Controller Lifecycle」に書いてある説明は以下のような感じ。

<!-- more -->

> ![](https://developer.apple.com/library/ios/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Art/4_vclife_2x.png)
> 
> UIViewController methods get called as follows:
> 
> *   viewDidLoad()--Called when the view controller's content view (the top of its view hierarchy) is created and loaded from a storyboard. **This method is intended for initial setup. However, because views may be purged due to limited resources in an app, there is no guarantee that it will be called only once.**
> *   viewWillAppear()--**Intended for any operations that you want always to occur before the view becomes visible.** Because a view's visibility may be toggled or obscured by other views, this method is always called immediately before the content view appears onscreen.
> *   viewDidAppear()--**Intended for any operations that you want to occur as soon as the view becomes visible, such as fetching data or showing an animation.** Because a view's visibility may be toggled or obscured by other views, this method is always called immediately after the content view appears onscreen.

viewDidLoadはstoryboardからviewが読み込まれた時に発生する。読み込んだviewの初期化のために使うことを意図してるけど、viewはリソースの制限からpurgeされる場合があるので、「一度だけ呼ばれる」ことを保証するものではない。

viewWillAppearとviewDidAppearはviewがvisibleになったときに発生する。「the view becomes visible」というのは、[UIViewController Class Reference](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/#//apple_ref/occ/instm/UIViewController/viewWillAppear:)あたりを参考にすると、「its view is about to be added to a view hierarchy」と同じ意味だと思う。

以下は[UIViewController Class Reference](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class)より。

> **viewWillAppear:**
> 
> Notifies the view controller that its view is about to **be added to a view hierarchy.**
> 
> This method is called before the view controller's view is about to be added to a view hierarchy and before any animations are configured for showing the view. You can override this method to perform custom tasks associated with displaying the view. For example, you might use this method to change the orientation or style of the status bar to coordinate with the orientation or style of the view being presented. If you override this method, you must call super at some point in your implementation.
> 
> For more information about the how views are added to view hierarchies by a view controller, and the sequence of messages that occur, see Responding to Display-Related Notifications.
> 
> NOTE  
> If a view controller is presented by a view controller inside of a popover, this method is not invoked on the presenting view controller after the presented controller is dismissed.

view hierarchyは文字通り「viewの階層(構造)」ということで、[View Programming Guide for iOS: Views](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/CreatingViews/CreatingViews.html)あたりが参考になる。

> Figure 3-1 shows an example of how the layering of views creates the desired visual effect for an application. In the case of the Clock application, the view hierarchy is composed of a mixture of views derived from different sources. The tab bar and navigation views are special view hierarchies provided by the tab bar and navigation controller objects to manage portions of the overall user interface. Everything between those bars belongs to the custom view hierarchy that the Clock application provides.
> 
> ![](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewPG_iPhoneOS/Art/windowlayers.jpg)

たとえば navigation controller では、navigation controller では　pushViewController　とかで画面遷移したときに、viewDidAppearなどの各種イベントが発生する。

> Navigation Controllers
> 
> A navigation controller manages a stack of view controllers to provide a drill-down interface for hierarchical content. The view hierarchy of a navigation controller is self contained. It is composed of views that the navigation controller manages directly and views that are managed by content view controllers you provide. Each content view controller manages a distinct view hierarchy, and the navigation controller coordinates the navigation between these view hierarchies.

  

> Monitoring Changes to the Navigation Stack
> 
> Whenever you push or pop a view controller, the navigation controller sends messages to the affected view controllers. The navigation controller also sends messages to its delegate when its stack changes. Figure 1-5 shows the sequence of events that occurs during a push or pop operation and the corresponding messages that are sent to your custom objects at each stage. The new view controller reflects the view controller that is about to become the topmost view controller on the stack.
> 
> Figure 1-5 Messages sent during stack changes
> 
> ![](https://developer.apple.com/library/ios/documentation/WindowsViews/Conceptual/ViewControllerCatalog/Art/nav_controller_notifications.png)

[presentViewController](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/index.html#//apple_ref/occ/instm/UIViewController/presentViewController:animated:completion:)でviewを表示する場合は、表示するview controller(presented view controller)の[modalPresentationStyle](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/index.html#//apple_ref/occ/instp/UIViewController/modalPresentationStyle)によってイベントが発生するかどうかが変わる。 .FullScreen の場合は　presenting　viewは消えるので、viewDidDisappearなど発生する。 .OverFullScreen の場合は、presenting view は消えないので、viewDidDisappearなどのイベントが発生しない（presented view controllerの[definesPresentationContext](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/index.html#//apple_ref/occ/instp/UIViewController/definesPresentationContext)がtrueである必要がある）。

> \* OverFullScreen  
>   
> A view presentation style in which the presented view covers the screen. The views beneath the presented content are **not removed from the view hierarchy** when the presentation finishes. So if the presented view controller does not fill the screen with opaque content, the underlying content shows through.  
>   
> Available in iOS 8.0 and later.

アプリケーションがBackground（またはSuspended）になった場合は、viewDidDisappearなどのイベントは発生しない。アプリがkillされなければ、frontにそのままの状態で戻ってくるけど、killされていれば、storyboardからあらためてviewが読み込まると思うので（ちゃんと確かめてないけど..）、viewDidLoadが発生するはず。以下は[Programming iOS 9](http://shop.oreilly.com/product/0636920044352.do)([Programming iOS 9: Dive Deep into Views, View Controllers, and Frameworks - Matt Neuburg - Google ブックス](https://books.google.co.jp/books?id=rxHiCgAAQBAJ&pg=PT401&dq=A+view+does+not+disappear+merely+because+the+app+is+backgrounded+and+suspended.&hl=ja&sa=X&ved=0ahUKEwiCpeLL4qLKAhXF6KYKHf_HA3IQ6AEIHDAA#v=onepage&q=A&#x25;20view&#x25;20does&#x25;20not&#x25;20disappear&#x25;20merely&#x25;20because&#x25;20the&#x25;20app&#x25;20is&#x25;20backgrounded&#x25;20and&#x25;20suspended.&f=false))から。

> A view does not disappear merely because the app is backgrounded and suspended. Once suspended, your app might be killed. So you cannot rely on viewWillDisappear: and viewDidDisappear: alone for saving data that the app will need the next time it launches. If you are to cover every case, you may need to ensure that your data-saving code also runs in response to an application lifetime event such as applicationWillResignActive: or applicationDidEnterBackground:

参考： [iOS - UIViewControllerのライフサイクル - Qiita](http://qiita.com/mo_to_44/items/0ca628b4cc74c8c5599d)
