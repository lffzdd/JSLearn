var fs = require('fs')
// console.log( fs ) // fs是一个对象,含有很多方法和属性
fs.readFile('./1-.txt', 'utf-8', (err, data) => {
	console.log(err) // null
	console.log(data) // 文件内容
})

// 写入,会清空
// fs.writeFile('./1-.txt', '6666', 'utf-8', err => {
// 	console.log(err)
// })
// 追加
function appendFile(path = './1-.txt', content = '\n666') {
	fs.readFile(path, 'utf-8', (err, data) => {
		if (!err) {
			fs.writeFile(path, data + content, 'utf-8', err => {
				if (!err) {
					console.log('追加成功!')
				}
			})
		}
	})
}
appendFile()

// 二.模块化编程
// module.js
const val = 'ex data'
const add=(a,b)=a+b
export { val,add } // 也可以一步写完 export const add=(..)=>..

// main.js
import { val, add } from "module.js";

// 上面注意,直接使用会报错,因为默认是不支持使用 ES module语法的,可以在package.json中设置 "type": "module"或将文件名后缀改为.mjs

// 其余规则
// 1.可以重命名,export和import都可以使用别名:
// export {val as value} ;这样import {val}就无效了,得import {value}
// import {val as value} 这样可以避免不同模块的同名导出变量的冲突

// 2.默认导出
// 若导出时只有一个值,可以使用默认导出,export default val;这样导入时可以直接import val from 'module.js'
export default val // 直接export val会报错,因为默认导出只能有一个