function Pagation(opt) {
    // 接收数据
    this.el = document.querySelector(opt.el)
    this.data = opt.data
    // 获取必要的节点
    this.pageDom = this.el.querySelector("#pageDom")
    this.tbody = this.el.querySelector("tbody")
    this.pagation = this.el.querySelector(".pagation")
    this.footer = this.el.querySelector(".footer")
    this.goCode = this.el.querySelector(".goCode")
    this.sort = this.el.querySelector("#sort")
    this.search = this.el.querySelector(".search")
    // 处理原始数据
    this.FullData = this.getFullData()
    // 中间层数据
    this.midData = this.FullData.slice()
    console.log(this.midData)
    // 声明页码 默认值为0
    this.pageCode = 0
    // 获取每一页显示的数据个数
    this.pageNum = +this.pageDom.value
    // 分组
    this.pageLen = Math.ceil(this.midData.length / this.pageNum)
    // 初始化
    this.init()
    // 调用事件函数
    this.addEvent()
}

Pagation.prototype = {
    constructor: Pagation,
    init: function () {
        this.pageCode = 0
        // （页码 - 1） * 每个数据个数
        var data = this.midData.slice(this.pageCode * this.pageNum, this.pageCode * this.pageNum + this.pageNum)
        // console.log(this.pageCode, this.pageNum)
        // console.log(data)
        // 调用渲染内容函数
        this.renderContent(data)
        // 调用渲染尾部函数
        this.renderFooter()


    },
    getFullData: function () {
        var data = []
        for (var key in this.data) {
            data = data.concat(this.data[key])

        }
        return data
    },
    renderContent: function (data) {
        var that = this
        that.tbody.innerHTML = data.map(function (item) {
            return `  <tr>
                            <td>
                                <img src="" alt="">
                            </td>
                            <td>
                                ${item.name}
                            </td>
                            <td>
                                ${item.price}
                            </td>
                        </tr>`
        }).join("")
    },
    renderFooter: function () {
        var str = ''
        for (var i = 1; i <= this.pageLen; i++) {
            str += `<button class="qwe ${i === 1?"active":""}"> ${i}</button>`
        }
        this.pagation.innerHTML = str;
    },
    addEvent: function () {
        var that = this;
        this.footer.addEventListener("click", function (e) {
            var tar = e.target; //获取事件源
            if (tar.classList.contains("qwe")) {
                var index = tar.innerHTML - 1
                that.change(index)
            }
            if (tar.className === "prev") {
                var index = that.pageCode - 1
                that.change(index)
            }

            if (tar.className === "next") {
                var index = that.pageCode + 1
                that.change(index)
            }

            if (tar.className === "go") {
                var index = +that.goCode.value
                that.change(index - 1)
            }

        })
        this.pageDom.addEventListener("change", function () {
            // 获取每一页显示的数据个数
            that.pageNum = +that.pageDom.value
            // 分组
            that.pageLen = Math.ceil(that.midData.length / that.pageNum)
            // 初始化
            that.init()
        })
        this.sort.addEventListener("change", function () {
            that.midData.sort(function (a, b) {
                return a.price - b.price
            })
            that.init()
        })
        this.search.addEventListener("input", function () {
            var val = that.search.value
            that.midData = that.FullData.filter(function (item) {
                return item.name.includes(val)
            })
            that.pageLen = Math.ceil(that.midData.length / that.pageNum)
            that.init()
        })

    },
    change: function (index) {
        var that = this
        if (index < 0 || index > that.pageLen - 1) {
            alert("很遗憾，没有该页码")
            return;
        }
        that.pagation.children[that.pageCode].classList.remove("active")
        that.pageCode = index
        that.pagation.children[that.pageCode].classList.add("active")
        var data = that.midData.slice(that.pageCode * that.pageNum, that.pageCode * that.pageNum + that.pageNum)
        that.renderContent(data)
    }
}