(function () {
    var pager = {
        init: function (obj, page) {
            pager.fillHtml(obj, page)
            pager.bindEvent(obj, page)
        },

        fillHtml(obj, page){
            // 先清空之前的html
            obj.empty()
            // 生成 首页 上一页
            if (page.pageIndex > 1) {
                obj.append('<a href="javascript:void(0);" title="首页" class="firstPage">首页</a>')
                obj.append('<a href="javascript:void(0);" title="上一页" class="prevPage">上一页</a>')
            } else {
                obj.append('<span title="首页" class="disabled" class="firstPage">首页</span>')
                obj.append('<span title="上一页" class="disabled" class="prevPage">上一页</span>')
            }

            // 生成 中间页码 的规则。
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


            // 生成 下一页 尾页

            if (page.pageIndex == page.totalPage) {  // 如果是最后一页,就不能点击
                obj.append('<span title="下一页" class="disabled" class="nextPage">下一页</span>')
                obj.append('<span title="尾页" class="disabled" class="endPage">尾页</span>')
            } else {
                obj.append('<a href="javascript:void(0);" title="下一页" class="nextPage">下一页</a>')
                obj.append('<a href="javascript:void(0);" title="尾页" class="endPage">尾页</a>')
            }
            obj.append(`<span>当前第 <span class="colorRed">${page.pageIndex}</span> 页/共<span>${page.totalPage}</span>页</span>`)

        },

        bindEvent(obj, page){
            console.log(obj);
            console.log(page);
            // 给btn绑定事件
            // 默认清除绑定
            obj.off('click', '.firstPage')
            obj.off('click', '.prevPage')
            obj.off('click', '.nextPage')
            obj.off('click', '.endPage')
            obj.off('click', '.tcdNumber')


            obj.on('click', 'a.tcdNumber', function () {
                page.pageIndex = parseInt($(this).html())                   // 获取当前被点击的li的innerHTML
                pager.fillHtml(obj, {pageIndex: page.pageIndex, totalPage: page.totalPage})    // 获取当前pageIndex,然后重新生成html。
                if (typeof page.backFn == 'function') {
                    page.backFn(page.pageIndex)
                }
            })


            obj.on('click', 'a.firstPage', function () {
                page.pageIndex = 1
                pager.fillHtml(obj, {pageIndex: page.pageIndex, totalPage: page.totalPage})
                if (typeof page.backFn == 'function') {
                    page.backFn(page.pageIndex)
                }
            })

            obj.on('click', 'a.prevPage', function () {
                console.log(page.pageIndex);
                page.pageIndex--
                pager.fillHtml(obj, {pageIndex: page.pageIndex, totalPage: page.totalPage})
                if (typeof page.backFn == 'function') {
                    page.backFn(page.pageIndex)
                }
            })

            obj.on('click', 'a.nextPage', function () {
                page.pageIndex++
                pager.fillHtml(obj, {pageIndex: page.pageIndex, totalPage: page.totalPage})
                if (typeof page.backFn == 'function') {
                    page.backFn(page.pageIndex)
                }
            })

            obj.on('click', 'a.endPage', function () {
                page.pageIndex = page.totalPage
                pager.fillHtml(obj, {pageIndex: page.pageIndex, totalPage: page.totalPage})
                if (typeof page.backFn == 'function') {
                    page.backFn(page.pageIndex)
                }
            })

        },

    }


    //扩展到JQuery的原型对象上
    $.fn.createPage = function (options) {
        var page = $.extend({                   // 跟用户传递进来的合并,如果不传递,就当做是默认值了
            pageIndex: 1,
            totalPage: 22,
            backFn: function (pageIndex) {
            }
        }, options)
        // 当用户代用createPage()时,就执行init()
        pager.init(this, page)
    }


})($)