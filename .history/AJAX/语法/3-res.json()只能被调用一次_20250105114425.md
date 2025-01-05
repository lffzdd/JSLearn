`res.json()` 返回的 Promise 只能被调用一次，并且解析后不能再次调用，这是由 **`Promise` 的设计规范** 和 **`res.json()` 的实现机制**共同决定的。

---

### **核心原因分析**

#### 1. **`Promise` 的规范**

* 一个 Promise 的状态只能从 **pending** 转变为 **fulfilled** 或  **rejected** ，而且这个状态转变是  **不可逆的** 。
* 一旦状态变为 `fulfilled`，Promise 会将其结果（`value`）锁定，后续的 `.then` 或 `await` 都是基于这个结果。
* Promise 是一次性的：调用 `.then` 或 `await` 时并不会重新执行原始操作，而只是基于已经锁定的结果。

---

#### 2. **`res.json()` 的特殊性**

* **`res.json()` 的作用** ：
* 它将响应体（`response.body`）的内容读取并解析为 JSON 对象。
* 这个解析过程是异步的，因此返回了一个 Promise。
* **为什么只能调用一次** ：
* `res.json()` 内部会从流（`response.body`）中  **读取数据** 。
* HTTP 响应的 `body` 是一个  **ReadableStream** ，它的数据是一次性消费的：
  * 一旦数据被读取，就不能再次读取，流也会被关闭。
  * 因此，`res.json()` 第二次调用时，流中已经没有数据了。
* **行为示例** ：

```javascript
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      // 第一次调用 res.json()：解析 JSON 数据
      return response.json();
    })
    .then(data => {
      console.log('解析成功:', data);
      // 尝试再次调用 res.json()：会失败
      return response.json(); // 错误：ReadableStream 已经被消费
    })
    .catch(err => console.error('错误:', err));
```

  错误提示类似：`TypeError: Body has already been consumed`

---

### **总结：原因归纳**

1. **Promise 的特性** ：

* `res.json()` 返回的是一个 Promise，Promise 的结果是不可变且一次性的。

1. **流（ReadableStream）的一次性消费特性** ：

* `res.json()` 内部消费了流，流中的数据不能再次读取。

1. **调用 `res.json()` 多次的解决方法** ：

* 如果需要多次使用响应体，可以在第一次调用后将解析的结果保存起来，而不是直接调用 `res.json()` 多次。

---

### **实践解决多次使用响应体的问题**

如果你需要多次使用响应体，可以在第一次解析后存储结果：

#### 示例：

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    console.log('第一次解析:', data);
    // 再次使用存储的结果，而不是再次调用 res.json()
    console.log('再次使用数据:', data);
  })
  .catch(err => console.error('错误:', err));
```

---

 **小结** ：

`res.json()` 的一次性行为主要是因为  **流被消费后无法重新读取** ，而不是 `Promise` 本身的限制。不过，Promise 的不可变特性也使得结果的处理更安全、可预测。
