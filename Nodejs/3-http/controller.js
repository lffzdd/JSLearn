import fs from 'fs'
import querystring from 'querystring'
export const index = res => {
	fs.readFile('./index.html', (err, data) => {
		res.writeHead(200, 'Content-Type', 'text/html')
		res.write(data)
		res.end()
	})
}

export const user = (postData, res) => {
	console.log(querystring.parse(postData))
	res.end()
}
