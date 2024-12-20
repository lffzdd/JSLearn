---
noteId: "83c99ab5b94e11ef8e6b4bf928155e05"
tags: []

---

**Emmet** 是一种用于加速 HTML 和 CSS 编写的缩写语法。通过输入简短的代码片段，Emmet 能快速生成复杂的代码结构，是前端开发中的一大效率工具。

---

## **基础语法**

### **1. 基本结构**

| 符号      | 描述                                  | 示例                     | 结果                             |
|-----------|---------------------------------------|--------------------------|----------------------------------|
| **`>`**   | 子元素（嵌套关系）                    | `div>p`                  | `<div><p></p></div>`            |
| **`+`**   | 同级兄弟元素                          | `div+p`                  | `<div></div><p></p>`            |
| **`^`**   | 返回父级（用于结束嵌套）              | `div>p^span`             | `<div><p></p></div><span></span>` |
| **`*`**   | 乘法（生成多个元素）                  | `ul>li*3`                | `<ul><li></li><li></li><li></li></ul>` |

---

### **2. 标识符**

| 符号        | 描述                     | 示例                     | 结果                              |
|-------------|--------------------------|--------------------------|-----------------------------------|
| **`#`**     | 设置 ID                 | `div#header`             | `<div id="header"></div>`         |
| **`.`**     | 设置类名                | `div.class`              | `<div class="class"></div>`       |
| **`[]`**    | 设置自定义属性          | `input[type="text"]`     | `<input type="text">`             |

---

### **3. 分组**

| 符号        | 描述                     | 示例                     | 结果                              |
|-------------|--------------------------|--------------------------|-----------------------------------|
| **`()`**    | 分组                     | `div>(header>h1)+footer` | `<div><header><h1></h1></header><footer></footer></div>` |

---

### **4. 文本和内容**

| 符号        | 描述                     | 示例                     | 结果                              |
|-------------|--------------------------|--------------------------|-----------------------------------|
| **`{}`**    | 设置文本内容             | `p{Hello}`               | `<p>Hello</p>`                   |

---

### **5. 增强功能**

| 功能          | 描述                     | 示例                     | 结果                              |
|---------------|--------------------------|--------------------------|-----------------------------------|
| **递增编号**  | 增加 `$` 实现编号插值    | `ul>li.item$*3`          | `<ul><li class="item1"></li><li class="item2"></li><li class="item3"></li></ul>` |
| **零填充**    | 使用 `$$` 填充 0         | `ul>li.item$$*3`         | `<ul><li class="item01"></li><li class="item02"></li><li class="item03"></li></ul>` |

---

## **常见示例**

### **HTML**

1. **简单嵌套结构：**

   ```text
   div>p>span
   ```

   **结果：**

   ```html
   <div>
       <p>
           <span></span>
       </p>
   </div>
   ```

2. **包含多个同级兄弟元素：**

   ```text
   header+section+footer
   ```

   **结果：**

   ```html
   <header></header>
   <section></section>
   <footer></footer>
   ```

3. **带编号列表：**

   ```text
   ul>li.item$*3
   ```

   **结果：**

   ```html
   <ul>
       <li class="item1"></li>
       <li class="item2"></li>
       <li class="item3"></li>
   </ul>
   ```

---

### **CSS**

1. **简单选择器：**

   ```text
   .box
   ```

   **结果：**

   ```css
   .box {
       
   }
   ```

2. **嵌套选择器：**

   ```text
   .container>.item
   ```

   **结果：**

   ```css
   .container > .item {
       
   }
   ```

3. **带伪类：**

   ```text
   a:hover
   ```

   **结果：**

   ```css
   a:hover {
       
   }
   ```

---

## **实战技巧**

1. 快速生成带有**图片和文字占位符**的结构：

   ```text
   div.card>img[src="image.jpg"]+p{Description here}
   ```

2. 快速生成**表单：**

   ```text
   form>label+input[type="text"]*3+button{Submit}
   ```

3. 快速生成多级嵌套结构：

   ```text
   div#app>header>nav>ul>li*3>a{Link $}
   ```

---

## **Emmet 的快捷键（VS Code 示例）**

1. 输入缩写后按 `Tab` 键展开。
2. 在**HTML 文件**中自动启用。
3. 可以在 VS Code 的 `settings.json` 中自定义 Emmet 设置：

   ```json
   {
       "emmet.includeLanguages": {
           "javascript": "javascriptreact",
           "vue-html": "html"
       }
   }
   ```

---

Emmet 是前端开发的高效工具，掌握其核心语法可以大幅度提高 HTML 和 CSS 的编写速度！
