import { promises as fs } from 'fs'
export const getDb = async () => {
  try {
    data = await fs.readFile('./db.json', 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log('getDb()打开获取文件失败:\n')
    console.log(error)
  }
}

export const putDb = async (data) => {
  const data = JSON.stringify(data)
  try {
    fs.writeFile('./db.json', data)
  } catch (error) {
    console.log('putDb()写入文件失败')
    console.log(error)
  }
}
