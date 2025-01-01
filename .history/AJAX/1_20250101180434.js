class MyPromise{
  constructor(executor){
    this.state='pending'
    this.value=null
    this.reason=null
    this.onFulfilledCallBacks=[]
    this.onRejectedCallBacks=[]

    const resolve=(value)=>{
      this.state='fullfi'
    }
  }
}