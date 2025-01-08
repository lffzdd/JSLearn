const exec = require('child_process')
exec('git clone https://gitee.com/beiyaoyaoyao/egg-template.git ./test', (error, stdout, stderr) => {
	if (error) {
		console.log(error)
		return
	}
	console.log(stdout)
})
