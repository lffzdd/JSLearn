// 一.Window对象
// BOM（Browser Object Model）浏览器对象模型
// DOM（Document Object Model）文档对象模型
// window对象是BOM的核心对象，表示浏览器的一个实例，即窗口,是js访问浏览器窗口的接口,是js中的顶层对象
// document对象是DOM的核心对象，表示整个文档,是js访问页面内容的接口,也是window对象的一个属性

// console等都是window对象的属性,基本BOM的方法和属性都是window对象的
// 所有定义的全局变量和函数都是window对象的属性和方法,调用时可以省略window

// 1.定时器-延时函数
let timer = setTimeout(function () {}, 1000) //延时1s执行
clearTimeout(timer) //清除定时器
// 属于宏任务,先交给定时器触发线程,再注册到宏任务队列中,等待执行,注册是通过事件触发线程完成的
// 1000ms不是1000ms后执行,而是1000ms后将回调函数加入到宏任务队列中,等待执行

// 和setInterval的区别:setInterval是每隔一段时间执行一次,setTimeout是延时一段时间后执行一次

// 2.location对象
// location对象表示当前窗口的URL,拆分URL并保存在location对象的属性中
// location.href获取当前页面的URL
location.href = 'http://www.baidu.com' //改变了当前页面的URL,会跳转到百度
// location.search获取URL中的查询字符串,包括问号,即URL中?后面的内容,这些是GET请求的参数,即请求页面时传递的参数
console.log(location.search) //?name=zs&age=18
// location.hash获取URL中的hash值,即URL中#后面的内容,用于页面内的定位
console.log(location.hash) //#top,页面跳转到id为top的元素
// location.reload()重新加载当前页面,相当于刷新页面
location.reload() //刷新页面,传入true参数,强制刷新,不使用缓存

// location.pathname获取URL中的路径部分,即URL中域名后的部分,例如http://www.baidu.com/index.html,pathname为/index.html
// 还有其他属性,如location.protocol获取URL的协议部分,location.host获取URL的主机部分,location.port获取URL的端口部分,一般不常用

// 3.navigator对象
// navigator对象表示浏览器的信息,包括浏览器的名称,版本,操作系统等
!(function () {
	const userAgent = navigator.userAgent //获取浏览器的userAgent信息

	const android = userAgent.indexOf('Android') > -1 //判断是否是安卓设备,indexOf返回-1表示未找到
	const iphone = userAgent.indexOf('iPhone') > -1 //判断是否是iPhone设备

	if (android || iphone) {
		console.log('移动端')
	}
})() //(function(){})()立即执行函数,避免变量污染,!()是为了避免函数被当作对象的属性,不加!可能会被识别为window

// 3.history对象
// history对象与浏览器地址栏的操作相对应,主要管理历史记录，如前进、后退、历史记录等
history.back()      //后退
history.forward()   //前进
history.go( 1 )        //要带参数,如果是1前进一个页面,如果是-1后退一个页面
// history 对象一般在实际开发中比较少用，但是会在一些 OA 办公系统中见到。

// 二.本地存储
// 数据可以存储在浏览器中,不会因为页面刷新或关闭而丢失,有两种存储方式:localStorage和sessionStorage,容量一般为5M
// 1.localStorage
// 可以永久存储,除非手动删除,存储在本地,不会随着页面的刷新而消失
// 可以多个页面共享,同源的页面可以共享localStorage,不同源的页面无法共享,同源是指协议,域名,端口号完全相同
// 键值对存储,只能存储字符串,可以通过setItem()和getItem()方法存取数据
localStorage.setItem( 'key', 'value' ) //存储数据
localStorage.getItem( 'key' ) //获取数据
localStorage.removeItem( 'key' ) //删除数据
// F12-Application-Local Storage可以查看localStorage的存储情况

// 2.sessionStorage
// 会话存储,数据只存在于当前会话,页面关闭后会被清除
// 在同一个标签页中,刷新页面数据还在,但是关闭标签页数据就会被清除
// 键值对存储,只能存储字符串,可以通过setItem()和getItem()方法存取数据.和localStorage的方法一样
sessionStorage.setItem( 'key', 'value' ) //存储数据
sessionStorage.getItem( 'key' ) //获取数据
sessionStorage.removeItem( 'key' ) //删除数据

// 3.存储复杂数据类型
// 本地存储只能存储字符串,如果要存储复杂数据类型,需要先将数据转换为字符串,再存储
const obj = { name: 'zs', age: 18 }
localStorage.setItem( 'obj', JSON.stringify( obj ) ) // 将对象转换为字符串
const objStr = JSON.parse( localStorage.getItem( 'obj' ) ) // 将字符串转换为对象

// 额外
// 数组map方法
let arr = ['a', 'b', 'c']
let newArr = arr.map(function (item, index) {
	return item + index //item是数组元素,index是索引
} )
console.log( newArr ) //['a0', 'b1', 'c2']

// join方法
arr.join( '-' ) //将数组元素用-连接成字符串,返回字符串'a-b-c'
arr.join( '' ) //将数组元素用空字符串连接成字符串,返回字符串'abc'