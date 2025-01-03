class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = null
    this.reason = null
    this.onFulfilledCallBacks = []
    this.onRejectedCallBacks = []

    const resolve = (value) => {
      this.state = 'fulfilled'
      this.value = value
      this.onFulfilledCallBacks.forEach((callback) => {
        callback(this.value)
      })
    }

    const reject = (reason) => {
      this.state = 'rejected'
      this.reason = reason
      this.onRejectedCallBacks.forEach((callback) => {
        callback(this.reason)
      })
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled,onRejected){
    if(th)
  }
}