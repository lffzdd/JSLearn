---
noteId: "83c9c1c0b94e11ef8e6b4bf928155e05"
tags: []

---

# 一.`<link>`语法

HTML 中的 `<link>` 标签是用来定义与当前文档相关的外部资源的，通常用于加载外部样式表、预加载资源或设定网站的关联文件。

---

## **基本语法**

```html
<link rel="relationship" href="URL" type="MIME-type" />
```

---

## **常用属性**

| 属性                      | 描述                                                                      | 示例                                                |
| ------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------- |
| **`rel`**         | 定义当前文档与外部资源之间的关系。                                        | `<link rel="stylesheet" href="style.css">`        |
| **`href`**        | 指定外部资源的 URL。                                                      | `<link href="style.css">`                         |
| **`type`**        | 指定外部资源的 MIME 类型。                                                | `<link type="text/css">`                          |
| **`media`**       | 定义加载资源的媒体类型（如屏幕、打印）。                                  | `<link rel="stylesheet" media="print">`           |
| **`as`**          | 用于 `<link rel="preload">` 和 `<link rel="prefetch">` 指定资源类型。 | `<link rel="preload" as="image">`                 |
| **`crossorigin`** | 定义跨域资源共享策略。                                                    | `<link rel="stylesheet" crossorigin="anonymous">` |

---

## **常见用途**

### 1. **加载外部 CSS**

使用 `<link>` 加载样式表是其最常见的用途。

```html
<link rel="stylesheet" href="styles.css" />
```

**效果：** 将外部的 `styles.css` 文件加载到当前 HTML 页面中。

---

### 2. **设置网页图标（Favicon）**

为网页定义浏览器标签上的图标。

```html
<link rel="icon" href="favicon.ico" type="image/x-icon" />
```

---

### 3. **预加载资源**

提前加载资源以优化网页性能。

```html
<link rel="preload" href="image.jpg" as="image" />
```

**用途：** 预加载图片、字体、脚本等资源，减少用户等待时间。

---

### 4. **字体文件加载**

加载外部字体。

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
```

---

### 5. **打印样式**

为打印模式定义专用样式表。

```html
<link rel="stylesheet" href="print.css" media="print" />
```

**效果：** 当用户打印网页时，浏览器会使用 `print.css` 文件中的样式。

---

### 6. **预取资源**

告诉浏览器可以在空闲时间预先加载某些资源以供将来使用。

```html
<link rel="prefetch" href="next-page.html" />
```

**区别：**

- **Preload**：当前页面立即需要的资源。
- **Prefetch**：未来可能需要的资源。

---

### 7. **建立站点关联（Web App Manifest）**

为网页添加 PWA 支持。

```html
<link rel="manifest" href="/manifest.json" />
```

---

### **媒体查询与响应式设计**

`<link>` 标签可以配合 `media` 属性定义不同设备的样式。

```html
<link rel="stylesheet" href="mobile.css" media="screen and (max-width: 768px)" />
```

---

## **注意事项**

1. `<link>` 是 **空标签**，无需闭合。
2. 资源文件路径可以是相对路径（如 `styles.css`）或绝对路径（如 `https://example.com/styles.css`）。
3. 使用 `<link>` 加载 CSS 样式优于 `<style>` 内联样式，因其可复用性和分离性更好。
4. `rel="preload"` 和 `rel="prefetch"` 在性能优化中非常有用，但应谨慎使用以避免带宽浪费。

---

通过 `<link>` 标签可以实现网页资源的高效加载和管理，是优化网页性能和增强用户体验的重要工具之一。

# 二.`MIME`类型
