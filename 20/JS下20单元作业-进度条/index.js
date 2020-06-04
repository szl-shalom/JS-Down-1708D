function Test(opt) {
    this.data = opt.data
    // console.log(this.data.result.hourbuyTime.activityTime)
    this.activityTime = this.data.result.hourbuyTime.activityTime //开始时间
    this.endTime = this.data.result.hourbuyTime.endTime //结束时间

    
    this.ul = document.querySelector(".ul")

    this.init()
}


Test.prototype = {
    constructor: Test,
    init: function () {
        // 调用渲染函数
        this.render()
        this.hour = document.querySelector(".hour")
        this.minute = document.querySelector(".minute")
        this.second = document.querySelector(".second")
        // 倒计时功能开启
        this.countTime(this.activityTime, this.endTime)

    },
    //倒计时
    countTime: function (start, end) {
        var redTime = end - start
        console.log(new Date(start).toJSON())
        var that = this;
        setInterval(function () {
            redTime -= 1000
            var time = redTime / 1000
            // 秒
            var second = parseInt(time % 60)
            // 分钟
            var minute = parseInt(time / 60 % 60)
            // 小时
            var hour = parseInt(time / 60 / 60)

            that.hour.innerHTML = hour
            that.second.innerHTML = second

            that.minute.innerHTML = minute

        }, 1000)

    },
    // 渲染
    render: function () {
        var that = this;
        this.ul.innerHTML += this.data.result.productList.map(function (item) {
            return ` <li>
                        <div class="img">
                            <img src="./素材/img/${item.imageUrl}" alt="">
                        </div>
                        <p>${item.name}</p>
                        ${that.progressBar(item.rebate)}
                        <div>
                            <span class="price">￥${item.price}</span>
                            <span class="jdPrice">${item.jdPrice}</span>
                        </div>

                    </li>`
        }).join("")
    },
    // 进度条
    progressBar: function (num) {
        num = num * 100 + "%"
        return `
        <div class="rebate">
            <div style=width:${num}></div>
        </div>
        `
    }
}