import http from 'http'
import fs from 'fs'
import url from 'url'
import querystring from 'querystring'

const server = http.createServer((req, res) => {
	if (req.method === 'GET') {
		fs.readFile('./index.html', (err, data) => {
			if (err) {
				res.writeHead(404)
				res.end(JSON.stringify(err))
				return
			}
			res.writeHead(200, 'Content-Type', 'text/html')
			res.write(data)
			res.end()
		})
	} else if (req.method === 'POST') {
		console.log( url.parse( req.url, true ).query )
		let postData = ''
		req.on( 'data', chunk => {
			console.log( chunk ) // chunk是Buffer对象,打印出来是16进制的ascii码
			postData += chunk
		} )
		req.on('end', () => {
			console.log( querystring.parse( postData ) )
			res.end()
		})
	}
})

const PORT = 3000
const HOST = '127.0.0.1'
server.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`)
})
