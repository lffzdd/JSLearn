### 从 **XMLHttpRequest** 到 **fetch** 和 **axios** 的发展历程

1. **XMLHttpRequest (XHR)**
   * **出现背景** : 为了让网页与服务器通信无需刷新整个页面，XHR 提供了异步请求能力（AJAX）。
   * **特点** :
   * 提供了基础功能，但 API 复杂且回调嵌套难以维护。
   * 不支持 Promise，需要手动处理状态变化 (`onreadystatechange`) 和错误。
   * **示例** :

   ```javascript
   const xhr = new XMLHttpRequest();
   xhr.open('GET', 'https://api.example.com/data', true);
   xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
       if (xhr.status === 200) {
         console.log(xhr.responseText);
       } else {
         console.error('Request failed');
       }
     }
   };
   xhr.send();
   ```
2. **Fetch API**
   * **出现背景** : 提供一个更现代的替代方案，基于 Promise，使代码更简洁、可读性更强。
   * **特点** :
   * 基于 Promise，可以直接使用 `.then` 和 `.catch`。
   * 支持链式调用，适合处理异步逻辑。
   * API 更语义化，贴近现代 JavaScript 编程风格。
   * 不支持直接取消请求（直到 `AbortController` 的引入）。
   * 错误处理只捕获网络错误，HTTP 状态码错误需手动处理。
   * **示例** :

   ```javascript
   fetch('https://api.example.com/data')
     .then(response => {
       if (!response.ok) {
         throw new Error('HTTP error! status: ' + response.status);
       }
       return response.json();
     })
     .then(data => console.log(data))
     .catch(error => console.error(error));
   ```
3. **Axios**
   * **出现背景** : 基于 `fetch` 和 `XHR` 提供更高级封装，解决了某些 `fetch` 的不足（如自动 JSON 处理、更便捷的错误捕获）。
   * **特点** :
   * 默认支持 JSON 数据解析。
   * 更强大的配置选项：支持超时设置、取消请求、请求/响应拦截器。
   * 跨浏览器兼容性更好。
   * 请求和响应数据结构统一，简化处理。
   * **示例** :

   ```javascript
   import axios from 'axios';

   axios.get('https://api.example.com/data')
     .then(response => console.log(response.data))
     .catch(error => console.error(error));
   ```

---

### **详细介绍 Fetch 和 Axios**

#### **Fetch API**

1. **用法简洁**
   ```javascript
   fetch('https://api.example.com/data', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ key: 'value' })
   })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error:', error));
   ```
2. **优缺点** :

* **优点** :
  * 简洁易用，基于标准化的 Promise。
  * 原生支持现代浏览器，无需额外依赖。
* **缺点** :
  * 不自动解析 JSON，需要手动调用 `response.json()`。
  * HTTP 错误（如 404）不会抛出异常，需要手动检查 `response.ok`。
  * 取消请求需要额外引入 `AbortController`。

1. **取消请求（AbortController）** :

```javascript
   const controller = new AbortController();
   const signal = controller.signal;

   fetch('https://api.example.com/data', { signal })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => {
       if (error.name === 'AbortError') {
         console.error('Fetch aborted');
       } else {
         console.error('Error:', error);
       }
     });

   // 取消请求
   controller.abort();
```

---

#### **Axios**

1. **用法更灵活**

   * **GET 请求** :

   ```javascript
   axios.get('https://api.example.com/data')
     .then(response => console.log(response.data))
     .catch(error => console.error(error));
   ```

   * **POST 请求** :

   ```javascript
   axios.post('https://api.example.com/data', {
     key: 'value'
   })
     .then(response => console.log(response.data))
     .catch(error => console.error(error));
   ```
2. **全局配置** :

```javascript
   axios.defaults.baseURL = 'https://api.example.com';
   axios.defaults.headers.common['Authorization'] = 'Bearer token';
   axios.defaults.timeout = 10000; // 设置超时时间
```

1. **拦截器** :

* **请求拦截器** :
  ``javascript axios.interceptors.request.use(config => { console.log('Request sent:', config); return config; }); ``
* **响应拦截器** :
  ``javascript axios.interceptors.response.use( response => response, error => { console.error('Response error:', error); return Promise.reject(error); } ); ``

1. **取消请求** :

```javascript
   const source = axios.CancelToken.source();

   axios.get('https://api.example.com/data', {
     cancelToken: source.token
   })
     .then(response => console.log(response.data))
     .catch(error => {
       if (axios.isCancel(error)) {
         console.error('Request canceled:', error.message);
       } else {
         console.error('Error:', error);
       }
     });

   // 取消请求
   source.cancel('Request canceled by the user.');
```

1. **优缺点** :

* **优点** :
  * 自动处理 JSON 数据。
  * 内置拦截器，支持全局设置。
  * 支持取消请求，超时配置简单。
* **缺点** :
  * 需要额外安装，增加依赖。
  * 比较重，不适合特别轻量的项目。

---

### **总结对比**

| 特性                      | XMLHttpRequest   | Fetch API                | Axios               |
| ------------------------- | ---------------- | ------------------------ | ------------------- |
| **基础支持**        | 原生支持，较复杂 | 原生支持，语法现代化     | 第三方库，功能丰富  |
| **Promise 支持**    | 无               | 原生支持                 | 原生支持            |
| **错误处理**        | 手动处理状态码   | 手动检查状态码           | 自动捕获 HTTP 错误  |
| **取消请求**        | 无               | 通过 `AbortController` | 内置取消功能        |
| **全局配置/拦截器** | 无               | 无                       | 支持请求/响应拦截器 |
| **JSON 自动解析**   | 无               | 无                       | 支持                |

建议根据项目需求选择合适的工具：轻量项目用 `fetch`，需要更多功能时用 `axios`。
