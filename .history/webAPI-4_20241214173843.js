// 一.日期对象
const date = new Date() //实例化,获取当前时间
const date1 = new Date(2019, 0, 1, 12, 30, 30) //2019年1月1日12点30分30秒,获得指定时间
const data2 = new Date('2019-01-01') //2019年1月1日0点0分0秒

// 日期对象返回的数据不能直接使用,需要转换
data2.getFullYear() //获得年份,4位数
data2.getMonth() //获得月份,0~11
data2.getDate() //获得日期,1~31
data2.getDay() //获得星期几,0~6
data2.getHours() //获得小时,0~23
data2.getMinutes() //获得分钟,0~59
data2.getSeconds() //获得秒,0~59

// 时间戳
// 如果计算倒计时效果,前面方法无法直接使用,需要借助时间戳
//时间戳,从1970年1月1日0点0分0秒开始计算,单位毫秒
// 算法:
// 结束时间-当前时间=剩余时间
// 剩余时间/1000=剩余秒数,再/60=剩余分钟数,再/60=剩余小时数,再/24=剩余天数
// 三种方法获取时间戳
console.log(date.getTime()) //使用getTime()方法
console.log(+new Date()) //使用+号,+号会调用valueOf()方法,+new Date()等同于new Date().valueOf()
console.log(Date.now()) //使用Date.now()方法,无需实例化,但是只能得到当前时间的时间戳,前面两种方法可以得到指定时间的时间戳
time = +new Date('2025-01-01') - +new Date() //获得2025年1月1日和当前时间的时间戳差值
time /= 1000 //转换为秒
console.log(`距离2025年1月1日还有${parseInt(time / 60 / 60 / 24)}天,${parseInt(time / 60 / 60 % 24)}小时,${parseInt(time / 60 % 60)}分钟,${parseInt(time % 60)}秒`)

// 二.DOM结点
// 1.查找结点
const element=document.querySelector('.id')
element.parentNode //父节点,找不到返回null

element.childNodes //子节点,所有子节点,包括文本节点
element.children //子节点,只有元素节点,伪数组

element.previousSibling //前一个兄弟节点,找不到返回null
element.nextSibling //后一个兄弟节点

// 2.增加结点
// 很多情况需要增加元素,比如说评论区,需要动态添加评论

// 先创建元素,再添加到页面
const div=document.createElement('div') //创建元素
// 克隆元素:cloneNode(),参数为true表示深度克隆,会克隆元素的所有子元素,参数为false表示浅克隆,只克隆元素本身
const clone=document.querySelector('.id').cloneNode(false) //克隆元素

// 追加到页面
const father=document.querySelector('.father')
father.appendChild(div) //追加到最后
father.insertBefore(div,father.children[0]) //追加到最前

document.body.appendChild(div) //追加到body的最后
document.body.insertBefore(div,element) //追加到element前面

// 3.删除结点
// 在javascript中,删除结点有两种方法,一种是删除结点本身,一种是删除结点的子结点.不论是删除结点本身还是删除结点的子结点,都是通过父结点来操作的.
// 删除结点本身
element.parentNode.removeChild(element) //删除结点本身
// 删除结点的子结点
element.innerHTML='' //删除结点的所有子结点

// 4.替换结点
// 替换结点也是通过父结点来操作的
element.parentNode.replaceChild(div,element) //替换结点

// 三.M端事件
// 1.触摸事件
// 触摸事件有三种:touchstart,touchmove,touchend
// touchstart:手指触摸屏幕时触发
element.addEventListener('touchstart',function(event){})
// touchmove:手指在屏幕上滑动时触发
element.addEventListener('touchmove',function(event){})
// touchend:手指离开屏幕时触发
element.addEventListener('touchend',function(event){})

// 事件对象中有三个属性
element.addEventListener('touchstart',function(event){
  // touches:当前屏幕上所有触摸点的列表,每个触摸点是一个对象,包含了相对于视口的位置
  console.log(event.touches)
  // targetTouches:当前元素上所有触摸点的列表,每个触摸点是一个对象,包含了相对于元素的位置
  console.log(event.targetTouches)
  // changedTouches:涉及当前事件的触摸点的列表,每个触摸点是一个对象,包含了相对于视口的位置
  console.log(event.changedTouches)
})

// 三.javascript插件
// 库:Zepto.js,swiper.js

// 四.回流(重排)和重绘
// java
