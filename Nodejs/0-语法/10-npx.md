---
noteId: "259387a0ce9111efb00e6b232db7eb04"
tags: []
---

### **什么是 `npx` 命令？**

`npx` 是一个 Node.js 命令行工具，随 **npm 5.2.0** 及以上版本默认安装。它的主要功能是 **方便地运行 Node.js 模块中的 CLI 工具，而不需要全局安装它们** 。

---

### **`npx` 的主要功能**

1. **临时执行本地或远程模块：**

   * 使用 `npx`，你可以直接运行一个模块，而不需要先通过 `npm install` 安装。
   * 如果模块不存在，`npx` 会自动从 npm 注册表中下载、执行，然后删除它。

   **示例：**

   ```bash
   npx cowsay "Hello World"
   ```

   输出：

   ```
    _______
   < Hello World >
    -------
           \   ^__^
            \  (oo)\_______
               (__)\       )\/\
                   ||----w |
                   ||     ||
   ```
2. **运行本地依赖的 CLI 工具：**

   * 如果项目中安装了某个工具（作为 `devDependencies` 或 `dependencies`），无需将其添加到全局环境中，只需通过 `npx` 运行。

   **示例：**

   ```bash
   npx eslint index.js
   ```
3. **避免全局污染：**

   * 在全局安装许多 CLI 工具会使环境变得复杂和混乱。`npx` 允许直接使用工具而不进行全局安装，避免污染全局环境。
4. **运行特定版本的工具：**

   * `npx` 支持指定工具的版本，可以轻松切换或测试特定版本的工具。

   **示例：**

   ```bash
   npx create-react-app@latest my-app
   ```
5. **执行非安装模块：**

   * 甚至可以运行未安装的脚本或模块，而无需在项目中安装它。

   **示例：**

   ```bash
   npx https://github.com/sindresorhus/awesome-lint
   ```

---

### **`npx` 的常用场景**

1. **快速创建项目：**

   * 使用 `npx` 直接运行生成器工具，无需全局安装。

   **示例：**

   ```bash
   npx create-react-app my-app
   npx @vue/cli create my-vue-app
   ```
2. **运行临时脚本：**

   * 如果需要快速测试某个模块或工具，可以使用 `npx`。

   **示例：**

   ```bash
   npx json-server --watch db.json
   ```
3. **测试不同版本：**

   * 如果需要测试工具的某个版本，而不影响现有环境，可以通过 `npx` 安全运行。

   **示例：**

   ```bash
   npx webpack@5 --version
   ```
4. **避免全局安装开发工具：**

   * 许多开发工具如 `eslint`, `prettier`，只需在项目中使用，没必要安装在全局环境。

   **示例：**

   ```bash
   npx prettier --write src/
   ```

---

### **工作原理**

1. **本地搜索：**

   * 当运行 `npx` 时，它首先在本地 `node_modules/.bin` 中查找命令。
   * 如果找到，就直接执行。
2. **远程搜索：**

   * 如果本地没有找到命令，它会尝试从 npm 注册表中下载模块到临时目录中，并运行。
3. **临时缓存：**

   * 下载到的临时模块在执行完成后会立即删除，除非加上 `--no-cleanup` 参数。
4. **支持动态参数传递：**

   * 通过 `npx` 运行的 CLI 工具支持参数传递。

   **示例：**

   ```bash
   npx cowsay "Custom message"
   ```

---

### **与 npm 的区别**

| **功能**          | **npm**                      | **npx**                |
| ----------------------- | ---------------------------------- | ---------------------------- |
| **安装模块**      | 需要手动安装（全局或本地）。       | 不需要安装，直接运行。       |
| **执行 CLI 工具** | 只能运行已安装的模块。             | 支持运行未安装的模块。       |
| **全局污染**      | 会污染全局环境（全局安装的模块）。 | 无需全局安装，减少污染。     |
| **版本管理**      | 需要手动安装特定版本。             | 直接运行指定版本，无需安装。 |

---

### **`npx` 的注意事项**

1. **兼容性：**
   * `npx` 随 npm 5.2.0 及以上版本安装，旧版需要手动安装：
     ```bash
     npm install -g npx
     ```
2. **删除缓存：**
   * 运行 `npx` 时，临时模块会下载到缓存目录，可以使用以下命令清理缓存：
     ```bash
     npm cache clean --force
     ```
3. **性能开销：**
   * 对于未安装的模块，每次运行时都需要下载，可能增加延迟。

---

# 二


**是的，基本可以这样理解！**

运行 `npx express-generator` 的流程本质上相当于：

1. **临时安装 `express-generator`** （类似 `npm install express-generator`，但只在临时目录中）。
2. **执行 `express-generator` 提供的 CLI 工具命令** （相当于运行 `npx` 后自动执行生成的命令）。
3. **执行完后自动清理临时安装的包** （不需要手动 `npm uninstall`）。

下面具体解释这个过程和其中的机制：

---

### **为什么 `npx` 不需要手动安装和卸载？**

1. **临时安装的机制：**
   * 如果你运行 `npx express-generator`，而本地或全局中并没有安装 `express-generator`，`npx` 会：
     * 从 `npm` 仓库临时下载该包。
     * 将其安装到一个临时缓存目录中。
     * 在执行时直接从临时目录调用 `bin` 字段中定义的命令。
2. **临时清理的机制：**
   * 使用完之后，这些临时安装的文件会被自动清理，节省本地存储空间。
   * 因为是临时安装，所以没有修改你的 `node_modules` 或 `package.json` 文件。
3. **缓存机制：**
   * 如果你多次运行同一个命令，`npx` 可能会从缓存中直接调用之前临时安装的包，而不会重复下载（节省时间和网络资源）。

---

### **为什么 `npx` 不总是临时安装？**

如果 `npx` 检测到你 **已经安装了目标包** （无论是本地还是全局安装），它会优先使用现有的包，而不会重复安装。例如：

* 如果你全局安装了 `express-generator`：

  ```bash
  npm install -g express-generator
  ```

  那么运行：

  ```bash
  npx express-generator
  ```

  会直接调用全局的 `express-generator`，而不是进行临时安装。

---

### **npx 的简化流程**

假如没有全局安装 `express-generator`，运行：

```bash
npx express-generator
```

等同于以下手动操作：

1. 临时安装 `express-generator`：

   ```bash
   npm install express-generator --no-save
   ```

   （`--no-save` 确保不会写入 `package.json` 或留下持久依赖）
2. 执行 `express-generator` 提供的 CLI 命令：

   ```bash
   ./node_modules/.bin/express-generator
   ```

   （`npx` 自动查找并运行依赖的 `bin` 命令）
3. 卸载或清理临时安装的包。

---

### **优点：为什么用 `npx` 而不是直接安装？**

1. **省事** ：

* 不需要手动安装和卸载，只需一次命令就完成工具的下载、运行和清理。
* 特别适用于只用一次的工具（如 `express-generator` 或其他脚手架）。

1. **节省存储空间** ：

* 临时工具不会长期占用项目或系统存储。

1. **避免污染项目依赖** ：

* 如果不需要长期使用某个工具，避免在项目 `package.json` 中写入不必要的依赖。

---

### **总结**

`npx express-generator` 本质上是一个 **快捷方式** ，它整合了以下操作：

1. 临时安装。
2. 执行工具。
3. 自动清理。

所以，可以理解为：

```bash
npm install express-generator --no-save
./node_modules/.bin/express-generator
npm uninstall express-generator
```

`npx` 帮助我们自动完成了这些步骤，提供了更方便的使用体验！
