# tab组件的使用方法和封装思路

## 使用方法:

- 1.粘贴tab组件的html代码

```
<div class="pageBox pageSpan"></div>

````
- 2.引入依赖的css和js

```
    <link rel="stylesheet" href="page.css"/>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
    <script src="page.js"></script>
```

- 3.作为JQ插件的形式调用

```
    $(function () {
        //分页
        $(".pageSpan").createPage({
            pageIndex: 2,
            totalPage: 5,
            backFn: function (pageIndex) {
                console.log(pageIndex);
            }
        });
    });
```

- 4.createPage参数介绍

```
pageIndex : Number           // 当前页码
totalPage : Number           // 总页码数量
backFn    : Function         // 在页码change时触发回调函数,传递参数是当前页码    

```

## 封装思路:

这里的封装思路,大同小异,这里分页的封装也是,一共2步,生成Html,以及bindEvent

分页组件最需要注意的,我觉得是各种情况下,中间页码部分生成不同的html,循环的边界条件、判断条件是非常需要注意和思考清楚的。


以比较麻烦的中间页面部分的html来举例。
- 如果总页码数量小于等于3页,我就全部展示
- 如果总页码数量大于3页,我可能会加省略号,这里要根据当前的页码分4个状态
    + 就是只有前面有省略号时的状态
    + 只有后面有省略号的状态
    + 前面和后面都没有省略号的状态
    + 前后都要有省略号的状态。
    
可以想象,这里需要思考的边界条件比较多,在不同状态下,循环的次数也是需要思考的边界条件。


另外,这里依旧是通过class来控制样式的,遵循对内分层原则,尽可能不要去用JS操作css。
````
 if (page.totalPage <= 3) {  // 小于等于3个就全部展示
                for (var i = 1; i <= page.totalPage; i++) {
                    var template = page.pageIndex == i ? `<span class="curr" title="第${i}页">${i}</span>` : `<a class="tcdNumber" href="javascript:void(0);" title="第${i}页">${i}</a>`
                    obj.append(template)
                }

} else if (page.totalPage > 3) {    // 总页数大于3时,我们要分情况套路了,  最多显示5个,如果当前页码-2,依旧不能把前面的页码显示全,就给……   ; 如果当前页面+2,依旧不能把后面的页面显示全,也给……
    if (page.pageIndex - 2 > 1 && page.pageIndex + 2 >= page.totalPage) {   // 只需要在最前面加……
        obj.append('<span>...</span>')
        for (var i = page.pageIndex - 2; i <= page.totalPage; i++) {
            var template = page.pageIndex == i ? `<span class="curr" title="第${i}页">${i}</span>` : `<a class="tcdNumber" href="javascript:void(0);" title="第${i}页">${i}</a>`
            obj.append(template)
        }
    } else if (page.pageIndex - 2 <= 1 && page.pageIndex + 2 < page.totalPage) {   // 只需要在最后面加 ……
        for (var i = 1; i <= page.pageIndex + 2; i++) {
            var template = page.pageIndex == i ? `<span class="curr" title="第${i}页">${i}</span>` : `<a class="tcdNumber" href="javascript:void(0);" title="第${i}页">${i}</a>`
            obj.append(template)
        }
        obj.append('<span>...</span>')
    } else if (page.pageIndex - 2 <= 1 && page.pageIndex + 2 >= page.totalPage) {    // 最后和最前面都不需要加……
        for (var i = 1; i <= page.totalPage; i++) {
            var template = page.pageIndex == i ? `<span class="curr" title="第${i}页">${i}</span>` : `<a class="tcdNumber" href="javascript:void(0);" title="第${i}页">${i}</a>`
            obj.append(template)
        }
    } else if (page.pageIndex - 2 > 1 && page.pageIndex + 2 < page.totalPage) {
        obj.append('<span>...</span>')
        for (var i = page.pageIndex - 2; i <= page.pageIndex + 2; i++) {
            var template = page.pageIndex == i ? `<span class="curr" title="第${i}页">${i}</span>` : `<a class="tcdNumber" href="javascript:void(0);" title="第${i}页">${i}</a>`
            obj.append(template)
        }
        obj.append('<span>...</span>')
    }
}


````
