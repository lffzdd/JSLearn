---
noteId: "a6fa1060ccf311efb56e89fc016fd0a6"
tags: []
---

`Inquirer.js` 是一个常用的交互式命令行工具，用于创建用户友好的命令行界面。以下是对其用法的详细说明：

---

### 1. 安装 Inquirer

在项目中使用之前，需要先安装它：

```bash
npm install inquirer
```

---

### 2. 引入模块

确保正确引入模块：

```javascript
const inquirer = require('inquirer');
```

---

### 3. 基本用法

使用 `inquirer.prompt()` 方法提示用户输入信息：

```javascript
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'input', // 问题类型
      name: 'username', // 存储答案的 key
      message: '请输入用户名:', // 提示信息
    },
  ])
  .then((answers) => {
    console.log('用户输入的内容是：', answers.username);
  });
```

---

### 4. 常用选项类型

以下是 `type` 的常见选项类型及用法：

1. **input** : 文本输入

```javascript
   {
     type: 'input',
     name: 'username',
     message: '请输入用户名:',
   }
```

1. **password** : 密码输入（输入的内容不会显示）

```javascript
   {
     type: 'password',
     name: 'password',
     message: '请输入密码:',
   }
```

1. **confirm** : 确认提示（`yes/no`）

```javascript
   {
     type: 'confirm',
     name: 'isAdmin',
     message: '你是管理员吗?',
   }
```

1. **list** : 单选列表

```javascript
   {
     type: 'list',
     name: 'color',
     message: '请选择颜色:',
     choices: ['红色', '蓝色', '绿色'], // 可选项
   }
```

1. **checkbox** : 多选列表

```javascript
   {
     type: 'checkbox',
     name: 'skills',
     message: '请选择你的技能:',
     choices: ['JavaScript', 'Python', 'C++', 'Java'],
   }
```

1. **number** : 数字输入

```javascript
   {
     type: 'number',
     name: 'age',
     message: '请输入你的年龄:',
   }
```

1. **rawlist** : 显示索引的单选列表

```javascript
   {
     type: 'rawlist',
     name: 'framework',
     message: '请选择框架:',
     choices: ['React', 'Vue', 'Angular'],
   }
```

---

### 5. 校验输入

可以通过 `validate` 属性校验用户输入：

```javascript
{
  type: 'input',
  name: 'email',
  message: '请输入邮箱地址:',
  validate: function (value) {
    const pass = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (pass) {
      return true;
    }
    return '请输入有效的邮箱地址!';
  },
}
```

---

### 6. 动态选项

`choices` 支持动态生成：

```javascript
{
  type: 'list',
  name: 'fruit',
  message: '请选择一个水果:',
  choices: () => {
    return ['苹果', '香蕉', '橙子'];
  },
}
```

---

### 7. 默认值

可以通过 `default` 设置默认值：

```javascript
{
  type: 'input',
  name: 'nickname',
  message: '请输入昵称:',
  default: '用户123', // 默认值
}
```

---

### 8. 多个问题的示例

```javascript
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'username',
    message: '请输入用户名:',
  },
  {
    type: 'password',
    name: 'password',
    message: '请输入密码:',
  },
  {
    type: 'list',
    name: 'role',
    message: '请选择角色:',
    choices: ['管理员', '用户', '访客'],
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log('用户输入的信息:');
  console.log(answers);
});
```

---

### 9. 高级用法

#### 动态加载问题

可以根据用户的回答动态生成后续的问题：

```javascript
const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'hasExperience',
    message: '你有编程经验吗?',
    choices: ['是', '否'],
  },
  {
    type: 'input',
    name: 'language',
    message: '你会什么编程语言?',
    when: (answers) => answers.hasExperience === '是', // 条件显示
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log('用户的回答:');
  console.log(answers);
});
```

#### 自定义渲染

可以自定义显示效果：

```javascript
const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'favoriteColor',
    message: '请选择你最喜欢的颜色:',
    choices: [
      {
        name: '红色 (充满热情)', // 显示的内容
        value: 'red', // 实际存储的值
      },
      {
        name: '蓝色 (理性冷静)',
        value: 'blue',
      },
      {
        name: '绿色 (自然清新)',
        value: 'green',
      },
    ],
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log('你选择的颜色是:', answers.favoriteColor);
});
```

---

### 10. 实用场景

* **脚手架工具** : 提示用户选择模板、输入项目名称等。
* **交互式工具** : 让用户自定义配置或选项。
* **命令行问答** : 提升命令行工具的可用性。

---

### 注意事项

* 确保 Node.js 环境支持 `require` 或使用 ES 模块的 `import`。
* `Inquirer.js` 支持 Promise 和异步操作，可结合 `async/await` 使用：
  ```javascript
  const answers = await inquirer.prompt(questions);
  console.log(answers);
  ```

通过以上示例和解释，你应该可以很好地掌握 `Inquirer.js` 的使用方法了。
