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
      this.resolveCallbacks.forEach(cb => cb())
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