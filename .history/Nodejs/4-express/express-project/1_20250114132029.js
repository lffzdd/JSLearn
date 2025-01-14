const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/mytest')
const Cat=mongoose.model('Cat',{name:String})
const kitty=new Cat({name:'李健'})
kitty.save().then()=>con