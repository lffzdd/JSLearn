const inquirer = require('inquirer')
const config = require('../../config')

const myAction = async (project, options) => {
	console.log('创建项目', project, options)
	const answer = await inquirer.prompt([
		{
			type: 'input',
			name: 'username',
			message: '请输入用户名',
		},
		{
			type: 'list',
			name: 'framework',
			message: '请选择框架',
			choices: config.framework,
		},
	])

	const download = require('./download')
	download(answer.framework, project)
}
module.exports = myAction
