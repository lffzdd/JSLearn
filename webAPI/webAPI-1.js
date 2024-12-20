// 一.获取DOM对象
// 类选择器
document.querySelector( 'ul li' )
document.querySelector('.class')
document.querySelector( '#id' )
document.querySelectorAll( '选择器' )//返回一个伪数组,只能遍历不能使用数组方法

document.getElementById( 'id' )
document.getElementsByClassName( 'class' )
document.getElementsByTagName( 'tag' )

// 二.操作元素内容,DOM对象是根据HTML标签生成的对象,所以操作DOM对象就是操作HTML标签
const info = document.querySelector( '.info' )
// innerText:只识别文本,不解析HTML标签
info.innerText = 'hello' //修改元素的文本内容

// innerHTML:能识别文本,解析HTML标签
info.innerHTML = '<strong>hello</strong>' //修改元素的文本内容
// 如果纠结于性能,可以使用innerText,因为innerHTML会重新解析HTML标签
// 如果不知道用哪个,就用innerHTML

const img = document.querySelector( 'img' )
img.src = 'http://www.baidu.com/img/bd_logo1.png' //修改元素的src属性
img.title = '百度' //修改元素的title属性

// 三.操作元素属性
// 1.通过style属性修改元素的样式
const info = document.querySelector( '.info' )
info.style.color = 'red' //修改元素的颜色
info.style.fontSize = '20px' //修改元素的字体大小
info.style.backgroundColor = 'yellow' //修改元素的背景颜色

// 2.通过className属性修改元素的类名
// className 是一个用于操作 HTML 元素的属性，主要用于获取或设置该元素的 CSS 类名
const element = document.querySelector( '#id' )
const classes = element.className
console.log( classes ) //获取元素的类名,例如: 'class1 class2'
element.className = 'class1' //设置元素的类名,但是会覆盖原有的类名,所以推荐使用classList属性

// 3.通过classList属性修改元素的类名
// classList 属性返回元素的类名，作为 DOMTokenList 对象
// 通过classList属性可以添加、移除及切换 CSS 类
const element = document.querySelector( '#id' )
element.classList.add( 'class' ) //添加类名
element.classList.remove( 'class' ) //移除类名
element.classList.toggle( 'class' ) //切换类名,如果元素有该类名,则移除,如果没有则添加

// 4.操作表单元素
// 表单元素是指 input、select、textarea 等元素,通过表单元素的 value,name,checked,disabled 等属性可以操作表单元素
// 表单很多情况需要修改属性,比如点击眼睛显示密码,本质就是修改input的type属性,把password改为text
const input = document.querySelector( 'input' )
input.value = 'hello' //修改input的值
input.name = 'name' //修改input的name属性
input.type = 'text' //修改input的type属性

// 以下属性使用boolean值,如果为true,则表示属性存在,如果为false,则表示属性不存在
input.checked = true //修改input的checked属性,只有checkbox和radio有checked属性
input.disabled = true //修改input的disabled属性
input.selected = true //修改select的selected属性

//  四.自定义属性
// 标准属性:HTML标签自带的属性,如id,class,style等
// 自定义属性-开发者自己定义的属性:
// html5新增属性: data - 属性名
// 标签上一律以data-开头,后面跟自定义属性名,如data-id,data-name
// DOM对象一律以dataset属性获取自定义属性,如dataset.id,dataset.name
const url = './webAPI-1自定义属性.png'

// 定时器-间歇函数
// 开启定时器:setInterval(函数, 时间间隔单位ms),例如:
setInterval(function () {
	console.log('hello');
}, 1000); //每隔1s打印一次hello
// 关闭定时器:clearInterval(定时器名)
let timer = setInterval(function () {
    console.log('hello');
}, 1000 ); //每隔1s打印一次hello
clearInterval(timer); //关闭定时器