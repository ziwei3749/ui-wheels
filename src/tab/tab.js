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


// 构造函数的实现方式

// function Tabs(selector) {
//                                      // 用new调用构造函数时, JS自动帮你加了一句话  this.__proto__ = Tabs.prototype
//     this.elements = $(selector)     //  $(selector)首先将调用者传入的选择器转成JQ对象
//
//     this.init()                     //  初始化样式,第一个li默认有类名active。
//     this.bindEvent()                //  绑定事件,点击tab-bar时,就显示对应的tab-content
// }
//
// /**
//  *  因为tab组件可能不止一个, this.elements是伪数组,所以需要遍历设置默认样式
//  */
//
// Tabs.prototype.init = function () {
//     this.elements.each((index, element) => {
//         $(element).children('.tabs-bar').children('li').eq(0).addClass('active')
//         $(element).children('.tabs-content').children('li').eq(0).addClass('active')
//     })
//
// }
//
// /**
//  * 点击tab-bar需要做2件事:
//  * (1) 被点击的tab-bar里的li,应该切换到active状态
//  * (2) 被点击li对应tab-content里的li,应该切换到active状态
//  */
// Tabs.prototype.bindEvent = function () {
//     this.elements.on('click', '.tabs-bar li', function (e) {
//         var $li = $(e.currentTarget)
//         $li.addClass('active').siblings().removeClass('active')
//         var index = $li.index()
//         // 注意: 在获取content时,不要用$('.tabs-content li')来获取,因为可能不止有一个组件,所以用从当前$li找离得最近的.tabs元素才更可靠
//         var $content = $li.closest('.tabs').find('.tabs-content li').eq(index)
//         $content.addClass('active').siblings().removeClass('active')
//     })
// }











