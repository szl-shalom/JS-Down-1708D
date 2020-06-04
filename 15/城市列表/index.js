function Select(opt) {
    // 接收数据
    this.el = document.querySelector(opt.el)
    this.data = opt.data
    // 获取必要的节点
    this.sheng = this.el.querySelector("#sheng")
    this.shi = this.el.querySelector("#shi")
    this.qu = this.el.querySelector("#qu")




    this.init();
}


Select.prototype = {
    constructor: Select,
    init: function () {
        // 调用渲染函数 渲染省
        this.render(this.sheng, this.data, "省")
        // 点击事件
        this.addEvent()


    },
    render: function (el, data, str) {
        el.innerHTML = `<option value="请选择${str}">请选择${str}</option>` + data.map(function (item) {
            return ` <option>${item.name ?item.name:item}</option>`
        }).join("")
    },
    addEvent: function () {
        var that = this
        this.sheng.addEventListener("change", function () {
            that.shengIndex = this.selectedIndex - 1 //取下标
            that.render(that.shi, that.data[that.shengIndex].city, "市")
        })
        this.shi.addEventListener("change", function () {
            that.shiIndex = this.selectedIndex - 1
            var data = that.data[that.shengIndex].city[that.shiIndex].area
            that.render(that.qu, data, "区")
        })
    }
}