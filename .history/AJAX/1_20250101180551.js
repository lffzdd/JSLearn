class MyPromise{
  constructor(executor){
    this.state='pending'
    this.value=null
    this.reason=null
    this.onFulfilledCallBacks=[]
    this.onRejectedCallBacks=[]

    const resolve=(value)=>{
      this.state='fulfilled'
      this.value=value
      this.onFulfilledCallBacks.forEach((callback)=>{callback(value)})
    }

    const rejected=(reason)=>
  }
}