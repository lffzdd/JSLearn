import {promises as fs} from 'fs'
export const getDb=async ()=>{
  try {
    
    const data=await fs.readFile('./db.json','utf-8')
  } catch (error) {
    
  }
}