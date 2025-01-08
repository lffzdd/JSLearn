//一.作用域
//1.全局作用域
//在script标签中或js文件中定义的变量，函数都是全局作用域
//2.函数作用域
//在函数内部定义的变量，函数都是函数作用域
//3.块级作用域
//在{}中定义的变量，函数都是块级作用域

//二.垃圾回收机制
// 垃圾回收机制GC(Garbage Collection)是指一种自动检测和回收垃圾的机制,即自动释放不再使用的内存空间

// 堆栈空间分配区别
// 栈空间:存放基本类型数据和引用类型数据的地址值,由系统自动分配和释放
// 堆空间:存放引用类型数据,也就是复杂数据类型,由程序员手动分配和释放,若不手动释放,由GC自动回收

// 1.引用计数
// 引用计数是一种垃圾回收机制,当一个对象被引用时,引用计数+1,当引用减少时,引用计数-1,当引用计数为0时,则回收该对象
// 优点:实现简单,回收及时
const arr = [1, 2, 3]
const obj = arr // 引用计数+1
obj = null //// 引用计数-1,引用计数为0,回收arr
// 缺点:循环引用问题,无法解决循环引用问题
function fn() {
	let o1 = {}
	let o2 = {}
	o1.name = o2 // o1引用计数+1
	o2.name = o1 // o2引用计数+1
	// o1和o2的引用计数都为1,无法回收
	// 在同一个作用域中,将o1和o2置为null,引用计数-1,引用计数为0,回收o1和o2
	// o1 = null // o1引用计数-1,引用计数为0,回收o1
	// o2 = null
	return [o1, o2]
}
//若在不同作用域中,无法回收
let [v1, v2] = fn()
v1 = null // v1不再指向o1,但是o2还指向o1,无法回收
v2 = null // v2不再指向o2,但是o1还指向o2,无法回收

// 2.标记清除
// 现代的浏览器已经不再使用引用计数,而是使用标记清除,标记清除是一种垃圾回收机制,当一个对象不再使用时,标记为可回收,当GC运行时,清除所有可回收的对象
// 1.标记清除算法将对象分为两类:可达对象和不可达对象
// 可达对象:从根对象开始,通过引用关系可以访问到的对象
// 不可达对象:无法通过引用关系访问到的对象
// 2.标记清除算法的执行流程:
// I.从根对象开始,标记所有可达对象
// II.遍历所有对象,将未标记的对象清除
// III.清除所有未标记的对象

// 三.闭包
// 1.闭包是指函数和函数内部能访问到的外部作用域的变量的总和
// 2.闭包的作用:
// I.保护变量:外部作用域无法访问到内部作用域的变量
// II.延长作用域链:内部函数可以访问到外部函数的变量
// III.模块化开发:使用闭包可以实现模块化开发

// 没有闭包
function fn() {
	let num = 1
	return num
}
console.log(fn()) // 1  num的作用域只在fn函数内部,

// 有闭包
function fn() {
	let num = 1
	return function () {
		return num
	}
}
let f = fn()
console.log(f()) // 1  num的作用域在fn函数内部和fn函数返回的函数内部

// 3.闭包的缺点:
// I.内存泄漏:闭包会使得内存无法释放,导致内存泄漏
// II.性能问题:闭包会增加内存消耗,导致性能问题
let f_ = fn()
f_ = null // f_不再使用,但是num仍然被引用,无法释放内存

// 四.变量提升
// 1.变量提升是指在代码执行前,将变量声明提升到代码的最前面
// 2.变量提升的优先级:函数声明>变量声明
// 3.变量提升的作用:在代码执行前,就可以使用变量和函数
// 变量提升提前赋值为undefined,使用var声明的变量提前赋值为undefined,使用let和const声明的变量提前赋值为暂时性死区,即无法访问

// 五.函数提升
// 1.函数提升是指在代码执行前,将函数声明提升到代码的最前面
// 2.函数提升的优先级:函数声明>变量声明
// 3.函数提升的作用:在代码执行前,就可以使用函数
// 4.函数提升是提升函数声明,而不是函数表达式,函数表达式视为变量提升,会被提前赋值为undefined
foo()
function foo() {
	console.log('foo')
} //函数提升,在代码执行前,就可以使用函数

bar() // 报错,bar is not a function
var bar = function () {
	console.log('bar')
}

// 六.函数参数
// 1.静态参数
// 静态参数是指在函数定义时,定义的参数,传入时显示传入的参数
function fn(a, b) {
	console.log(a, b)
}
fn(1, 2) // 1 2
// 2.动态参数
// 动态参数是指在函数定义时,没有直接定义参数,传入时通过arguments对象获取参数
// arguments是一个类数组对象,包含所有传入的参数
function sum() {
	let res = 0
	for (let i = 0; i < arguments.length; i++) {
		res += arguments[i] //arguments可以通过下标获取参数
	}
	console.log(res)
	return res
}

// 3.剩余参数
// 剩余参数是指在函数定义时,使用...rest参数获取剩余的参数,置于最后一个参数,...是语法,rest可以是任意名称,只能有一个剩余参数
// 剩余参数是一个真正的数组,可以使用数组的方法
function sum(a, b, ...rest) {
	console.log(a, b, rest)
}
// 开发中,一般使用剩余参数,因为arguments是一个类数组对象,不方便使用
// ...不仅可以获取剩余参数,还可以将数组展开
let arr1 = [1, 2, 3]
console.log(...arr1) // 1 2 3
let arr2 = [4, 5, 6]
let arr3 = [...arr1, ...arr2] // [1, 2, 3, 4, 5, 6]

