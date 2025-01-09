import http from 'http'
import fs from 'fs'
import { router } from './router.js'

const server = http.createServer(router)

const PORT = 3000
const HOST = '127.0.0.1'
server.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`)
})
