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