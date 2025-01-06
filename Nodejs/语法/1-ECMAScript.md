---
noteId: "bf653a30cc3511efa6b161e924a3a869"
tags: []
---

 **ECMAScript** （简称  **ES** ）是由 **ECMA 国际（ECMA International）** 组织制定的一种标准化脚本语言规范，定义了脚本语言的核心功能。

它是多种脚本语言的基础标准，其中最著名的实现就是  **JavaScript** 。

---

### **详细说明**

1. **ECMAScript 的起源**

   * **JavaScript 的诞生** ：

   JavaScript 最初由 Brendan Eich 在 Netscape 公司于 1995 年开发，用于在浏览器中动态操作网页。

   * **标准化需求** ：

   随着 JavaScript 的流行，不同浏览器开发了自己的脚本语言实现（例如 JScript、ActionScript 等），导致了语言的行为和功能不一致。因此，Netscape 将 JavaScript 提交给 ECMA 国际，促使制定统一的脚本语言标准。

   * **ECMAScript 规范** ：

   1997 年，第一个 ECMAScript 版本（ES1）发布，定义了脚本语言的核心功能。
2. **ECMAScript 和 JavaScript 的关系**

   * ECMAScript 是标准，JavaScript 是标准的实现。
   * 其他 ECMAScript 的实现还包括：
     * **JScript** （微软）
     * **ActionScript** （Adobe Flash 使用的脚本语言）
3. **ECMAScript 规范的内容**
   ECMAScript 标准定义了语言的核心部分，包括：

   * **基本语法** ：变量声明、数据类型、表达式等。
   * **内置对象** ：如 `Object`、`Array`、`Function` 等。
   * **控制语句** ：如 `if`、`for`、`while` 等。
   * **错误处理** ：如 `try-catch`。
   * **模块化** ：从 ES6 开始引入 `import` 和 `export`。

   ECMAScript 不涉及以下内容（这些是由 JavaScript 具体实现的环境提供的功能）：

   * **DOM** （文档对象模型）：与网页交互的 API。
   * **BOM** （浏览器对象模型）：如 `window`、`navigator`、`location` 等。
   * **Node.js** 提供的 API：如 `fs`、`http` 等。

---

### **ECMAScript 的版本发展**

| **版本** | **发布时间** | **主要特性**                                                                                |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| **ES1**  | 1997               | 初始版本，定义了基本语法和内置对象。                                                              |
| **ES3**  | 1999               | 增加了正则表达式、`try-catch`错误处理。                                                         |
| **ES5**  | 2009               | 增加了严格模式（`use strict`）、JSON 支持、新增数组方法（如 `map`、`filter`）。             |
| **ES6**  | 2015               | 是一次重大更新，新增 `let`和 `const`、箭头函数、模板字符串、模块化、Promise、类、解构赋值等。 |
| **ES7**  | 2016               | 增加了指数操作符（`**`）和 `Array.prototype.includes`。                                       |
| **ES8**  | 2017               | 增加了 `async/await`、`Object.entries`和 `Object.values`等。                                |
| **ES9**  | 2018               | 增加了异步迭代器、`Promise.prototype.finally`等。                                               |
| **ES10** | 2019               | 增加了 `Array.prototype.flat`和 `Object.fromEntries`等。                                      |
| **ES11** | 2020               | 引入了可选链（`?.`）、空值合并操作符（`??`）、全局对象 `globalThis`等。                     |

每年 ECMAScript 标准都会更新并引入新功能。

---

### **通俗理解**

1. **JavaScript 是语言，ECMAScript 是它的标准规则** ：

   类似于“普通话是语言，而《现代汉语规范》是它的标准”。

1. **发展意义** ：

   随着 ECMAScript 的版本更新，JavaScript 不断增加新功能，这使得编写现代 JavaScript 更加高效和简洁。

1. **现代应用** ：

* 浏览器、Node.js 等环境都会支持 ECMAScript 的不同版本。
* 现代开发中主要使用 ES6 或更高版本的特性。

---

如果还有其他关于 ECMAScript 或 JavaScript 的问题，欢迎继续讨论！
