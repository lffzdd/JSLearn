在 `XMLHttpRequest` (XHR) 中，`load` 事件的作用是指 **HTTP 请求完成且服务器已成功响应** 时触发的事件。这个事件表示请求已经完成并得到了响应，无论响应的状态码是成功（如 200）还是失败（如 404）。

---

### **XHR 的 `load` 事件**

* **定义** ：
* 当 `XMLHttpRequest` 完成并收到响应后触发。
* 它不关心响应的状态码，只要服务器发送了响应就会触发。
* **用途** ：
* 用于在请求完成后处理响应数据。
* 需要结合 `xhr.status` 属性检查响应的状态码，以确定请求是否成功。

---

### **示例代码**

#### 基本用法

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1', true);

xhr.addEventListener('load', function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log('请求成功:', xhr.responseText);
  } else {
    console.log('请求失败，状态码:', xhr.status);
  }
});

xhr.send();
```

* **关键点** ：
* `xhr.status`：检查 HTTP 响应状态码，确定是否成功。
* `xhr.responseText`：获取响应数据。

#### 与其他事件的对比

```javascript
xhr.addEventListener('load', function() {
  console.log('请求已完成，收到响应：', xhr.responseText);
});

xhr.addEventListener('error', function() {
  console.error('请求出错了');
});

xhr.addEventListener('abort', function() {
  console.log('请求被中止');
});

xhr.addEventListener('progress', function(event) {
  if (event.lengthComputable) {
    console.log(`下载进度：${event.loaded} / ${event.total}`);
  }
});
```

---

### **XHR 的事件触发顺序**

假设请求成功，通常事件触发的顺序如下：

1. **`readystatechange`** ：状态改变时触发多次（如连接建立、收到头部、收到完整响应等）。
2. **`progress`** ：数据接收时触发多次，用于监听下载进度。
3. **`load`** ：请求完成并收到响应后触发。
4. **`loadend`** ：请求完成后（无论成功或失败）触发。

---

### **重要说明**

1. **`load` 与 HTTP 状态码无关** ：

* 即使服务器返回了 `404` 或 `500`，`load` 事件仍然会触发。
* 要判断请求是否成功，必须检查 `xhr.status`。

1. **适用场景** ：

* `load` 事件适用于希望在请求完成后统一处理响应数据的场景。
* 对于需要更详细控制的情况，可以结合其他事件（如 `error` 和 `abort`）。

---

### **通俗理解**

* **`load` 事件** ：表示“服务器已经响应了我发的请求，接下来看响应的内容如何”。
* 它关注的是“请求完成”这个动作，而不是请求的结果是否符合预期。
