const exec = require('child_process').exec
const ora = require('ora')
const chalk = require('chalk')

const download = function (url, project) {
	const spinner = ora({ text: '正在下载模板...', spinner: 'bouncingBar' }).start()
	exec(`git clone https://gitee.com/beiyaoyaoyao/${url}-template.git ${project}`, (error, stdout, stderr) => {
		if (error) {
			console.log(error)
			spinner.fail('下载失败')
			return
		}
		spinner.succeed(chalk.green('下载成功'))
		console.log(chalk.blue(`cd ${project} -> npm install -> npm run dev`))
		// console.log(`下载成功,打印标准输出:\n${stdout}`)
	})
}
module.exports = download
