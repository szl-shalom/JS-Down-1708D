function City(opt) {
    // 获取 必要的节点
    this.alert = document.querySelector(".alert")
    this.mask = document.querySelector(".mask")
    this.box = document.querySelector(".box")
    this.con = document.querySelector(".con")
    this.close = document.querySelector(".close")
    this.content = document.querySelector(".content")
    // 接收数据
    this.data = opt.data

    this.init()
}

City.prototype = {
    constructor: City,
    init: function () {
        // 调用渲染函数
        this.render()
        //调用事件函数
        this.addEvent()
    },
    addEvent: function () {
        var that = this
        // 弹框
        this.alert.addEventListener("click", function () {
            that.mask.classList.add("active")
            that.box.classList.add("active")
        })
        // 添加是鼠标划入花簇
        this.everys = [...document.querySelectorAll(".every")]
        this.everys.forEach(function (item, index) {
            //鼠标划入
            item.addEventListener("mouseenter", function () {
                console.log(item)
                item.lastElementChild.classList.add("active")
            })

            // 鼠标划出
            item.addEventListener("mouseleave", function () {
                item.lastElementChild.classList.remove("active")

            })
        })
        // 事件委托

        this.con.addEventListener("click", function (e) {
            var tar = e.target;
            if (tar.className === "checkOne") {
                var inputs = [...tar.parentNode.parentNode.querySelectorAll("input")]
                var inputsAll = tar.parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling

                inputsAll.checked = inputs.some(function (item) {
                    return item.checked
                })
            }

            if (tar.className === "checkAll") {

                var inputs = [...tar.nextElementSibling.nextElementSibling.querySelectorAll("input")]

                inputs.forEach(function (item) {
                    item.checked = tar.checked
                })
            }

        })
        //关闭
        this.close.addEventListener("click", function () {
            that.mask.classList.remove("active")
            that.box.classList.remove("active")
            var inputs = [...that.con.querySelectorAll(".checkOne:checked")]
            that.content.innerHTML = inputs.map(function (item) {
                return item.nextElementSibling.innerHTML
            }).join("")
        })
    },
    render: function () {
        console.log(this.data)
        this.con.innerHTML = this.data.map(function (item) {
            return `
            <div class="every">
                <input type="checkbox" class="checkAll">
                <span>${item.name}</span>
                <div>
                    <ul>
                       ${item.children.map(function(item){
                        return `   <li>
                                        <input type="checkbox" class="checkOne">
                                        <span>${item.name}</span>
                                    </li>`
                       }).join("")}
                    </ul>
                </div>
            </div>
            `
        }).join("")
    }
}