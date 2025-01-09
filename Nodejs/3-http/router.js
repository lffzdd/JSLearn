import { index, user } from './controller.js'
import url from 'url'
export const router = (req, res) => {
	if (req.method === 'GET') {
		if (req.url === '/') {
			index(res)
		}
	} else if (req.method === 'POST') {
		const urlQuery = url.parse(req.url, true).query
		let postData = ''
		req.on('data', chunk => {
			postData += chunk
		})
		req.on('end', () => {
			user(postData, res)
		})
	}
}