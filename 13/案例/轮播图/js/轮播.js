function Banner(opt) {
    // 接收参数 
    this.data = opt.data
    this.el = document.querySelector(opt.el)
    // 获取必要的节点
    this.swiperWrapper = this.el.querySelector(".swiper-wrapper")
    this.left = this.el.querySelector(".left")
    this.right = this.el.querySelector(".right")

    // 下标
    this.index = 0
    this.pagation = this.el.querySelector(".pagation")
    //  初始化
    this.init()
}


Banner.prototype = {
    constructor: Banner,
    // 初始化
    init: function () {
        // 业务逻辑

        // 渲染页面
        this.render(this.data)
        // 开启轮播
        this.startBanner()
        // 添加事件
        this.addEvent()
    },
    // 渲染函数
    render: function (data) {
        this.swiperWrapper.innerHTML = data.map(function (item, index) {
            return `
            <div class="swiper-slide ${index===0?"active":""}">
                <img src="./images/${item}" alt="">
            </div>
            `
        }).join("")

        var ul = document.createElement("ul")
        ul.innerHTML = data.map(function (item, index) {
            return `<li ${index === 0?"class=active":""} ind=${index}> </li>`
        }).join("")

        this.pagation.appendChild(ul)
    },
    // 开启轮播
    startBanner: function () {
        var that = this
        this.timer = setInterval(function () {
           that.right.click()
        }, 2000)
    },
    // 添加事件
    addEvent: function () {
        var that = this
        this.el.addEventListener("mouseenter", function () {
            clearInterval(that.timer)
        })
        this.el.addEventListener("mouseleave", function () {
            that.startBanner()
        })
        this.right.addEventListener("click", function () {
            var index = that.index + 1
            that.change(index)
        })

        this.left.addEventListener("click", function () {
            var index = that.index - 1
            that.change(index)
        })
        this.pagation.addEventListener("click", function (e) {
            var tar = e.target;
            if(tar.nodeName === "LI"){
                var index = +tar.getAttribute("ind")
                that.change(index)
            }
        })

    },
    change: function (index) {
        var that = this;
        that.swiperWrapper.children[that.index].classList.remove("active")
        that.pagation.firstElementChild.children[that.index].classList.remove("active")
        that.index = index
        if (that.index >= that.data.length) {
            that.index = 0
        }

        if (that.index < 0) {
            that.index = that.data.length - 1
        }
        that.pagation.firstElementChild.children[that.index].classList.add("active")
        that.swiperWrapper.children[that.index].classList.add("active")
    }
}