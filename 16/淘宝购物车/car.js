function Car(opt) {
    // 合并参数
    this.setting = Object.assign({}, {
        box: ".car"
    }, opt)

    // 获取数据
    this.data = this.setting.data
    console.log(this.data)
    // 获取必要的节点
    this.box = document.querySelector(this.setting.box)
    this.boo = this.box.querySelector(".boo")
    this.checkAll = this.box.querySelector(".checkAll")
    this.allPrice = this.box.querySelector(".allPrice")
    this.init()
}

Car.prototype = {
    constructor: Car,
    init: function () {
        // 调用渲染函数
        this.render()
        // 调用事件函数
        this.addEvent()
    },
    render: function () {
        this.boo.innerHTML = this.data.map(function (item) {
            return ` <div>
            <input type="checkbox" name="" class="checkList">
                <span>${item.name}</span>
                <ul>
                    ${item.children.map(function(item){
                        return `
                        <li>
                            <input type="checkbox" name="" class="checkOne">
                            <span>${item.name}</span>
                            单价<span>${item.price}</span>
                            <button class="reduce">-</button>
                            <span>${item.count}</span>
                            <button class="add">+</button>
                            <button class="delOne">删除</button>
                        </li>
                        `
                    }).join("")}
                   
                </ul>
            </div>`
        }).join("")
    },
    addEvent: function () {
        var that = this
        this.box.addEventListener("click", function (e) {
            var tar = e.target;
            switch (tar.className) {
                // 批量删除
                case "delAll":
                    // 是否删除店铺
                    var inputLists = [...that.box.querySelectorAll(".checkList:checked")]
                    console.log(inputLists)
                    inputLists.forEach(function (item) {
                        that.delEl(item.parentNode)
                    })
                    // 单个删除
                    var inputs = [...that.box.querySelectorAll(".checkOne:checked")]
                    inputs.forEach(function (item) {
                        that.delEl(item.parentNode)
                    })

                    break;
                    // 全选
                case "checkAll":
                    // 第一步获取所有input
                    that.inputs = [...that.boo.querySelectorAll("input")]
                    //让每一input的checked 等于 事件源的 checked
                    that.inputs.forEach(function (item) {
                        item.checked = tar.checked
                    })
                    break;
                    // 单个删除
                case "delOne":
                    that.delOne(tar)
                    break;
                    // 数量++
                case "add":
                    tar.previousElementSibling.innerHTML++
                    break;
                    // 数量__
                case "reduce":
                    if (tar.nextElementSibling.innerHTML <= 1) {
                        var flag = confirm("在减商品就没有！！！！")
                        flag ? that.delOne(tar) : ""
                    } else {
                        tar.nextElementSibling.innerHTML--
                    }
                    break;
                    // 单选
                case "checkOne":
                    //反选店铺
                    // 获取该店铺下的input

                    var inputs = [...tar.parentNode.parentNode.querySelectorAll("input")],
                        parIpt = tar.parentNode.parentNode.previousElementSibling.previousElementSibling;
                    // 利用every特性 反选
                    parIpt.checked = inputs.some(function (item) {
                        return item.checked
                    })
                    // 反选所有
                    that.checkAlls()
                    break;
                    // 选择店铺
                case "checkList":
                    var inputs = [...tar.nextElementSibling.nextElementSibling.querySelectorAll("input")]
                    inputs.forEach(function (item) {
                        item.checked = tar.checked
                    })
                    that.checkAlls()
                    break;
            }
            // 调用总价函数
            that.getAllPrice()
        })
    },
    // 删除元素
    delEl: function (el) {
        el.parentNode.removeChild(el)
    },
    // 点击删除
    delOne: function (tar) {
        var that = this
        if (tar.parentNode.parentNode.children.length === 1) {
            that.delEl(tar.parentNode.parentNode.parentNode)
        } else {
            that.delEl(tar.parentNode)
        }
    },
    // 反选全选
    checkAlls: function () {
        var inputs = [...this.boo.querySelectorAll("input")]
        this.checkAll.checked = inputs.every(function (item) {
            return item.checked
        })
    },
    // 总价计算 
    getAllPrice: function () {
        var sum = 0 //总价初始值
        // 获取所有被选中的商品
        var inputs = [...this.box.querySelectorAll(".checkOne:checked")]
        inputs.forEach(function (item) {
            var price = item.nextElementSibling.nextElementSibling.innerHTML
            var count = item.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML
            sum += price * count
        })

        this.allPrice.innerHTML = sum
    }
}