function Pagation(opt) {
    this.el = document.querySelector(opt.el)
    this.data = opt.data
    this.tbody = this.el.querySelector("tbody")
    this.pagation = this.el.querySelector(".pagation")
    //
    var arr = []
    for (var key in this.data) {
        arr = arr.concat(this.data[key])
    }
    this.curData = arr; //处理后的数据
    this.num = 3
    this.index = 0
    this.init()
    this.addEvent()
}


Pagation.prototype = {
    constructor: Pagation,
    init: function () {
        this.index = 0
        this.len = Math.ceil(this.curData.length / this.num)
        var data = this.curData.slice(this.index * this.num, this.index * this.num + this.num)
        this.render(data)
        this.renderFooter()
    },
    render: function (data) {
        this.tbody.innerHTML = data.map(function (item) {
            return ` <tr>
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
        console.log(this.len)
        for (var i = 1; i <= this.len; i++) {
            str += `<button ${i === 1 ? "class=active":""}>${i}</button>`
        }


        this.pagation.innerHTML = str
    },
    addEvent: function () {
        var that = this
        this.pagation.addEventListener("click", function (e) {
            var tar = e.target;
            if (tar.nodeName === "BUTTON") {
                that.index = tar.innerHTML - 1
                var data = that.curData.slice(that.index * that.num, that.index * that.num + that.num)
                that.render(data);
                [...that.pagation.children].forEach(function (item) {
                    item.classList.remove("active")
                })
                tar.classList.add("active")
            }


        })
        pageDom.addEventListener("change", function () {
            that.num = +this.value
            that.init()
        })

        sort.addEventListener("change", function () {
            if (this.value === "1") {
                that.curData.sort(function (a, b) {
                    return a.price - b.price
                })
                that.init()
            }

        })
    }
}