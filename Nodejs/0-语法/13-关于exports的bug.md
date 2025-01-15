---
noteId: "55a0eed0d31c11ef88a855d376ded819"
tags: []
---

在 Node.js 中，`exports`和`module.exports` 都用于导出模块内容，但它们的工作方式有所不同：

1. **[exports] 是 [module.exports] 的引用** ：

```javascript
// 初始状态
exports === module.exports; // true
```

2. 修改 exports 的属性不会影响 module.exports：

```javascript
exports.router = router;
// 等同于
module.exports.router = router;
```

3. 直接赋值 exports = router 会断开引用关系：

```javascript
exports = router;
// 这不会改变 module.exports，因此导出仍然是原始的 module.exports 对象
```

4. 正确的做法是直接赋值给 module.exports：

```javascript
module.exports = router;
```

这样可以确保导出的内容是 router。

**总结**：当你需要导出一个单一的对象（如 router）时，应该使用 module.exports = router。直接赋值给 exports 会导致导出内容不正确，因为它只改变了 exports 的引用，而 module.exports 仍然指向原始对象。
