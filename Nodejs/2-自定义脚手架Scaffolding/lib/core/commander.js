const myAction = require('./action.js')

const myCommander = function ( program ) {
	program
		.command('create <project> [other...]')
		.alias('c')
		.description('创建一个项目')
		.action(myAction) // 这里的myAction是一个回调函数,有两个参数,第一个是project,第二个是options,其中project是你输入的字符串,而options是一个对象,里面包含了你输入的参数.加入 mycli create project -f vue,project='project',options={framework:'vue'}
}
module.exports = myCommander
