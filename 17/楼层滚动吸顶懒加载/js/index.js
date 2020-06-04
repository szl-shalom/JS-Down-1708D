function Floor(opt) {
    // 
    this.box = document.querySelector(opt.box)
    this.header = this.box.querySelector(".header")
    this.banner = this.box.querySelector(".banner")
    this.floorUl = this.box.querySelector(".floor-ul")
    this.floorFixed = document.querySelector(".floor-fixed")
    this.floorFixedUl = this.floorFixed.querySelector(".floor-fixed-ul")
    this.index = 0
    this.data = opt.data
    this.init()
}



Floor.prototype = {
    constructor: Floor,
    init: function () {
        // 调用渲染函数
        this.render()

        this.floorUlLis = [...this.floorUl.querySelectorAll("li")]

        this.floorUlLisTops = this.floorUlLis.map(function (item) {
            return item.offsetTop
        })
        // 获取所有的图片
        this.imgs = [...this.floorUl.querySelectorAll("img")]
        //调用事件函数
        this.addEvent()
    },
    addEvent: function () {
        var that = this
        var headerTop = that.header.offsetTop
        document.addEventListener("scroll", function () {
            // 获取滚动条滚动的距离
            var scrollTop = document.documentElement.scrollTop
            // 获取headee距离顶部的距离
            if (scrollTop > headerTop) {
                // 吸顶
                that.header.classList.add("active")
                that.banner.style.marginTop = that.header.offsetHeight + "px"
            } else {
                that.header.classList.remove("active")
                that.banner.style.marginTop = 0
            }
            // 楼层滚动
            that.floorUlLisTops.forEach(function (item, index) {
                if (scrollTop >= item - that.header.offsetHeight) {
                    // 先把原来的取消掉
                    that.floorFixedUl.children[that.index].classList.remove("active")
                    that.index = index
                    that.floorFixedUl.children[that.index].classList.add("active")

                }
            })


            //懒加载
            that.imgs.forEach(function (item) {
                var pos = item.getBoundingClientRect()
                if (pos.top < window.innerHeight) {
                    setTimeout(function () {
                        item.src = item.getAttribute("data-src")
                    }, 2000)
                }
            })


        })
        // 右侧定位导航
        that.floorFixedUl.addEventListener("click", function (e) {
            var tar = e.target;
            if (tar.nodeName === "LI") {
                // 获取下标
                var index = +tar.getAttribute("ind")
                that.scroll(that.floorUlLisTops[index] - that.header.offsetHeight)
                // document.documentElement.scrollTop = 
            }
        })
    },
    render: function () {
        this.floorUl.innerHTML = this.data.map(function (item) {
            return `<li><img src="images/timg.gif" alt="" data-src="images/${item}"></li>`
        }).join("")

        this.floorFixedUl.innerHTML = this.data.map(function (item, index) {
            return `<li ind = ${index}>${index +1}</li>`
        }).join("")
    },
    scroll: function (num) {
        var flag = num > document.documentElement.scrollTop

        var timer = setInterval(function () {
            if (flag) {
                document.documentElement.scrollTop += 30
            } else {
                document.documentElement.scrollTop -= 30
            }

            if (Math.abs(document.documentElement.scrollTop - num) < 31) {
                document.documentElement.scrollTop = num
                clearInterval(timer)
            }
        }, 1)
    }

}