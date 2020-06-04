function CreateDate(opt) {
    //设置默认参数
    this.setting = Object.assign({}, {
        date: new Date()
    }, opt)

    console.log(this.setting)
    // 获取必要的节点
    this.el = document.querySelector(this.setting.el)
    // 获取当前年月日
    this.year = this.setting.date.getFullYear()
    this.month = this.setting.date.getMonth()
    this.day = this.setting.date.getDate()
    //进行初始化
    this.init()
}


CreateDate.prototype = {
    constructor: CreateDate,
    init: function () {
        // 调用事件函数
        this.addEvent()
    },
    addEvent: function () {
        var that = this
        //焦点事件
        this.el.addEventListener("focus", function () {
            that.div = document.createElement("div")
            that.div.classList.add("rili")
            that.div.innerHTML = `
            <div class="header">
                <button class="prev">左</button>
                <h3><span class="fullYear">${that.year}</span>年<span class="fullMonth">${that.month + 1}</span>月</h3>
                <button class="next">右</button>
            </div>
            <div class="content">
                <ul>
                    <li>星期一</li>
                    <li>星期二</li>
                    <li>星期三</li>
                    <li>星期四</li>
                    <li>星期五</li>
                    <li>星期六</li>
                    <li>星期日</li>
                </ul>
                <ul class="content-ul"> 
                </ul>
            </div>
            `

            that.el.parentNode.appendChild(that.div)
            that.contentUl = that.div.querySelector(".content-ul")
            that.prev = that.div.querySelector(".prev")
            that.next = that.div.querySelector(".next")
            that.fullYear = that.div.querySelector(".fullYear")
            that.fullMonth = that.div.querySelector(".fullMonth")
            // --
            that.prev.addEventListener("click", function () {
                that.month--
                that.render()
            })
            // ++
            that.next.addEventListener("click", function () {
                that.month++
                that.render()
            })
            // 点击事件
            that.contentUl.addEventListener("click", function (e) {
                var tar = e.target;
                if (tar.className === "active") {
                    that.el.value = `${that.year}-${that.month + 1}-${tar.innerHTML}`
                    that.div.parentNode.removeChild(that.div)
                    that.el.onchange && that.el.onchange()
                }
            })
            that.render()
        })


    },
    render: function () {
        console.log(this.month)
        var year = new Date(this.year, this.month).getFullYear()
        var month = new Date(this.year, this.month).getMonth()

        this.fullYear.innerHTML = year
        this.fullMonth.innerHTML = month + 1

        // 获取上个月最后一天几号
        this.prevDate = new Date(this.year, this.month, 0).getDate()
        // 获取上个月最后一天星期
        this.prevDay = new Date(this.year, this.month, 0).getDay()
        // 渲染本月开头
        this.prevFirstDate = this.prevDate - this.prevDay + 1
        // 获取本月最后一天
        this.curDate = new Date(this.year, this.month + 1, 0).getDate()
        var str = ''
        for (var i = 0; i < this.prevDay; i++) {
            str += `<li>${this.prevFirstDate++}</li>`
        }
        var flag1 = year > this.setting.date.getFullYear()
        var flag2 = year === this.setting.date.getFullYear() && month > this.setting.date.getMonth()
        var flag3 = year === this.setting.date.getFullYear() && month === this.setting.date.getMonth()
        console.log(flag2)
        // console.log(flag1)
        for (var i = 1; i <= this.curDate; i++) {
            if (flag1 || flag2 || (flag3 && i >= this.setting.date.getDate())) {
                str += `<li class="active">${i}</li>`
            } else {
                str += `<li>${i}</li>`
            }
        }
        for (var i = 1; i <= 42 - this.prevDay - this.curDate; i++) {
            str += `<li>${i}</li>`
        }
        this.contentUl.innerHTML = str;
        // 左按钮是否禁用

        if (flag1 || flag2) {
            this.prev.disabled = false
        } else {
            this.prev.disabled = true

        }
    }
}