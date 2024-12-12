// 一.事件监听
const element = document.querySelector('.btn');
// 元素对象.addEventListener('事件类型',事件处理函数)
element.addEventListener('click', function () {
	alert('hello');
});

// DOM L0级事件处理程序
// 通过元素对象的属性添加事件处理程序,这种方式只能添加一个事件处理程序,如果再次添加,则会覆盖之前的事件处理程序
// element.on事件=function(){}

// DOM L2级事件处理程序
// 通过元素对象的方法添加事件处理程序,这种方式可以添加多个事件处理程序
// element.addEventListener('事件类型',事件处理函数)

// 事件监听版本发展史
// DOM L0:是DOM的第一个版本,通过元素对象的属性添加事件处理程序
// DOM L1:于1998年发布,但是没有被广泛使用
// DOM L2:于2000年发布,并且被广泛使用,使用addEventListener方法添加事件处理程序
// DOM L3:于2011年发布,增加了更多的事件类型,如transitionend,animationend等

// 二.事件类型
// 1.鼠标事件:click鼠标单击,mouseenter鼠标移入,mouseleave鼠标移出,mouseover鼠标悬停,mouseout鼠标离开
// 2.键盘事件:keydown按下键盘,keyup松开键盘,keypress按下键盘,keydown和keyup是键盘事件,keypress是字符事件
// 3.焦点事件:focus获得焦点,blur失去焦点
// 4.表单事件:submit提交表单,reset重置表单,change表单元素的值发生改变,input表单元素的值发生改变

// 三.事件对象
// 事件对象是事件处理程序的第一个参数,可以通过事件对象获取事件的相关信息,一般命名为event或e
element.addEventListener('click', function (e) {
	console.log(e);
	console.log(e.target); //获取事件的目标对象
	console.log(e.type); //获取事件的类型
	console.log(e.clientX); //获取事件的X坐标
	console.log(e.clientY); //获取事件的Y坐标
	console.log(e.offsetX); //获取事件的X坐标,相对于事件源对象
	console.log(e.key); //获取键盘的键码,现在不提倡使用keyCode
});

// 四.环境对象
// 指的是事件处理程序中的this,指向事件的目标对象
// 谁调用函数,函数中的this就指向谁
// 直接调用函数,函数中的this指向window

// 五.回调函数
// 回调函数就是把函数作为参数传递给另一个函数,在另一个函数中调用这个函数
// 一般把匿名函数作为回调函数
function fn(callback) {
	callback();
}

setInterval(fn, 1000);//把fn函数作为参数传递给setInterval函数