// ES6 语法

/**
 * 使用class的语法,更加简洁。
 * 需要注意的就是:
 * (1)constructor里放的是自有属性,
 * (2)想在Tabs.prototype上挂的共有方法,就写在constructor外面,方法和方法之间不能用逗号分隔
 */
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
