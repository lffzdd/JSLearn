import {promises as fs} from 'fs'
export const getDb=async ()=>{
  const data=await fs.readFile('./')
}