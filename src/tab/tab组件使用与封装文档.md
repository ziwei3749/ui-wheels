# tab组件的使用方法和封装思路

## 使用方法:

- 1.粘贴tab组件的html代码

```
<div class="tabs">
    <ol class="tabs-bar">
        <li>tab1</li>
        <li>tab2</li>
        <li>tab3</li>
    </ol>
    <ol class="tabs-content">
        <li>content1</li>
        <li>content2</li>
        <li>content3</li>
    </ol>
</div>

````
- 2.引入依赖的css和js

```
 <link rel="stylesheet" href="./tab.css">
 <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
 <script src="./tab.js"></script>

```

- 3.在js里实例化Tab组件

```
var tab = new Tabs('./tabs')
```

- 4.参数介绍

```

可配置参数较少,用户只需要传递一个选择器。(你可以自行拓展)

```

## 封装思路:

这里的封装思路,核心就是利用tab-bar里li的索引和tab-content里li的索引,肯定是一一对应的。

当点击tab-bar里li,我们就可以根据这个index,去找到对应的content

> 注意点: 得到tab-bar里li的索引后,根据这个索引去找content的方式,我们应该是用JQ的closet()方法,
找到距离当前被点击li最近的的tabs组件下的content,否则当有多个tab组件时,你找到的永远是第一个tab组件.

- 对内分层原则的体现: 尽可能少的用JS去操作CSS,没有用style去设置样式,而是只有一个active类名来控制样式,这样也能尽量重绘和回流
- 对外面向接口编程原则: 封装组件之前,先去思考用户会如何传递参数,如何使用组件。这里我们做的参数比较简单,用户只是传递一个选择器进来。

## 封装过程:

v1.0: 仅仅是实现效果

```
// 初始化样式,第一个li默认有active
    $('.tabs').each((index,element) => {
        $(element).children('.tabs-bar').children('li').eq(0).addClass('active')
        $(element).children('.tabs-content').children('li').eq(0).addClass('active')
    })
// 绑定事件
    $('.tabs').on('click','.tabs-bar li',function (e) {
        var $li = $(e.currentTarget)
        $li.addClass('active').siblings().removeClass('active')
        var index = $li.index()

        var $content = $li.closest('.tabs').find('.tabs-content li').eq(index)
        $content.addClass('active').siblings().removeClass('active')
    })


```

v2.0  用构造函数,封装成组件。

```
    function Tabs(selector) {
        this.element = $(selector)
        this.init()
        this.bindEvent()
    }

    Tabs.prototype.init = function () {
        this.element.each((index,element) => {
            $(element).children('.tabs-bar').children('li').eq(0).addClass('active')
            $(element).children('.tabs-content').children('li').eq(0).addClass('active')
        })

    }

    Tabs.prototype.bindEvent = function () {
        this.element.on('click','.tabs-bar li',function (e) {
            var $li = $(e.currentTarget)
            $li.addClass('active').siblings().removeClass('active')
            var index = $li.index()

            var $content = $li.closest('.tabs').find('.tabs-content li').eq(index)
            $content.addClass('active').siblings().removeClass('active')
        })
    }

    new Tabs('.tabs')


```

v3.0  另一种形式,用class类的方式

```
class Tabs {
    constructor(selector) {
        this.elements = $(selector)
        this.init()
        this.bindEvent()
    }

    init() {
        this.elements.each((index, element) => {
            $(element).children('.tabs-bar').children('li').eq(0).addClass('active')
            $(element).children('.tabs-content').children('li').eq(0).addClass('active')
        })

    }

    bindEvent() {
        this.elements.on('click', '.tabs-bar li', function (e) {
            let $li = $(e.currentTarget)
            $li.addClass('active').siblings().removeClass('active')
            let index = $li.index()

            let $content = $li.closest('.tabs').find('.tabs-content li').eq(index)
            $content.addClass('active').siblings().removeClass('active')
        })
    }
}

```