// 一.事件流
// 1.事件捕获阶段：事件从document到目标元素的过程

// 2.事件冒泡阶段：事件从目标元素到document的过程
// 当一个元素触发事件时，同样的事件将会在DOM树上所有祖先元素中依次触发,会依次调用所有祖先元素的同名事件处理程序

// 若是DOM 0级事件处理程序，事件流只有冒泡阶段

// 3.阻止事件冒泡
// 事件容易影响到父元素,所以需要阻止事件冒泡
// 组织冒泡需要拿到事件对象，然后调用stopPropagation()方法,此方法可以阻止事件传播,不仅阻止冒泡，还阻止捕获

// 4.事件解绑
const btn = document.getElementById('btn');
btn.onclick = function () {
	console.log('click');
};
btn.onclick = null; // 解绑事件
btn.addEventListener('click', function () {
	console.log('click');
}); //匿名函数无法解绑,只能解绑具名函数
function clickHandler() {
	console.log('click');
}
btn.addEventListener('click', clickHandler);
btn.removeEventListener('click', clickHandler);

// 鼠标经过事件的区别
// mouseover和mouseout事件会冒泡,mouseenter和mouseleave事件不会冒泡
const father = document.querySelector('.father');
const son = document.querySelector('.son');
father.addEventListener('mouseover', function () {
	console.log('father mouseover');
});
father.addEventListener('mouseout', function () {
	console.log('father mouseout');
});
son.addEventListener('mouseover', function () {
	console.log('son mouseover');
});
son.addEventListener('mouseout', function () {
	console.log('son mouseout');
});
// 鼠标移入father,输出father mouseover,然后移入子元素son,输出father mouseout,son mouseover,再移出son,输出son mouseout,father mouseover,再移出father,输出father mouseout

father.addEventListener('mouseenter', function () {
	console.log('father mouseenter');
});
father.addEventListener('mouseleave', function () {
	console.log('father mouseleave');
});
son.addEventListener('mouseenter', function () {
	console.log('son mouseenter');
});
son.addEventListener('mouseleave', function () {
	console.log('son mouseleave');
});
// 鼠标移入father,输出father mouseenter,然后移入子元素son,输出son mouseenter,再移出son,输出son mouseleave,再移出father,输出father mouseleave

// 二.事件委托
// 1.事件委托的原理
// 事件委托是利用事件冒泡的原理，只指定一个事件处理程序，就可以管理某一类型的所有事件
// 给父元素绑定事件，通过事件冒泡，可以监听到所有子元素的事件,避免了重复给每个子元素绑定事件
// 事件对象的target属性可以获取事件的目标对象:e.target

// 三.其他事件
// 1.页面加载事件
// 加载事件是指页面加载完成后触发的事件,页面所有资源加载完成后触发
// >有些时候需要在页面加载完成后执行一些操作,可以使用window.onload事件
// >老代码喜欢把script标签放在head标签中,这样会导致js代码在DOM元素加载之前执行,找dom元素找不到
window.onload=function(){}
window.addEventListener('load',function(){})

// DOMContentLoaded事件,当DOM加载完成后触发,不包括图片等资源,比onload事件更快
// html文档解析完成后触发,不需要等待样式表,图片等资源加载完成,使用的是document对象
document.addEventListener('DOMContentLoaded',function(){})

// 2.页面滚动事件
// 页面滚动事件是指页面滚动时触发的事件
// >很多网页需要检测用户把页面滚动到某个位置时,执行一些操作,比如固定导航栏,返回顶部按钮等
// 事件名称:scroll
window.addEventListener('scroll',function(){})//监听整个页面的滚动事件
document