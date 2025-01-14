exports.list=async (req,res)=>{
  console.log(req.url)
  res.send('/user-list')
}

exports.delete=as