// 七.箭头函数
// 1.箭头函数是ES6新增的函数,箭头函数没有this,arguments,super,不能使用new调用,没有原型,不能作为构造函数
// 2.箭头函数的特点:
// I.箭头函数没有this,内部的this指向外部的this,即作用域链的上一层
// II.箭头函数没有arguments,但是可以使用剩余参数
// III.箭头函数不能使用new调用,没有原型
// IV.箭头函数不能使用super
// V.箭头函数不能使用yield
// VI.箭头函数不能作为构造函数,不能使用new调用
// VII.箭头函数没有原型
// 相当于匿名函数
const fn = arg => {
	console.log(arg)
}
//以上是标准的箭头函数,若只有一个参数,可以省略括号,若只有一行代码,可以省略大括号,这行代码会被自动return
// 若大括号中有return,则不能省略大括号,若大括号外还有(),表示返回一个对象,因为对象是用{}表示的,函数体也是用{}表示的,所以需要用()区分
const fn = arg => ({ name: arg }) // 返回一个对象
// DOM事件回调函数,不太适合使用箭头函数,因为箭头函数没有this,无法获取到事件对象
// 但是可以通过事件对象的target属性获取到当前元素0
document.onclick = e => {
	console.log(e.target) //此时的this就是document的this,指向window
}

// 八.解构赋值
// 解构赋值是ES6新增的特性,可以快速获取数组或对象中的元素,赋值给变量
// 1.数组解构赋值
// I.基本用法
let arr4 = [1, 2, 3]
let [a, b, c] = arr4 // a=1, b=2, c=3 也可以使用let [a, b, c] = [1, 2, 3]
let [a1, b1, c1] = ([1, 2, 3][(a1, b1)] = // a=1, b=2, c=3
	[b1, a1]) // a=2, b=1 交换两个变量的值
// II.默认值
let [a2, b2, c2 = 3] = [1, 2] // a=1, b=2, c=3  若没有默认值,则为undefined
// III.剩余元素
let [a3, ...rest] = [1, 2, 3, 4] // a=1, rest=[2, 3, 4]
// IV.嵌套解构
let [a4, [b4, c4]] = [1, [2, 3]] // a=1, b=2, c=3
let [a5, { b5, c5 }] = [1, { b5: 2, c5: 3 }] // a=1, b=2, c=3
let [
	a6,
	{
		b6: { c6 },
	},
] = [1, { b6: { c6: 3 } }] // a=1, c=3
let [a7, b7] = [1, [2, 3]] // a=1, b=[2,3]
// VI.忽略元素
let [a8, , c8] = [1, 2, 3] // a=1, c=3  忽略第二个元素

// 2.对象解构赋值
// I.基本用法
let obj1 = { name: 'Tom', age: 18 }
let { name, age } = obj1 // name='Tom', age=18
// II.默认值
let { name: name1, age: age1 = 18 } = { name: 'Tom' } // name1='Tom', age1=18,就是将name赋值给name1,age赋值给age1,相当于给name和age起别名,:号在js中是起别名的意思
// III.嵌套解构
let {
	name: name2,
	age: { age2 },
} = { name: 'Tom', age: { age2: 18 } } // name2='Tom', age2=18
// IV.剩余元素
let { name: name3, ...rest1 } = { name: 'Tom', age: 18 } // name3='Tom', rest1={ age: 18 }
// V.忽略元素
let { name: name4, age: age4 } = { name: 'Tom', age: 18 } // name4='Tom', age4=18
// VI.多级对象解构
const msg = {
	code: 0,
	data: {
		name: 'Tom',
		age: 18,
	},
}
const { data } = msg //这样data就是msg.data,它会自动解构msg,寻找名称为data的属性

// 3.字符串解构赋值
// 字符串解构赋值是将字符串转换为数组,再进行解构赋值
let [s, t, r] = 'abc' // s='a', t='b', r='c'

// 4.函数参数解构赋值
// I.基本用法
function fn({ name, age }) {
	console.log(name, age)
}
fn({ name: 'Tom', age: 18 }) // name='Tom', age=18
// II.默认值
function fn({ name, age = 18 }) {
	console.log(name, age)
}

// 九.数组进阶
// 1.遍历数组
// forEach方法,调用数组的每个元素,并将元素传递给回调函数
let arr9 = [1, 2, 3]
arr9.forEach(function (item, index) {
	console.log(item, index)
}) //参数item是数组的元素,index是数组的下标,item必须写,index可以不写

function customForEach(callback = function (item, index) {}) {
	for (let i = 0; i < this.length; i++) {
		callback(this[i], i)
	}
}
Array.prototype.customForEach = customForEach //自定义forEach方法

// 2.筛选数组
// filter方法,筛选数组中符合条件的元素,返回一个新数组
arr9.filter(function (item, index) {
	return item > 1
}) //返回[2, 3],return后面的条件是筛选条件,返回的是一个新数组,不会改变原数组

function customFilter ( callback = function ( item, index ) { } ) {
	let res = []
	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i)) {
			res.push(this[i])
		}
	}
	return res
}

// 3.映射数组
// map方法,将数组中的每个元素映射为一个新元素,返回一个新数组
arr9.map(function (item, index) {
	return item * 2
}) //返回[2, 4, 6],将数组中的每个元素乘以2,返回一个新数组,不会改变原数组
