/* 基本数据类型 */
/* 
1. Number 数字:JS是弱类型语言,变量到底是什么类型,只有赋值后才能确定
有很多运算: + - * / % ++ --
NaN:Not a Number,是一个特殊的数字,表示一个不正确的或者一个未定义的数学操作所得到的结果,例如'str'-1,任何对NaN的操作都会返回NaN
 */
let num = 1

/*
2. String 字符串:字符串是以单引号或双引号括起来的任意文本,比如'hello'
单引号和双引号没有区别,可以互相嵌套,但是不能自己嵌套自己,比如'hello'world''是错误的
可以用\来转义,比如'\'hello\''表示的字符串内容是'hello'
可以用+来连接字符串,比如'hello'+'world'会得到'helloworld'

反引号:ES6新增的一种字符串包裹方式,用``包裹,可以用${}来引用变量,类似于python的f-string
它使得多个字符串的拼接更加方便,比如 '大家好'+name+'我是'+age+'岁' 可以写成 `大家好${name}我是${age}岁`
  */

let str = 'hello' // 2. String 字符串
let bool = true   // 3. Boolean 布尔值
let n = null      // 4. Null 空值
let u = undefined // 5. Undefined 未定义
// 6. Symbol 符号(ES6新增)
// 7. BigInt 大整数(ES10新增)

