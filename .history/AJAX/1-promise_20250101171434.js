class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 初始状态
    this.value = undefined; // 保存成功的值
    this.reason = undefined; // 保存失败的原因

    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;

        // 执行所有成功回调
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;

        // 执行所有失败回调
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    // 执行传入的 executor，并捕获错误
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 实现 then 方法
  then(onFulfilled, onRejected) {
    // 确保 onFulfilled 和 onRejected 是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    } else if (this.state === 'rejected') {
      onRejected(this.reason);
    } else if (this.state === 'pending') {
      // 将回调存入队列，等待状态改变时执行
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
  }
}
