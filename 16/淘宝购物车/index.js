function Shop(obj) {
    //获取最大盒子
    this.box = document.querySelector(obj.el)
    //获取商品盒子
    this.header = this.box.querySelector(".boo")
    //获取数据
    this.data = obj.data
    console.log(this.data)
    //初始化
    this.init()
}
Shop.prototype = {
    constructor: Shop,
    init: function () {
        this.render()
        this.addEvent()
    },
    //渲染
    render: function () {
        this.header.innerHTML = this.data.map(function (item) {
            // console.log(item)
            return `<div>
            <input type="checkbox" name="" class="checkList">
            <span>${item.name}</span>
            <ul>         
                  ${item.children.map(function(item2){
                    return ` <li>  <input type="checkbox" name="" class="checkOne">
                    <span>${item2.name}</span>
                    单价<span>${item2.price}</span>
                    <button class="reduce">-</button>
                    <input type="text" value="1">
                    <button class="add">+</button>
                    <button class="delOne">删除</button>  </li>`
                  }).join("")}           
            </ul>
        </div>
            `
        }).join("")
    },
    //事件
    addEvent: function () {
        var that = this
        this.box.addEventListener("click", function (e) {
            var tar = e.target
            switch (tar.className) {
                //点击减号
                case "reduce":
                    tar.nextElementSibling.value--
                    tar.nextElementSibling.value < 1 ? (tar.nextElementSibling.value = 1) && alert("已经是最少数量") : ""
                    this.allPrice()
                    break;
                    //点击加号
                case "add":
                    tar.previousElementSibling.value++
                    this.allPrice()
                    break;
                    //点击单选
                case "checkOne":
                    var flag = [...tar.parentNode.parentNode.querySelectorAll(".checkOne")].every(function (item) {
                        return item.checked
                    })
                    tar.parentNode.parentNode.previousElementSibling.previousElementSibling.checked = flag
                    this.allPrice()
                    break;
                    // 点击单行删除
                case "delOne":
                    var len = tar.parentNode.parentNode
                    tar.parentNode.parentNode.removeChild(tar.parentNode)
                    len.children.length === 0 ? len.previousElementSibling.parentNode.parentNode.removeChild(len.previousElementSibling.parentNode) : ""
                    this.allPrice()
                    break;
                    // 点击店铺选中
                case "checkList":
                    var el = [...tar.nextElementSibling.nextElementSibling.children]
                    el.forEach(function (item) {
                        console.log(item)
                        item.querySelector(".checkOne").checked = tar.checked
                    })
                    this.allPrice()
                    break;
                    //点击全选
                case "checkAll":
                    [...tar.previousElementSibling.querySelectorAll("input")].forEach(function (item) {
                        item.checked = tar.checked
                    })
                    this.allPrice()
                    break;
                    // 点击批量删除
                case "delAll":
                    var check = [...that.header.querySelectorAll(".checkOne:checked")]
                    console.log(check)
                    check.forEach(function (item) {
                        item.parentNode.parentNode.removeChild(item.parentNode)
                    })
                    this.allPrice()
                    break;
            }
        })
    },
    //封装总价计算方法
    allPrice: function () {    
        var check = [...this.header.querySelectorAll(".checkOne:checked")]
        check.forEach(function (item) {
            this.box.querySelector(".allPrice").innerHTML+=item.mextElementSibgling.nextElementSibling * item.mextElementSibgling.nextElementSibling.mextElementSibgling.nextElementSibling
        })
    }

}