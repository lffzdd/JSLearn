---
noteId: "e559aa00cd9311ef8ddc4dc7fa41b30e"
tags: []
---

### **`ora` 模块是什么？**

`ora` 是一个用于在命令行中显示 **加载中（spinner）动画效果** 的 Node.js 模块。它常用于 CLI 工具中，向用户提供加载状态的视觉反馈，比如安装依赖、下载文件等场景。

---

### **`ora` 的功能**

1. **显示加载动画**：提供多种样式的加载动画（spinner）。
2. **支持文本状态更新**：在加载过程中动态更新显示文本。
3. **支持多种样式**：可以自定义动画样式、颜色和符号。
4. **支持异步操作**：适合在异步任务中使用。
5. **支持链式调用**：方便控制加载的开始、更新和结束。

---

### **安装**

通过 npm 或 yarn 安装：

```bash
npm install ora
```

---

### **基本用法**

以下是一个最简单的示例：

```javascript
const ora = require('ora');

// 创建一个加载动画实例
const spinner = ora('正在加载...').start();

// 模拟异步任务
setTimeout(() => {
  spinner.succeed('加载完成！'); // 成功时显示
}, 3000);
```

---

### **主要方法**

1. **`start([text])`**  
   开始动画，参数可选，设置初始文本。

   ```javascript
   spinner.start('开始加载...');
   ```

2. **`stop()`**  
   停止动画，清除加载效果。

   ```javascript
   spinner.stop();
   ```

3. **`succeed([text])`**  
   停止动画并显示成功状态。

   ```javascript
   spinner.succeed('任务成功完成！');
   ```

4. **`fail([text])`**  
   停止动画并显示失败状态。

   ```javascript
   spinner.fail('任务失败！');
   ```

5. **`info([text])`**  
   停止动画并显示信息状态。

   ```javascript
   spinner.info('一些信息提示');
   ```

6. **`warn([text])`**  
   停止动画并显示警告状态。

   ```javascript
   spinner.warn('警告提示');
   ```

7. **`text` 属性**  
   动态更新文本。

   ```javascript
   spinner.text = '新任务加载中...';
   ```

8. **`color` 属性**  
   设置加载动画的颜色。

   ```javascript
   spinner.color = 'yellow'; // 支持 blue, red, green 等
   ```

---

### **异步任务示例**

`ora` 特别适合处理异步任务的加载反馈：

```javascript
const ora = require('ora');

// 模拟异步操作
const spinner = ora('正在处理请求...').start();

setTimeout(() => {
  spinner.text = '继续处理其他任务';
  spinner.color = 'yellow';
}, 2000);

setTimeout(() => {
  spinner.succeed('请求完成！');
}, 4000);
```

---

### **高级功能**

#### (1) **自定义 Spinner 样式**

`ora` 内置了多种动画样式，也可以自定义：

```javascript
const ora = require('ora');

const spinner = ora({
  text: '自定义加载中...',
  spinner: 'dots', // 使用内置样式
}).start();
```

内置样式包括：

- `dots`
- `line`
- `arrow`
- `bouncingBar`
完整样式列表：[CLI Spinner 库](https://github.com/sindresorhus/cli-spinners)。

#### (2) **与 `Promise` 配合**

```javascript
const ora = require('ora');

const spinner = ora('正在加载数据...').start();

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('数据已加载'), 3000);
  });
}

fetchData()
  .then((result) => {
    spinner.succeed(result); // 显示成功信息
  })
  .catch((error) => {
    spinner.fail('加载失败');
  });
```

---

### **是否还在用？**

1. **依然流行**：`ora` 是一款轻量级、功能单一的工具，专注于加载动画效果，仍然被许多 CLI 项目使用。

2. **活跃维护**：截至 2025 年，`ora` 仍然有较好的社区支持和维护。

3. **替代方案**：
   - 如果需要更丰富的 CLI 功能（如表单交互），可以结合 **`inquirer`** 使用。
   - 如果项目需要复杂的动态终端效果，可以考虑 **`blessed`** 或 **`ink`**。

---

### **总结**

`ora` 是一个简单易用的命令行加载动画工具，非常适合在 Node.js 的 CLI 应用中提供友好的用户体验。如果需要实现更复杂的 CLI 交互，可以将其与其他工具结合使用，比如 `inquirer` 或 `commander`。
