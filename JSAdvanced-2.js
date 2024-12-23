// 一.深入对象
// 创建对象有三种方式
// 1.通过对象字面量创建对象
const obj1 = { name: 'obj1' }
// 2.通过new Object()创建对象,Object是一个构造函数
const obj2 = new Object({ name: 'obj2' })
// 3.通过构造函数创建对象
function Person(name) {
	this.name = name
}
const obj3 = new Person('obj3')
// 构造函数其实是一个普通的函数,只是在调用时使用了new关键字,普通函数调用时,返回值是函数的返回值,而构造函数调用时,返回值是一个对象,构造函数的返回值是this,所以谁调用this就指向谁,且构造函数不能有返回值,否则返回值会覆盖this
// JS中没有类的概念,只有对象,所以构造函数的作用是创建对象
// new关键字的执行流程:
// 1.创建一个空对象
// 2.将空对象的原型指向构造函数的prototype
// 3.将构造函数的this指向空对象
// 4.执行构造函数
// 5.返回空对象
// 6.赋值给变量

// 实例成员和静态成员
// 实例成员是指通过new关键字创建的对象的成员,每个对象都有自己的实例成员,实例成员通过this添加,所以实现了类似于子类的继承
// 静态成员是指构造函数的成员
const obj4 = new Person('obj4')
obj4.age = 18 // 实例成员
Person.age = 18 // 静态成员,一般是公共的,所有对象共享

// 二.内置构造函数
// JS中除了对象外,都是基本数据类型,基本数据类型都有对应的构造函数,可以通过new关键字创建对象,构造函数的成员已经被JS引擎实现,可以直接使用
// 基本数据类型: Number, String, Boolean, Symbol, BigInt, Undefined, Null
// 对象类型: Object, Array, Function, Date, RegExp, Error

// 1.Object三个常用静态方法:
for (let key in obj1) {
	console.log(key, obj1[key])
}
Object.keys(obj1) //
Object.values(obj1) // 返回对象的所有可枚举属性的值
Object.assign(obj1, obj2) // 将obj2的属性复制到obj1,返回obj1,obj1包含原本的属性和obj2的属性
Object.assign(obj1, { gender: '女' }) //obj1新增属性gender

// 2.Array常用静态方法:
const arr = [1, 2, 3]
arr.reduce(function (prev, cur, index, array) {
	return prev + cur
}, 0) // prev是上一次的返回值,cur是当前元素,也就是数组的每个元素,index是下标,array是数组,0是初始值,返回值是最后一次的返回值,该回调函数必须return

function customReduce(callback = (prev, cur, index = 0, array = []) => {}, initialValue) {
	let prev = initialValue
	let i = 0
	if (initialValue === undefined) {
		prev = this[0]
		i = 1
	}

	for (; i < this.length; i++) {
		prev = callback(prev, this[i], i, this)
	}
	return prev
}
Array.prototype.customReduce = customReduce //自定义reduce方法

//from方法,将类数组对象或可迭代对象转换为数组
Array.from('abc') //['a', 'b', 'c']
//其它常用方法: map, filter, forEach, find, findIndex, some, every, includes, indexOf, lastIndexOf, push, pop, shift, unshift, splice, slice, concat, join, reverse, sort, fill, copyWithin

// String,数值,布尔都具有对象的属性和方法,因为这些数据类型是JS底层使用Object构造函数包装的,又称为包装对象

// Number,toFixed方法,保留小数位数
const num = 1.234
num.toFixed(2) //1.23