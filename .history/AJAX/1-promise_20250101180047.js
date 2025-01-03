function Promise(func) {
  this.status = 'pending'
  this.value = null
  this.reason = null
  this.resolveCallbacks = []
  this.rejectCallbacks = []

  const resolve = (value) => {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
      this.resolveCallbacks.forEach(cb => cb(value))
    }
  }

  const reject = (reason) => {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = reason
      this.rejectCallbacks.forEach(cb => cb())
    }
  }

  func(resolve, reject)
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === 'fulfilled') {
    onFulfilled(this.value)
  } else if (this.status === 'rejected') {
    onRejected(this.reason)
  } else {
    this.resolveCallbacks.push(() => onFulfilled(this.value))
    this.rejectCallbacks.push(() => onRejected(this.reason))
  }
}