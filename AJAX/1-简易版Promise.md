### **# Promise 简易实现**

### **什么是 Promise？**

**Promise** 是 JavaScript 提供的一种解决异步操作的方法，可以以更加优雅的方式处理异步操作的结果（成功或失败）。它本质上是一个对象，表示一个未来才会结束的任务，并通过 `.then()` 和 `.catch()` 方法允许我们对结果进行处理。

---

### **Promise 的状态**

1. **Pending（进行中）：** 初始状态，既没有被解决，也没有被拒绝。
2. **Fulfilled（已解决）：** 操作成功完成，Promise 的结果值确定。
3. **Rejected（已拒绝）：** 操作失败，Promise 的原因被捕获。

状态一旦变为 Fulfilled 或 Rejected，就不可再改变（状态不可逆）。

---

### **Promise 的原理**

Promise 是一个构造函数，它接受一个执行器函数（executor）。这个函数会立即执行，并接受两个参数：

1. **resolve** ：将 Promise 的状态从 Pending 改为 Fulfilled。
2. **reject** ：将 Promise 的状态从 Pending 改为 Rejected。

执行器函数的作用是定义异步操作，并调用 `resolve` 或 `reject` 来改变状态。

---

### **实现一个简单的 Promise**

以下是一个自定义 Promise 的实现，帮助你理解其原理：

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending' // 初始状态
    this.value = undefined // 保存成功的值
    this.reason = undefined // 保存失败的原因

    this.onFulfilledCallbacks = [] // 成功回调队列
    this.onRejectedCallbacks = [] // 失败回调队列

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value

        // 执行所有成功回调
        this.onFulfilledCallbacks.forEach((callback) => callback(value))
      }
    }

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason

        // 执行所有失败回调
        this.onRejectedCallbacks.forEach((callback) => callback(reason))
      }
    }

    // 执行传入的 executor，并捕获错误
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // 实现 then 方法
  then(onFulfilled, onRejected) {
    // 确保 onFulfilled 和 onRejected 是函数
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    } else if (this.state === 'rejected') {
      onRejected(this.reason)
    } else if (this.state === 'pending') {
      // 将回调存入队列，等待状态改变时执行
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
  }
}
```

---

### **示例：使用自定义 Promise**

```javascript
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的数据！')
    // 或者 reject('失败的原因！');
  }, 1000)
})

myPromise.then(
  (data) => {
    console.log('成功：', data)
  },
  (error) => {
    console.error('失败：', error)
  }
)
```

运行上述代码会在 1 秒后输出 `成功：成功的数据！`。

---

### **结合解释实现原理**

1. **构造函数与状态管理** ：

- Promise 的状态通过 `this.state` 管理，初始值是 `pending`。
- 调用 `resolve` 改为 `fulfilled`，调用 `reject` 改为 `rejected`。

1. **回调队列** ：

- 如果状态是 `pending` 时，`.then()` 方法的回调会存入 `onFulfilledCallbacks` 或 `onRejectedCallbacks` 队列。
- 状态改变后（`resolve` 或 `reject` 被调用），会立即执行这些队列中的回调。

1. **链式调用** ：

- `then` 的返回值是一个新的 Promise，可以支持链式调用（未在上述代码中实现）。

---

### **完整版 Promise 的扩展功能**

1. **链式调用** ：

- 支持 `then()` 方法返回新的 Promise，以便实现连续操作。

1. **错误捕获** ：

- `catch()` 方法捕获前面链中的错误。

1. **静态方法** ：

- `Promise.resolve()`：返回一个已解决的 Promise。
- `Promise.reject()`：返回一个已拒绝的 Promise。
- `Promise.all()`：并行执行多个 Promise。
- `Promise.race()`：取最快完成的 Promise。

---

### **为什么使用 Promise？**

- 避免嵌套回调（回调地狱）。
- 更好的错误处理机制。
- 支持链式调用，逻辑更加清晰。

---

# 实现链式调用


要实现 **Promise** 的链式调用功能，我们需要改进自定义的 `then` 和 `resolve`、`reject` 方法。以下是更完整的实现：

---

### **改进点**

1. **返回一个新的 Promise 实例** ：

* `then` 方法需要返回一个新的 Promise，以便支持链式调用。

1. **处理回调返回值** ：

* 如果 `then` 中的回调返回一个值或 Promise，需要正确地传递到下一个链式调用。

1. **捕获和传递错误** ：

* 如果回调函数抛出错误，或者返回的 Promise 被拒绝，错误需要传递到下一个 `then`。

---

### **实现代码**

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 初始状态
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onFulfilledCallbacks = []; // 存储成功的回调
    this.onRejectedCallbacks = []; // 存储失败的回调

    // 改变状态为 fulfilled
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb());
      }
    };

    // 改变状态为 rejected
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };

    // 执行传入的 executor 函数
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // then 方法实现
  then(onFulfilled, onRejected) {
    // 支持链式调用，需要返回一个新的 Promise
    return new MyPromise((resolve, reject) => {
      // 包装 onFulfilled 和 onRejected，以便支持异步调用
      const handleFulfilled = () => {
        try {
          const result = onFulfilled ? onFulfilled(this.value) : this.value;
          // 如果 result 是 Promise，则等待其完成
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = () => {
        try {
          const result = onRejected ? onRejected(this.reason) : undefined;
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            reject(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      // 根据当前状态执行相应回调
      if (this.state === 'fulfilled') {
        handleFulfilled();
      } else if (this.state === 'rejected') {
        handleRejected();
      } else if (this.state === 'pending') {
        // 状态未确定时，存储回调
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  // catch 方法，用于捕获错误
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```

---

### **测试链式调用**

```javascript
// 测试代码
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

promise
  .then((value) => {
    console.log('第一个 then:', value); // 输出: 第一个 then: 1
    return value + 1;
  })
  .then((value) => {
    console.log('第二个 then:', value); // 输出: 第二个 then: 2
    return new MyPromise((resolve) => {
      setTimeout(() => resolve(value + 1), 1000);
    });
  })
  .then((value) => {
    console.log('第三个 then:', value); // 输出: 第三个 then: 3
  })
  .catch((err) => {
    console.error('捕获错误:', err);
  });
```

---

### **说明**

1. **链式调用实现** ：

* `then` 方法返回了一个新的 `MyPromise` 实例。
* 新的 `Promise` 会根据 `onFulfilled` 或 `onRejected` 的返回值决定后续的状态。

1. **支持异步回调** ：

* 回调通过 `onFulfilledCallbacks` 和 `onRejectedCallbacks` 存储，当状态变更时调用。

1. **异常捕获** ：

* 如果回调函数中抛出异常，Promise 会进入 `rejected` 状态。
* 可以通过链式调用的 `catch` 方法捕获这些异常。

---

### **总结**

这是一种简化版的 Promise 实现，符合 Promise 的核心逻辑，且支持链式调用和错误捕获。如果深入研究，可以参考 [Promises/A+ 规范](https://promisesaplus.com/)，实现更加严谨和完整的 Promise！
