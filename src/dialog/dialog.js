



/**
 * ES6
 *  用户传递一个参数对象进来
 *  我们return一个dialog实例,这个dialog实例拥有close() open()方法
 */
class Dialog {
    constructor(options) {
        this.options = options
        this.init()
    }

    getTemplate(){                                  // 在init时调用它,getTemplate的作用只是得到弹出框的html
        var {title, content} = this.options
        var template = `
                <div class="frank-dialog">
                    <div class="frank-dialog-wrapper">
                        <header class="frank-dialog-header">${title}</header>
                        <main class="frank-dialog-content">${content}</main>
                        <footer class="frank-dialog-footer"></footer>
                    </div>
                </div>
            `
        return template
    }

    getButtons(){                                    // 在init时调用它,getButtons的作用是得到循环的得到绑定好事件的button,拼接到template上
        var {buttons} = this.options
        //            这个我们要把buttonsTemplate放到footer里面,并且里面的2个button对象,都要有text/action方法
        var buttonsTemplate = buttons.map((button) => {
            var $b = $(`<button></button>`)
            $b.text(button.text)
            $b.on('click', button.action)
            return $b
        })
        return buttonsTemplate
    }


    init() {
        var $dialog = $(this.getTemplate())  // 把模板也变JQ对象,都是JQ对象才好操作,不然字符串不好操作
        $dialog.find('footer').append(this.getButtons())
        this.$dialog = $dialog
    }

    close() {
        this.$dialog.detach()    // detach() 方法移除被选元素
    }

    open() {
        this.$dialog.appendTo('body')
    }

}


/**
 *  构造函数的实现方式
 * @param options
 * @constructor
 */


// function Dialog(options) {
//     this.options = options       // 把参数挂到this上的options上,是为了给后面的init使用
//     this.init()
// }
//
// Dialog.prototype.init = function () {
//     var {title,content,buttons} = this.options      // es6的解构赋值而已
//                                                     // es6的字符号拼接
//     var template = `
//                 <div class="frank-dialog">
//                     <div class="frank-dialog-wrapper">
//                         <header class="frank-dialog-header">${title}</header>
//                         <main class="frank-dialog-content">${content}</main>
//                         <footer class="frank-dialog-footer"></footer>
//                     </div>
//                 </div>
//             `
//
//     var $buttons = buttons.map((button) => {         // 循环buttons,循环里生成了button,并且将其变成jq对象后,添加文本、绑定事件,并return
//         var $b = $(`<button></button>`)
//         $b.text(button.text)
//         $b.on('click',button.action)
//         return $b
//     })
//     var $dialog = $(template)
//     $dialog.find('footer').append($buttons)
//     this.$dialog = $dialog                            // JQ的append可以接受一个数组
//
//
// }
//
// Dialog.prototype.close = function () {
//     this.$dialog.detach()             // detach() 方法移除被选元素
// }
//
// Dialog.prototype.open = function () {
//     this.$dialog.appendTo('body')
// }
