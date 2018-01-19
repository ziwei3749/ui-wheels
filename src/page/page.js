class Page {
    constructor(options) {
        this.options = options
        this.$element = $(options.element)

        var arr = []
        for (var i = 0; i < this.options.total; i++) {
            arr.push(i + 1)
        }

        this.options.arr = arr
        this.options.current_arr = []
        console.log(this.options.arr);
        this.initHtml()


    }

    initHtml() {
        var template = `
                <div class="frank-page">
                    <button class="first">首页</button>
                    <button class="prev">上一页</button>
                    <ol class="pageNumbers"></ol>
                    <button class="next">下一页</button>
                    <button class="last">末页</button>
                </div>
            `
        this.$element.append(template)


        var currentLis = ``
        this.options.arr.forEach((item, index) => {
            this.options.current_arr = this.options.arr.slice(0, this.options.page_size)
        })
        this.options.current_arr.forEach((item) => {
            currentLis += `<li>${item}</li>`
        })
        $('.frank-page .pageNumbers').empty().append(currentLis)
        this.bindEvent()

//            默认给回调传递的参数,就是用户传递的那个
        this.options.pageChange(this.options.currentPage)

//            给样式
        var $currentLi = $('.frank-page .pageNumbers li').eq(this.options.currentPage-1)

        $currentLi.addClass('active').siblings().removeClass('active')
    }


    bindEvent() {
        $('.frank-page .first').on('click', () => {
            console.log(this.options.currentPage);
            var currentLis = ``
            this.options.arr.forEach((item, index) => {
                this.options.current_arr = this.options.arr.slice(0, this.options.page_size)
            })
            this.options.current_arr.forEach((item) => {
                currentLis += `<li>${item}</li>`
            })
            $('.frank-page .pageNumbers').empty().append(currentLis)
            this.options.currentPage = 1



//                给样式
            var $lis = $('.frank-page .pageNumbers li')
            $lis.eq(0).addClass('active').siblings().removeClass('active')

//                给传递当前页码
            this.options.pageChange(1)
        })

        $('.frank-page .last').on('click', () => {
            console.log(this.options.currentPage);
            var currentLis = ``
            this.options.arr.forEach((item, index) => {
                this.options.current_arr = this.options.arr.slice(-this.options.page_size)
            })
            this.options.current_arr.forEach((item) => {
                currentLis += `<li>${item}</li>`
            })
            $('.frank-page .pageNumbers').empty().append(currentLis)
            this.options.currentPage = this.options.total

            var $lis = $('.frank-page .pageNumbers li')
            $lis.eq($lis.length -1).addClass('active').siblings().removeClass('active')

//                给回调传递参数,传递末页的页码
            this.options.pageChange(this.options.total)
        })

        $('.frank-page .next').on('click', () => {
            var bian = true
            var firstLiNumber = Number($('.frank-page ol li').eq(0).text())
            if (firstLiNumber + this.options.page_size - 1 >= this.options.total) {
                bian = false
            }

            if (this.options.currentPage >= this.options.total) {
                return
            } else {
                this.options.currentPage += 1
            }


            console.log('currentPage', this.options.currentPage);
            console.log('最大边界', firstLiNumber + this.options.page_size - 1);
            console.log('总页数', this.options.total);


            if (bian) {
                var $lis = $('.frank-page ol li')

                for (var i = 0; i < this.options.page_size; i++) {
                    var liText = $lis.eq(i).text()

                    $lis.eq(i).text(Number(liText)+ 1)
                    console.log('liText',liText);
                    console.log('this.options.currentPage',this.options.currentPage);
                    if(liText == this.options.currentPage){
                        $lis.eq(i-1).addClass('active').siblings().removeClass('active')
                    }
                }

                $('.frank-page .pageNumbers').append($lis)
            }


        })

        $('.frank-page .prev').on('click', () => {

            var bian = true
            var lastLiNumber = Number($('.frank-page ol li').eq($('.frank-page ol li').length - 1).text())
//                当前页 加上 一个值 ,如果小于等于1,就不能再变了

//                5 减去 ? <= 1
            if (lastLiNumber - (this.options.page_size-1) <= 1) {
                bian = false
            }

//                当前页 小于 1,那么当前页就不能再小了
            if (this.options.currentPage <= 1) {
                return
            } else {  //否则,就可以一直减少1
                this.options.currentPage -= 1
            }

            console.log('currentPage', this.options.currentPage);
            console.log('最小边界', lastLiNumber - (this.options.page_size-1));
            console.log('总页数', this.options.total);


            if (bian) {
                var $lis = $('.frank-page ol li')
                for (var i = 0; i < this.options.page_size; i++) {
                    var liText = $lis.eq(i).text()

                    $lis.eq(i).text(Number(liText)- 1)

                    if(liText == this.options.currentPage){
                        $lis.eq(i+1).addClass('active').siblings().removeClass('active')
                    }
                }

                $('.frank-page .pageNumbers').append($lis)
            }


        })

        var pageChange = this.options.pageChange()
        $('.frank-page ol').on('click', 'li', (e) => {
            $(e.currentTarget).addClass('active').siblings().removeClass('active')
            this.options.pageChange(Number(e.currentTarget.innerHTML))
        })

    }


}