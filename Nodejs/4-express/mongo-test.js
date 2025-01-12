import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'mytest'

async function main() {
	await client.connect()
	console.log('连接到MongoDB')

	const db = client.db(dbName)
	const users = db.collection('users')

	// 插入数据
	// await users.insertOne({ name: 'Dave', age: '34', skills: ['C++', 'assembly'] })

	// 查询数据
	const data = await users.find({ age: { $gt: 28 } })
	// console.log(data)
	console.log( await data.toArray() ) // 或者是直接在find()后面接.toArray; 注意如果是findOne(),不用接.toArray(),因为只有一条数据,内部应该默认实现了将findOne返回的数据作为对象

	// 关闭连接
	await client.close()
}

main().catch(console.error)
