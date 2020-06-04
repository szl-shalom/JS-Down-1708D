
```flow
st=>start: 开始
ed=>end: 结束
op0=>operation: 获取图片中心点坐标
op=>operation: 监听鼠标滑动事件
op1=>operation: 获取鼠标坐标
op2=>operation: 根据dis设置图片宽度
op3=>operation: 不做任何操作
op4=>operation: 得到距离dis
cond=>condition: 大于临界值
st->op0->op->op1(right)->op4
op4(right)->cond(no)->op3
cond(yes)->op2
```

<!-- 假设有两个点`(x1,y1)`和`(x2,y2)`,那么计算这两点之间距离的公式如下：

$\sqrt{\left ( x2 - x1 \right )^{2}+\left ( y2 - y1 \right )^{2}}$ -->

<!-- $已知：$

$鼠标坐标和图片中心的距离: allDis = 200 - 0$

$图片宽度变化的总长度: allWidth = 128 - 64$

$allDis走完的时候，allWidth刚好也走完$

$问:$

$当allDis走了a的距离的时候，那么allWidth走了b的距离，请求用a表示出b$

$解:$

$两个距离的比例可表示为：\frac{allWidth}{allDis}$

$那么可以这样表示: b = a \times \frac{allWidth}{allDis} $

$根据dis得到图片的宽度可以如下表示：$

$图片的宽度 = (allDis - dis) \times \frac{allWidth}{allDis} + 图片的原始宽度$ -->

