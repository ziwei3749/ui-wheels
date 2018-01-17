
# dialog组件的使用方法和封装思路

## 使用方法:

- 1.粘贴tab组件的html代码

```
<button class="btn">打开dialog</button>

````
- 2.引入依赖的css和js

```
 <link rel="stylesheet" href="./dialog.css">
 
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
<script src="./dialog.js"></script>

```

- 3.使用例子,在点击btn时,实例化dialog,并传递参数对象

```
    $('.btn').click('on', function () {
        var dialog = new Dialog({
            title: '标题',
            content: '内容',
            buttons: [
                {
                    text: '确定',
                    action: function () {
                    }
                },
                {
                    text: '取消',
                    action: function () {
                        console.log(dialog);
                        dialog.close()
                    }
                }
            ]
        })
        dialog.open()
    })
```

- 4.参数介绍

用户可以传递一个对象
> Attributes
```
    title:    (String) 设置弹出框的标题
    content : (String) 设置弹出框的内容
    buttons:  (Array)  设置按钮的文本和执行的函数  
```

> Methods

```
    dialog实例拥有2个方法
    
    open:  打开dialog
    close: 关闭dialog

```

## 封装思路:

这里的封装思路,核心需要初始化时,用js来创建html模板,需要了解一些DOM操作的基本知识。


- 对内分层原则的体现:
 
    这里我们违反了分层原则,因为使用js去创建html,但是为了方便用户,而且不少弹出框组件都是这么设计的。
    
- 对外面向接口编程原则: 

    封装组件之前,先去思考用户会如何传递参数,如何使用组件。
    我们大致思路上需要做3件事情,
    
    (1) init生成一个html弹出框模板
    
    (2) 生成的模板需要有用户传递的参数title、content、button,button需要绑定上用户传递进来的函数
    
    (3) 生成的dialog需要有close()和open()方法
        
    
    ```
        通过伪代码,思考我们的封装前的思考用户可能会如何调用。

       var dialog = new Dialog({
                title: '标题',
                content: '内容',
                buttons: [
                    {
                        text: '确定',
                        action: function () {
                        }
                    },
                    {
                        text: '取消',
                        action: function () {
                            dialog.close()
                        }
                    }
                ]
            }) 
        
       用户还可以调用dialog.open() dialog.close()
    ```


## 封装过程:

v1.0: 用构造函数实现封装

```
function Dialog(options) {
    this.options = options
    this.init()
}

Dialog.prototype.init = function () {
    var {title,content,buttons} = this.options
    var template = `
                <div class="fanke-dialog">
                    <header>${title}</header>
                    <main>${content}</main>
                    <footer></footer>
                </div>
            `
    var $buttons = buttons.map((button) => {
        var $b = $(`<button></button>`)
        $b.text(button.text)
        $b.on('click',button.action)
        return $b
    })
    var $dialog = $(template)

    this.$dialog = $dialog.append($buttons)


}

Dialog.prototype.close = function () {
    this.$dialog.detach()                    // detach() 方法移除被选元素
}

Dialog.prototype.open = function () {
    this.$dialog.appendTo('body')
}



```

v2.0  用class实现封装

```
    class Dialog {
        constructor(options) {
            this.options = options
            this.init()
        }

        init() {
            var {title, content, buttons} = this.options
            var template = `
                <div class="frank-dialog">
                    <header>${title}</header>
                    <main>${content}</main>
                    <footer></footer>
                </div>
            `

//            这个我们要把buttonsTemplate放到footer里面,并且里面的2个button对象,都要有text/action方法
            var buttonsTemplate = buttons.map((button) => {
                var $b = $(`<button></button>`)
                $b.text(button.text)
                $b.on('click', button.action)
                return $b
            })
            var $dialog = $(template)  // 把模板也变JQ对象,都是JQ对象才好操作,不然字符串不好操作
            $dialog.append(buttonsTemplate)    

            this.$dialog = $dialog
        }

        close() { 
            this.$dialog.detach()             // detach() 方法移除被选元素
        }

        open() {
            this.$dialog.appendTo('body')
        }
    }


```

v3.0  优化class中init()里的多段代码

```
/**
 *  用户传递一个参数对象进来
 *  我们return一个dialog实例,这个dialog实例拥有close() open()方法
 */
class Dialog {
    constructor(options) {
        this.options = options
        this.init()
    }

    getTemplate(){
        var {title, content} = this.options
        var template = `
                <div class="frank-dialog">
                    <header>${title}</header>
                    <main>${content}</main>
                    <footer></footer>
                </div>
            `
        return template
    }

    getButtons(){
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
        $dialog.append(this.getButtons())
        this.$dialog = $dialog
    }

    close() {
        this.$dialog.detach()       // detach() 方法移除被选元素
    }

    open() {
        this.$dialog.appendTo('body')
    }

}


```