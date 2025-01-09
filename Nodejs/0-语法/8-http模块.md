---
noteId: "6aed2be0ce6d11ef87954d988d3ab5d9"
tags: []
---

在 **Node.js** 中，可以通过内置的 `http` 模块创建一个 HTTP 服务器，用来处理客户端的请求。以下是详细的讲解，包括示例代码、步骤解析，以及扩展内容。

---

### **1. 基本步骤**

1. **引入模块**
   * 使用 `require('http')` 导入 Node.js 的内置 `http` 模块。
2. **创建服务器**
   * 使用 `http.createServer()` 方法创建一个服务器实例。
   * 提供一个回调函数（称为请求监听器）作为参数，该函数接收两个参数：`request` 和 `response`。
3. **监听端口**
   * 使用 `server.listen(port, hostname, callback)` 方法，指定服务器监听的端口和主机名。

---

### **2. 基本示例代码**

```javascript
// Step 1: 引入 http 模块
const http = require('http');

// Step 2: 创建服务器
const server = http.createServer((req, res) => {
  // Step 3: 处理请求和响应

  // 设置响应头
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // 写入响应内容
  res.write('Hello, World!');

  // 结束响应
  res.end();
});

// Step 4: 服务器监听端口
const PORT = 3000; // 端口号
const HOSTNAME = '127.0.0.1'; // 主机名

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
```

---

### **3. 代码详解**

#### **(1) `http.createServer()`**

* 创建一个服务器实例。
* 参数是一个回调函数，接收两个对象：
  * `req` (request): 包含客户端的请求信息（如请求头、URL、方法等）。
  * `res` (response): 用来向客户端返回数据。

#### **(2) `res.writeHead()`**

* 设置响应头部信息。
* 第一个参数是 HTTP 状态码（如 200 表示成功）。
* 第二个参数是一个对象，指定响应头的键值对（如 `Content-Type`）。

#### **(3) `res.write()`**

* 写入响应体的内容，支持多次调用。

#### **(4) `res.end()`**

* 结束响应。如果不调用 `res.end()`，客户端会一直等待服务器响应。

#### **(5) `server.listen()`**

* 开始监听指定端口和主机名，等待客户端的请求。
* 参数：
  * `port`: 监听的端口号。
  * `hostname`: 主机名（如 `127.0.0.1` 表示本地）。
  * `callback`: 监听成功后执行的回调函数。

---

### **4. 处理请求信息**

通过 `req` 对象可以获取客户端请求的详细信息。

#### **示例代码：解析请求信息**

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 获取请求方法和 URL
  const method = req.method; // GET, POST, etc.
  const url = req.url; // 请求的路径
  const headers = req.headers; // 请求头信息

  console.log(`Request Method: ${method}`);
  console.log(`Request URL: ${url}`);
  console.log('Request Headers:', headers);

  // 响应
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Request received');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
```

---

### **5. 处理 POST 请求数据**

对于 POST 请求，可以通过 `req` 对象监听数据流事件。

#### **示例代码：处理 POST 数据**

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    // 数据块接收
    req.on('data', chunk => {
      body += chunk;
    });

    // 数据接收完成
    req.on('end', () => {
      console.log('Received data:', body);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Data received');
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
```

---

### **6. 返回 JSON 数据**

可以通过设置 `Content-Type: application/json` 来返回 JSON 格式的数据。

#### **示例代码：返回 JSON 数据**

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  const data = {
    message: 'Hello, World!',
    timestamp: new Date(),
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
});

server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
```

---

### **7. 高级功能**

#### **(1) 路由**

通过检查 `req.url` 和 `req.method` 实现简单的路由。

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the homepage!');
  } else if (req.url === '/about' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the about page.');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
```

#### **(2) HTTPS**

使用 `https` 模块可以创建 HTTPS 服务器，需要提供 SSL 证书。

#### **(3) 中间件**

可以结合第三方库（如  **Express** ）来实现中间件机制，简化开发。

---

### **总结**

* **`http` 模块** 是 Node.js 提供的基础网络模块，可以创建功能丰富的 HTTP 服务器。
* 它灵活但相对底层，适合构建简单的服务器。
* 对于复杂的需求，可以使用框架（如  **Express** ）简化开发。
