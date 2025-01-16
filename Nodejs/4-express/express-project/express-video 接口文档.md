# express-video 接口文档

## 接口说明

- 基于 RESTful API 接口规范
- 基于 JWT 身份认证
- 使用 CORS 跨域
- 接口基础请求地址: [http://127.0.0.1:3000/api/v1](http://127.0.0.1:3000/api/v1)
- 使用 JSON 格式进行数据通信

## 用户注册

path: `/user/registers`

method: `post`

是否认证: 否

| 字段     | 类型   | 必填 | 说明     |
| -------- | ------ | ---- | -------- |
| username | string | 是   | 用户名   |
| email    | string | 是   | 邮箱地址 |
| phone    | string | 是   | 手机号码 |
| password | string | 是   | 用户密码 |

请求示例:

```json
{
  "username": "xxx",
  "email": "xxx@gmail.com",
  "phone": "xxx xxxx xxxx",
  "password": "******"
}
```

响应示例:

```json
// success
{
  "username": "monica",
  "email": "12312312@qq.com",
  "password": "0324fdnjkt432",
  "phone": "123123213123",
  "avatar": null,
  "createAt": "2025-01-16T03:44:49.002Z",
  "updateAt": "2025-01-16T03:44:49.002Z",
  "_id": "6788814d0ac93b095da79b5a",
  "__v": 0
}

// error
```
