const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/mytest')
const Cat=mongoose.model('Cat',{name:李健})
