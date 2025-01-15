const { read } = require('fs')
const mongoose = require('mongoose')
const { type } = require('os')
async function main() {
  await mongoose
    .connect('mongodb://localhost:27017/mytest')
    .then(() => {
      console.log('MongoDB connected!')
    })
    .catch((err) => {
      console.error('MongoDB connect failed', err)
    })
}

const user=new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
})
 
const userModel=mongoose.model('User',user) //前面是集合名,后面是模版
const lj=new userModel({username:'lijian',age:28})
lj.save()