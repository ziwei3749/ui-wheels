# slide组件的使用方法和封装思路

## 使用方法:

- 1.粘贴slide组件的html代码

```
<div class="slide">
    <ol>
        <li><img src=''></li>
        <li><img src=''></li>
        <li><img src=''></li>
    </ol>
</div>

````
- 2.引入依赖的css和js

```
 <link rel="stylesheet" href="./slide.css">
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
<script src="./slide.js"></script>

```

- 3.在js里实例化Tab组件

```
    var slide = new Slide({
        element: '.slide',
        autoPlay: false,
        arrow: true,
    })
```

- 4.参数介绍

可以传递一个obj对象

> Attributes
```
    element  : (String)  选择器元素
    autoPlay : (Boolean) 是否自动轮播
    arrow    : (Boolean) 是否需要【上一步】【下一步】  
```

> Methods

```
    dialog实例拥有5个方法
    
    slide.go(2)   : 跳到到某一页
    slide.next()  : 跳到下一页
    slide.prev()  : 跳到前一页
    slide.play()  : 自动轮播
    slide.stop()  : 停止轮播

```

## 封装思路:

轮播图的封装,也是先思考用户如何传递参数。

我们这里可以传递的参数较少,选择器、自动轮播、显示arrow
slide实例,有很多方法,其中go()是整个组件的核心

因为大多数功能都需要用到go(),该方法的麻烦的地方主要是需要思考比较多的边界条件

整个类,按照先后顺序,主要做了几件事,

- constructor里记录了一下之后可能会用到的变量。
- 初始化,一些需要用JS生成的html,主要是前进后退btn,以及根据Img的宽度,设置容器宽度
- 绑定事件,给前进后退btn绑定对应的事件
- go方法是核心,里面考虑了很多的边界条件
- 这里无缝轮播的实现思路,是通过在最前面和最后面额外添加一张图片实现的。



## 封装过程:



```
class Slide {
    constructor(options) {
        this.options = options              // 记录参数之后的函数会用到
        this.$element = $(this.options.element)
        this.$element.addClass('frank-slide')
        this.time = undefined

        this.initHtml()
        this.bindEvent()
        this.go(1)

        if (this.options.autoPlay) {        // 是否轮播的判断
            this.play()
        }

        if (this.options.arrow == false) { // 是否显示【前一页】【后一页】btn
//                隐藏button
            this.$prev.addClass('hide')
            this.$next.addClass('hide')
        } else {
            this.$prev.removeClass('hide')
            this.$next.removeClass('hide')
        }
    }

    initHtml() {
        this.width = $('.frank-slide > ol > li').width()
        $('.frank-slide').width(this.width)

//            生成2个btn
        this.$prev = $('<button class="frank-slide-prev-btn">上一页</button>')
        this.$next = $('<button class="frank-slide-next-btn">下一页</button>')
        $('.slide').append(this.$prev)
        $('.slide').append(this.$next)
    }


    bindEvent() {
        this.$prev.on('click', () => this.prev())
        this.$next.on('click', () => this.next())
    }

    go(index) {
        var $items = $('ol').children('li')
        var $ol = $('.frank-slide ol')
        /**
         * 如果Index == 0 , 我们应该滑到到0,在过渡结束事件(transitionend)之后,隐藏ol,移动到最后一页后,在show()
         * 如果 0<Index<4 , 不用做边界判断,给index,就用go挑
         * 如果index == 最后一页, 我们应该滑到最后一页,在过度结束事件后,先隐藏,移动到第一页后,在show()
         */
        if (index == 0) {
            $ol.css('transform', `translateX(${-index * this.width}px)`)
            $ol.one('transitionend', () => {

                $ol.hide().offset()
                $ol.css('transform', `translateX(${-($items.length - 2) * this.width}px)`).show()
                this.currentIndex = $items.length - 2
            })
        } else if (index == ($items.length - 1)) {
            $ol.css('transform', `translateX(${-index * this.width}px)`)
            $ol.one('transitionend', () => {
                console.log('transitionend');

                $ol.hide().offset()
                $ol.css('transform', `translateX(${-1 * this.width}px)`).show()
                this.currentIndex = 1
            })
        } else {
            $ol.css('transform', `translateX(${-index * this.width}px)`)
            this.currentIndex = index
        }
    }

    next() {
        this.currentIndex = this.currentIndex + 1
        this.go(this.currentIndex)
    }

    prev() {
        this.currentIndex = this.currentIndex - 1
        this.go(this.currentIndex)
    }

    play() {  // 自动轮播,轮播时间设置为1秒了,也可以修改成可配置参数,让用户传递进来
        this.time = setInterval(() => {
            this.next()
        }, 1000)
    }

    stop() {   // 停止自动轮播,就是清除定时器
        clearInterval(this.time)
    }
}


```



