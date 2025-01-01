class MyPromise{
  constructor(executor){
    this.state='pending'
    this.value=null
    this.reason=null
    this.onFulfilled
  }
}