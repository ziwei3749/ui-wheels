/**
 * Created by lvziwei on 2018/1/17.
 */


function Dialog(options) {
    this.options = options       // 把参数挂到this上的options上,是为了给后面的init使用
    this.init()
}

Dialog.prototype.init = function () {
    var {title,content,buttons} = this.options      // es6的解构赋值而已
                                                    // es6的字符号拼接
    var template = `
                <div class="frank-dialog">
                    <div class="frank-dialog-wrapper">
                        <header class="frank-dialog-header">${title}</header>
                        <main class="frank-dialog-content">${content}</main>
                        <footer class="frank-dialog-footer"></footer>
                    </div>
                </div>
            `

    var $buttons = buttons.map((button) => {         // 循环buttons,循环里生成了button,并且将其变成jq对象后,添加文本、绑定事件,并return
        var $b = $(`<button></button>`)
        $b.text(button.text)
        $b.on('click',button.action)
        return $b
    })
    var $dialog = $(template)
    $dialog.find('footer').append($buttons)
    this.$dialog = $dialog                            // JQ的append可以接受一个数组


}

Dialog.prototype.close = function () {
    this.$dialog.detach()             // detach() 方法移除被选元素
}

Dialog.prototype.open = function () {
    this.$dialog.appendTo('body')
}
