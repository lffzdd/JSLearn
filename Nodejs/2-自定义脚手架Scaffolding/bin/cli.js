#!/usr/bin/env node
// 上面这行代码是告诉操作系统用node来执行这个文件,路径是通过环境变量PATH来查找的
// 这是linux和macos的写法,在windows上不起作用,window上的写法是#! node

console.log('mycli')
// npm link,和npm link -g是一样的,都是将当前目录下的包链接到全局目录下,这样就可以在命令行中直接使用这个包了,相当于npm install -g,npm link是开发时使用的
// npm unlink是取消链接,npm unlink -g mycli是取消全局链接

console.log(process.argv)
/*
[
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\mycli\\bin\\cli.js'
]
    若是在命令行中输入mycli 1 2 3,则会得到
[
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\mycli\\bin\\cli.js',
    '1',
    '2',
    '3'
]
*/

if (process.argv[2] == '--help') {
	console.log('获取到了--help参数')
}
// 这样就可以在命令行中输入mycli --help来获取帮助信息了
// 但是这种方式不够灵活,可以使用commander模块来解决这个问题

// npm install commander
const { program } = require('commander')
const myHelp = require('../lib/core/help')
myHelp(program)

const myCommander = require('../lib/core/commander')
myCommander(program)

program.parse(process.argv) // 默认实现了-h和--help