// 面向对象 oop
// 构造函数可以实现面向对象
function Person(name, age) {
	this.name = name
	this.age = age
}
person1 = new Person('Tom', 18)
Person.sayHi = function () {
	console.log('hi')
} // 静态成员,person1.sayHi()会报错,只能Person.sayHi(),因为Person本身也是一个对象,所以可以添加属性和方法,只是Person会多一个prototype属性,而new关键字创建的对象没有prototype属性,用__proto__来指向这个prototype属性,这个属性是一个对象,在内存中只有一个,所有对象都有一个属性指向这个对象,所以实现了类似于父类的继承

// JS规定,每一个构造函数都有一个prototype属性,指向一个对象,这个对象包含了所有实例共享的属性和方法,称之为原型对象,原型对象的this不指向原型对象,而是指向实例对象
Person.prototype.sayHello = function () {
	console.log('hello')
} // 实例成员,person1.sayHello()可以调用,实例成员通过this添加,所以实现了类似于子类的继承

const arr1 = [1, 2, 3]
Array.prototype.max = function () {
	return Math.max(...this) //解构赋值
} // 数组的原型对象添加方法,所有数组都可以调用
Array.prototype.sum = function () {
	return this.reduce((prev, cur) => prev + cur, 0)
} // 数组的原型对象添加方法,所有数组都可以调用

// constructor属性
// 每个实例对象都有一个constructor属性,指向构造函数,即arr1.constructor指向Array
Person.prototype = {
	constructor: Person, // 重写原型对象,constructor属性会丢失,所以要手动添加,不然会指向Object
	sing: function () {
		console.log('sing')
	},
}

// 按理来说,Array.prototype是Array的对象,不是arr1的对象,但是arr1可以调用Array.prototype的方法,这是因为实例对象创建的时候,有一个__proto__属性,指向构造函数的prototype,所以arr1.__proto__指向Array.prototype
function Animal(name) {
	this.name = name
}
Animal.name = 'rabbit'

const animal = new Animal('dog')
console.log(animal.name) //dog
console.log(Animal.name) //rabbit
console.log(animal.__proto__.constructor.name) //'rabbit'

function Man() {
	this.head = 1
	this.eyes = 2
	this.legs = 2
	this.say = function () {}
	this.eat = function () {}
}

function Woman() {
	this.head = 1
	this.eyes = 2
	this.legs = 2
	this.say = function () {}
	this.eat = function () {}
	this.baby = function () {}
}

// 1.先封装,抽取共同属性和方法
const human = {
	head: 1,
	eyes: 2,
	legs: 2,
	say: function () {},
	eat: function () {},
}

function Man() {}
function Woman() {
	this.baby = function () {}
}

// 2.继承
Man.prototype = human
Man.prototype.constructor = Man //因为重写了原型对象,所以要手动添加constructor属性
Woman.prototype = human
Woman.prototype.constructor = Woman

Man.prototype.smoke = function () {} //结果是Man和Woman都有这个方法
// 正确的做法是
Man.prototype = new human()
Man.prototype.constructor = Man
Woman.prototype = new human()
Woman.prototype.constructor = Woman

// arr1.__proto__指向Array.prototype,Array.prototype.__proto__指向Object.prototype,arr1.__proto__.__proto__指向Object.prototype,之所以arr1.func而不是arr1.__proto__.func,是因为原型链查找的时候,会先查找自身,再查找原型对象,如果原型对象没有,再查找原型对象的原型对象,以此类推,直到Object.prototype,如果Object.prototype也没有,返回undefined