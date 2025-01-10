import { promises as fs } from 'fs'
export const getDb = async () => {
  try {
    const data = await fs.readFile('./db.json', 'utf-8')
    return data
  } catch (error) {
    console.log('getDb()打开获取文件失败!\n')
    console.log(error) 
  }
}
