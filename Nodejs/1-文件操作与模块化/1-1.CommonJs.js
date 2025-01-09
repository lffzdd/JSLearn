//CommonJs默认提供了一个module对象，该对象代表当前模块，它有以下属性：
console.log(module)
/*
{
  id: '.',
  path: 'C:\\Project\\FrontEnd\\JSLearn\\Nodejs',
  exports: {},
  filename: 'C:\\Project\\FrontEnd\\JSLearn\\Nodejs\\1-1.CommonJs.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Project\\FrontEnd\\JSLearn\\Nodejs\\node_modules',
    'C:\\Project\\FrontEnd\\JSLearn\\node_modules',
    'C:\\Project\\FrontEnd\\node_modules',
    'C:\\Project\\node_modules',
    'C:\\node_modules'
  ],
  [Symbol(kIsMainSymbol)]: true,
  [Symbol(kIsCachedByESMLoader)]: false,
  [Symbol(kIsExecuting)]: true
}
*/

// module.id：模块的标识符，通常是带有绝对路径的模块文件名。
// module.path：模块的搜索路径。
// module.exports：模块的导出对象。
const val = 'ex data'
// module.exports = val // 这样exports就不再是一个空对象了,而是一个字符串'ex data'
// console.log( module ) //  exports: 'ex data',

// 这样如果require这个模块,就会得到这个值
// var val = require('./1-1.CommonJs.js') 相当于 var val = 'ex data'
module.exports.val = 'ex data'
console.log( module ) //  exports: { val: 'ex data' },