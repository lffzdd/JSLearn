// const ora=(await import('ora')).default 可以直接使用await是因为顶层await支持,顶层await是ES2022的特性
// .default是因为异步导入无法直接解析
import ora from 'ora'

// 模拟异步操作
// const spinner = ora('正在处理请求...').start()
const spinner = ora({ text: '正在处理请求', spinner: 'bouncingBar' }).start()

setTimeout(() => {
	spinner.text = '继续处理其他任务'
	spinner.color = 'yellow'
}, 2000)

setTimeout(() => {
	spinner.succeed('请求完成！')
}, 4000)
