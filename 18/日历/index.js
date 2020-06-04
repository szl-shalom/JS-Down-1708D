function CreateDate(opt) {
    this.setting = Object.assign({}, {
        date: new Date()
    }, opt)




    this.prevFlag = this.setting.prevFlag
    this.year = this.setting.date.getFullYear()
    this.month = this.setting.date.getMonth()
    this.day = this.setting.date.getDate()

    this.yearC = this.year
    this.monthC = this.month
    this.dayC = this.day




    this.el = document.querySelector(this.setting.el)
    console.log(this.el)
    this.init()
}

CreateDate.prototype = {
    constructor: CreateDate,
    init: function () {
        this.addEvent()
    },
    addEvent: function () {
        this.el.addEventListener("focus", () => {
            this.div = document.createElement("div")
            this.div.className = "rili"
            this.div.innerHTML = `
            <div class="header">
                <button class="prev">左</button>
                <h3><span class="ww">${this.year}</span>年<span class="qq">${this.month +1}</span>月</h3>
                <button class="next">右</button>
            </div>
            <div class="content">
                <ul class="content-ul"></ul>
            </div>
            `
            this.el.parentNode.appendChild(this.div)
            this.contentUl = this.el.parentNode.querySelector(".content-ul")
            this.prev = this.el.parentNode.querySelector(".prev")
            this.next = this.el.parentNode.querySelector(".next")
            this.qq = this.el.parentNode.querySelector(".qq")
            this.ww = this.el.parentNode.querySelector(".ww")
            this.render()
            this.prev.addEventListener("click", () => {
                this.month--
                this.render()
            })
            this.next.addEventListener("click", () => {
                this.month++
                this.render()
            })
            this.contentUl.addEventListener("click", (e) => {
                var tar = e.target
                if (tar.className === "active") {
                    this.el.value = `${this.year}-${this.month + 1}-${tar.innerHTML}`
                    this.div.remove()
                    this.el.onchange ? this.el.onchange() : null
                }
            })
        })

      

    },
    render: function () {


        this.year = new Date(this.year, this.month, this.day).getFullYear()
        this.month = new Date(this.year, this.month, this.day).getMonth()
        this.day = new Date(this.year, this.month, this.day).getDate()

        this.ww.innerHTML = this.year;
        this.qq.innerHTML = this.month + 1;
        this.prevDate = new Date(this.year, this.month, 0).getDate()
        this.prevDay = new Date(this.year, this.month, 0).getDay()
        console.log(this.prevDay)
        this.curDate = new Date(this.year, this.month + 1, 0).getDate()
        var s = this.prevDate - this.prevDay
        var str = ''

        for (var i = 0; i < this.prevDay; i++) {
            str += `<li>${s++}<li>`
        }

        for (var i = 1; i <= this.curDate; i++) {
            str += `<li ${this.year>this.yearC || this.month>this.monthC || i>=this.dayC ? "class=active":""}>${i}<li>`
        }
        for (var i = 1; i <= 42 - this.prevDay - this.curDate; i++) {
            str += `<li>${i}<li>`
        }
        this.contentUl.innerHTML = str;

        if (this.prevFlag) {
            var flag = this.year === this.yearC && this.month <= this.monthC
            var flag1 = this.year < this.yearC
            console.log(flag, flag1)
            if (flag || flag1) {
                this.prev.disabled = true;
            } else {
                this.prev.disabled = false;

            }
        }

    }
}