// 声明构造函数
function Tab(opt) {
    // 接收数据
    this.data = opt.data
    this.el = document.querySelector(opt.el)
    // 获取必要的节点
    this.ulLeft = this.el.querySelector(".ul-left")
    this.ulRight = this.el.querySelector(".ul-right")
    this.right = this.el.querySelector(".right")
    // 设置初始下标
    this.index = 0
    // 进行初始化
    this.init()
}
// 修改构造函数原型
Tab.prototype = {
    constructor: Tab,
    init: function () {
        // 渲染
        this.render(this.data)

        this.h1s = [...this.ulRight.querySelectorAll("h1")]
        this.h1sTop = this.h1s.map(function (item) {
            return item.offsetTop
        })
        console.log(this.h1sTop)
        // 调用事件
        this.addEvent()
    },
    render: function (data) {
        // 左侧盒子渲染
        this.ulLeft.innerHTML = data.map(function (item, index) {
            return ` <li ${index===0?"class=active":""} ind=${index}>${item.title}</li>`
        }).join("")
        // 右侧盒子渲染
        this.ulRight.innerHTML = data.map(function (item, index) {
            return `
            <h1>${item.title}</h1>
           ${item.children.map(function(item){
                return `
                <li>
                    <dl>
                        <dd>
                            <img src="./imgs/${item.img}" alt="">
                        </dd>
                        <dt>
                            <h3>${item.title}</h3>
                            <p>${item.content}</p>
                        </dt>
                    </dl>
                </li>
                `
           }).join("")}
            `
        }).join("")
    },
    addEvent: function () {
        var that = this
        // 给左盒子添加点击事件
        this.ulLeft.addEventListener("click", function (e) {
            var tar = e.target;
            if (tar.nodeName === "LI") {
                //去除原来的类名
                that.ulLeft.children[that.index].classList.remove("active")
                // 修改下标
                that.index = tar.getAttribute("ind")
                // 给点击的添加类名
                that.ulLeft.children[that.index].classList.add("active")
                that.right.scrollTop = that.h1sTop[that.index]
            }
        })

        this.right.addEventListener("scroll", function () {
            var scroll = that.right.scrollTop
            that.h1sTop.forEach(function (item, index) {
                if (scroll > item) {
                    that.ulLeft.children[that.index].classList.remove("active")
                    that.index = index
                    that.ulLeft.children[that.index].classList.add("active")
                }
            })
        })
    }
}