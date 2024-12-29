// 一.深浅拷贝
// 1.浅拷贝
// 对简单数据类型来说,浅拷贝和深拷贝没有区别
// 对对象来说,浅拷贝拷贝的是对象的引用，拷贝后的对象和原对象指向同一个地址，修改拷贝后的对象会影响原对象
const obj1 = { name: '张三', age: 18, address: { city: '北京' } }

const obj2 = obj1
Object.assign( {}, obj1 )

// 2.深拷贝
// 深拷贝是指拷贝对象的所有属性，拷贝后的对象和原对象不共享内存，修改拷贝后的对象不会影响原对象
for ( let key in obj1 ) {
    obj2[key] = obj1[key]
}

const obj3=_.deepClone(obj1) // lodash库的深拷贝方法
const obj4 = JSON.parse( JSON.stringify( obj1 ) )

// 二.异常处理
// 异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行
// throw:主动抛出异常,后面接的是一个对象，可以是任意类型
// Error:内置的错误对象，用来创建错误对象
// try...catch...finally:捕获异常
try {
    throw '抛出异常'
} catch ( e ) {
    console.log( e )
} finally { // finally中的代码不管是否发生异常都会执行,可以不写
    console.log( 'finally' )
}
// debugger:在代码中设置断点，用来调试代码

// 三.this指向
// 箭头函数中的this指向上一级作用域中的this,不适合作为构造函数,原型函数,事件监听函数,字面量对象方法.适用于需要使用上一级作用域中的this的场景
// this可以通过call,apply,bind方法改变指向
const obj = {
    name: '张三',
    sayName() {
        console.log( this.name )
    }
}
function fn(arg1, arg2) {
    console.log( this.name )
}// this指向window
fn.call( obj, 1, 2 ) // this指向obj,call用得比较少,相当于直接调用函数,只是改变了this指向
fn.apply( obj, [1, 2] ) // this指向obj,arg必须包装在数组中
let result = fn.apply( null, [1, 2] ) // fn.apply返回的是函数执行结果,其实就是调用fn函数,同call
let fn1 = fn.bind( obj, 1, 2 ) // bind返回的是一个新函数,不会立即执行,需要手动调用

// 四.性能优化
// 1.节流:连续触发事件时,在规定时间内只执行一次
// 节流: 鼠标移动，页面尺寸发生变化，滚动条滚动等开销比较大的情况
// 防抖: 搜索框输入，按钮点击等开销比较小的情况
function throttle(fn, delay) {
    let timer = null
    return function () {
        if ( !timer ) {
            timer = setTimeout( () => {
                fn.apply( this, arguments )
                timer = null
            }, delay )
        }
    }
}