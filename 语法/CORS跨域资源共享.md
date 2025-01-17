> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/leah126/article/details/141624726)

在做 Web 开发时，[CORS 跨域](https://so.csdn.net/so/search?q=CORS%20%E8%B7%A8%E5%9F%9F&spm=1001.2101.3001.7020)是我们经常遇到的问题，这篇文章，我们将一起分析什么是 CORS？CORS 的原理是什么？为什么需要 CORS？

# 什么是 CORS?

## 1. 什么是 CORS?

CORS，全称为 “[跨域资源共享](https://so.csdn.net/so/search?q=%E8%B7%A8%E5%9F%9F%E8%B5%84%E6%BA%90%E5%85%B1%E4%BA%AB&spm=1001.2101.3001.7020)”（Cross-Origin Resource Sharing），是一种机制，它使用额外的 HTTP 头来告诉浏览器允许一个网页从另一个域（不同于该网页所在的域）请求资源。这样可以在服务器和客户端之间进行安全的跨域通信。

当一个网页向不同源发出请求时，CORS 会通过以下几个步骤来处理：

- 预检请求（Preflight Request）：对于某些类型的请求（如使用 HTTP 方法 PUT、DELETE，或者请求带有非简单头部），浏览器会首先发送一个 OPTIONS 请求，这个请求称为 “预检请求”。服务器收到这个请求后，会返回一个响应头部，指明实际请求是否被允许。
- 实际请求（Actual Request）：如果预检请求通过，浏览器会继续发送实际的请求。
- 响应头部（Response Headers）：服务器在响应中会包含一些特定的 CORS 头部，如 Access-Control-Allow-Origin，以指示哪些域名可以访问资源。

## 2. 什么是 Origin？

Origin，翻译为 源（域），在 CORS 上下文中 Origin 由三个元素组成：

```
Origin = 协议 + 域名 + 端口

```

协议：例如 http:// 或 https:// 域名：例如 www.yuanjava.com 端口：例如 80（默认 HTTP 端口）、443（默认 HTTPs 端口）

只有上述三个元素都匹配时，我们才会认为两个 URL 具有相同的来源，否则，有任何一个不相同都认为不同源。

## 3. 同源策略

同源策略（Same-Origin Policy, SOP）是浏览器的一种安全机制，用于防止恶意网站通过脚本对其他网站的内容进行访问。

所谓 “同源”，是指协议、域名和端口都相同。比如，以下 URL 属于同源地址：

- https://yuanjava.com/categories 和 https://yuanjava.com/archives
- https://yuanjava.com:443 和 https://yuanjava.com:443/interview

## 4. 跨域请求

跨域请求是指从一个域向另一个域发起的 HTTP 请求。

在现代 Web 应用中，跨域请求非常常见，比如，从前端应用向不同的后端 API 服务器请求数据，或从一个 Web 服务请求另一个 Web 服务的资源，因为，同源策略默认会阻止这些请求，所以需要 CORS 机制来显式允许跨域访问。

以下 URL 则被认为是跨域请求：

- http://yuanjava.com 和 https://yuanjava.com（协议不同）
- http://yuanjava.com 和 http://blog.yuanjava.com（域名不同）
- http://yuanjava.com:80 和 http://yuanjava.com:8080（端口不同）

下图显示了 CORS 流的主要参与者：

![](https://i-blog.csdnimg.cn/blog_migrate/ddaa7de0699493643c5f4e29f388ef2f.png)

下图展示了浏览器默认允许同源请求，而跨域请求则被阻止：

![](https://i-blog.csdnimg.cn/blog_migrate/659fe6371b0fa8e68b00d7a533e7322c.png)

## 5. CORS 工作流程

CORS 通过在 HTTP(s) 请求和响应中使用特定的头部字段来实现跨域资源共享，具体来说，CORS 分为两种类型的请求处理方式：简单请求和预检请求。

- **简单请求**：对于某些简单的 HTTP 请求（如 GET、POST 请求且不包含自定义头部），浏览器会直接发送请求，并在响应中检查 CORS 头部。
- **预检请求**：对于复杂请求（如使用 PUT、DELETE 方法，或包含自定义头部），浏览器会首先发送一个 OPTIONS 请求，称为预检请求（Preflight Request），以确定服务器是否允许实际请求。

### 简单请求

简单请求是指满足以下条件的 HTTP 请求：

- 使用 GET、POST、HEAD 方法
- 请求头部仅包含以下字段：Accept、Accept-Language、Content-Language、Content-Type（且值为 application/x-www-form-urlencoded、multipart/form-data 或 text/plain）

对于简单请求，浏览器会直接发送请求并在响应中检查以下 CORS 头部：

- Access-Control-Allow-Origin：指示允许访问资源的源。
- Access-Control-Allow-Credentials：指示是否允许发送凭据（如 Cookies）。
- Access-Control-Expose-Headers：指示哪些头部可以作为响应的一部分被访问。

比如，下面一个示例：

客户端请求：

```
GET /api/data HTTP/1.1   Host: www.yuanjava.com   Origin: https://yuanjava.com

```

服务器响应：

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com   Content-Type: application/json      {"message": "Hello, CORS!"}

```

### 预检请求

对于复杂请求，浏览器会首先发送一个 `OPTIONS` 请求，包含以下头部字段：

- Origin：指示请求的源。
- Access-Control-Request-Method：指示实际请求将使用的方法。
- Access-Control-Request-Headers：指示实际请求将包含的自定义头部。

服务器收到预检请求后，会返回一个响应，包含以下头部字段以指示是否允许请求：

- Access-Control-Allow-Origin：表明允许访问资源的源，可以是具体的源或通配符 \*；
- Access-Control-Allow-Methods：表明允许的方法，如 GET, POST, PUT, DELETE；
- Access-Control-Allow-Headers：表明允许的自定义头部；
- Access-Control-Allow-Credentials：表明是否允许发送凭据（如 Cookies）；
- Access-Control-Expose-Headers：表明哪些头部可以作为响应的一部分被访问；
- Access-Control-Max-Age：表明预检请求的结果可以被缓存的时间，单位是秒；

如果预检请求通过，浏览器会继续发送实际请求。

比如，下面一个示例：

预检请求：

```
OPTIONS /api/data HTTP/1.1   Host: api.yuanjava.com   Origin: https://yuanjava.com   Access-Control-Request-Method: PUT   Access-Control-Request-Headers: Content-Type

```

预检响应：

```
HTTP/1.1 204 No Content   Access-Control-Allow-Origin: https://yuanjava.com   Access-Control-Allow-Methods: GET, POST, PUT   Access-Control-Allow-Headers: Content-Type   Access-Control-Allow-Credentials: true   Access-Control-Max-Age: 3600

```

实际请求

```
PUT /api/data HTTP/1.1   Host: api.yuanjava.com   Origin: https://yuanjava.com   Content-Type: application/json      {"data": "example"}

```

实际响应：

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com   Content-Type: application/json      {"message": "Data updated"}

```

## 6. 如何实现 CORS？

### 客户端处理

客户端可以向远程服务器发送签名请求。

如下示例代码：在 CORS 请求中以 Authorization 标头的形式发送凭据：

```javascript
function sendAuthRequestToCrossOrigin() {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('demo').innerHTML = this.responseText
    }
  }
  xhr.open('GET', 'https://yuanjava:8000/categories', true)
  xhr.setRequestHeader('Authorization', 'Bearer rtikkjhgffw456tfdd')
  xhr.withCredentials = true
  xhr.send()
}
```

### 服务器端处理

**方法 1：直接采用 SpringBoot 的注解 `@CrossOrigin`**

如下示例代码如下，可以把 `@CrossOrigin` 加在每个 Controller 上，也可以加在它们的公共父类上：

```JavaScript
@CrossOrigin   @RestController   public class TestController extends BaseController {          //  其他逻辑   }

```

**方法 2: 采用过滤器（filter）的方式**

如下示例代码：增加一个 CORSFilter 类，并实现 Filter 接口即可。

```java
@Component
public class CORSFilter implements Filter {
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    HttpServletResponse res = (HttpServletResponse) response;
    res.addHeader("Access-Control-Allow-Credentials", "true");
    res.addHeader("Access-Control-Allow-Origin", "*");
    res.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.addHeader("Access-Control-Allow-Headers", "Content-Type,X-CAF-Authorization-Token,sessionToken,X-TOKEN");
    if (((HttpServletRequest) request).getMethod().equals("OPTIONS")) {
      response.getWriter().println("ok");
      return;
    }
    chain.doFilter(request, response);
  }

  @Override
  public void destroy() {
  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
  }
}
```

**方法 3: 配置 Configuration**

如下示例代码：增加一个配置类继承 WebMvcConfigurerAdapter 或者实现 WebMvcConfigurer 接口，项目启动时，会自动读取配置。

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class CorsConfig extends WebMvcConfigurerAdapter {
  static final String ORIGINS[] = new String[]{"GET", "POST", "PUT", "DELETE"};

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("*")
        .allowCredentials(true)
        .allowedMethods(ORIGINS)
        .maxAge(3600);
  }
}
```

另外，在服务器，可以通过设置响应头部来细粒度配置 CORS，具体的如下：

**1. 允许所有源访问**

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: *

```

**2. 允许特定源访问**

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com

```

**3. 允许凭据请求访问**

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com   Access-Control-Allow-Credentials: true

```

**4. 允许特定方法和头部**

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com   Access-Control-Allow-Methods: GET, POST, PUT, DELETE   Access-Control-Allow-Headers: Content-Type, Authorization

```

**5. 设置预检请求的缓存时间**

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com   Access-Control-Allow-Methods: GET, POST, PUT, DELETE   Access-Control-Allow-Headers: Content-Type, Authorization   Access-Control-Max-Age: 3600  // 3600秒

```

通常来说，在服务器解决 CORS 是一种比较常见和彻底的方式，我们可以在服务器灵活的设置允许跨域访问的域名或者地址。

## 7. 常见问题及解决方案

---

**问题 1：No ‘Access-Control-Allow-Origin’ header is present on the requested resource**

**问题描述**：当浏览器发起跨域请求时，未在响应中找到 Access-Control-Allow-Origin 头部。

**解决方案**：确保服务器端正确设置了 Access-Control-Allow-Origin 头部。例如：

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com

```

**问题 2：The value of the ‘Access-Control-Allow-Origin’ header in the response must not be the wildcard ‘\*’ when the request’s credentials mode is ‘include’**

**问题描述**：当请求包含凭据时，Access-Control-Allow-Origin 头部不能设置为通配符 \*。

**解决方案**：明确指定允许的源，并确保设置了 Access-Control-Allow-Credentials 头部。例如：

```
HTTP/1.1 200 OK   Access-Control-Allow-Origin: https://yuanjava.com   Access-Control-Allow-Credentials: true

```

**问题 3：CORS preflight channel did not succeed**

**问题描述**：预检请求失败，可能是由于服务器未正确处理 OPTIONS 请求。

**解决方案**：确保服务器正确处理 OPTIONS 请求并返回相应的 CORS 头部。例如，在 Node.js/Express 中：

```
app.options('/api/data', (req, res) => {     res.header('Access-Control-Allow-Origin', 'https://yuanjava.com');     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');     res.header('Access-Control-Allow-Credentials', 'true');     res.sendStatus(204);   });

```

## 8. 总结

---

CORS 是现代 Web 开发中不可或缺的机制，它允许 Web 应用在安全的前提下进行跨域资源请求，通过理解 CORS 的工作原理和配置方法，可以帮助我们有效地解决跨域请求的问题。

` **黑客 & 网络安全如何学习**

**今天只要你给我的文章点赞，我私藏的网安学习资料一样免费共享给你们，来看看有哪些东西。**

##### [](https://blog.csdn.net/Python_0011/article/details/131100481?spm=1001.2014.3001.5502)**1. 学习路线图**

![](https://i-blog.csdnimg.cn/blog_migrate/8d854a061370b096c60239ed169100b4.png)

攻击和防守要学的东西也不少，具体要学的东西我都写在了上面的路线图，如果你能学完它们，你去就业和接私活完全没有问题。

##### [](https://blog.csdn.net/Python_0011/article/details/131100481?spm=1001.2014.3001.5502)**2. 视频教程**

网上虽然也有很多的学习资源，但基本上都残缺不全的，这是我自己录的网安视频教程，上面路线图的每一个知识点，我都有配套的视频讲解。

内容涵盖了网络安全法学习、网络安全运营等保测评、渗透测试基础、漏洞详解、计算机基础知识等，都是网络安全入门必知必会的学习内容。

![](https://i-blog.csdnimg.cn/blog_migrate/e50cf61b134b6ce47ae0921b38e5374b.jpeg)

（都打包成一块的了，不能一一展开，总共 300 多集）

因篇幅有限，仅展示部分资料，需要点击下方链接即可前往获取

**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***[CSDN 大礼包：《黑客 &amp; 网络安全入门 &amp; 进阶学习资源包》免费分享](https://mp.weixin.qq.com/s/Z0QpzQFIqasJPfRNUb25dg 'CSDN大礼包：《黑客&网络安全入门&进阶学习资源包》免费分享')**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***

##### [](https://blog.csdn.net/Python_0011/article/details/131100481?spm=1001.2014.3001.5502)**3. 技术文档和电子书**

技术文档也是我自己整理的，包括我参加大型网安行动、CTF 和挖 SRC 漏洞的经验和技术要点，电子书也有 200 多本，由于内容的敏感性，我就不一一展示了。

![](https://i-blog.csdnimg.cn/blog_migrate/af3143af2faeb7d732574531936004ac.jpeg#pic_center)

因篇幅有限，仅展示部分资料，需要点击下方链接即可前往获取

**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***[CSDN 大礼包：《黑客 &amp; 网络安全入门 &amp; 进阶学习资源包》免费分享](https://mp.weixin.qq.com/s/Z0QpzQFIqasJPfRNUb25dg 'CSDN大礼包：《黑客&网络安全入门&进阶学习资源包》免费分享')**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***

##### [](https://blog.csdn.net/Python_0011/article/details/131100481?spm=1001.2014.3001.5502)**4. 工具包、面试题和源码**

“工欲善其事必先利其器” 我为大家总结出了最受欢迎的几十款款黑客工具。涉及范围主要集中在 信息收集、Android 黑客工具、自动化工具、网络钓鱼等，感兴趣的同学不容错过。

还有我视频里讲的案例源码和对应的工具包，需要的话也可以拿走。

因篇幅有限，仅展示部分资料，需要点击下方链接即可前往获取

**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***[CSDN 大礼包：《黑客 &amp; 网络安全入门 &amp; 进阶学习资源包》免费分享](https://mp.weixin.qq.com/s/Z0QpzQFIqasJPfRNUb25dg 'CSDN大礼包：《黑客&网络安全入门&进阶学习资源包》免费分享')**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***

最后就是我这几年整理的网安方面的面试题，如果你是要找网安方面的工作，它们绝对能帮你大忙。

这些题目都是大家在面试深信服、奇安信、腾讯或者其它大厂面试时经常遇到的，如果大家有好的题目或者好的见解欢迎分享。

参考解析：深信服官网、奇安信官网、Freebuf、csdn 等

内容特点：条理清晰，含图像化表示更加易懂。

内容概要：包括 内网、操作系统、协议、渗透测试、安服、漏洞、注入、XSS、CSRF、SSRF、文件上传、文件下载、文件包含、XXE、逻辑漏洞、工具、SQLmap、NMAP、BP、MSF…

![](https://i-blog.csdnimg.cn/blog_migrate/fcfc2d437bfcf8bde5dce80d515f83a9.png)

因篇幅有限，仅展示部分资料，需要点击下方链接即可前往获取

**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***[CSDN 大礼包：《黑客 &amp; 网络安全入门 &amp; 进阶学习资源包》免费分享](https://mp.weixin.qq.com/s/Z0QpzQFIqasJPfRNUb25dg 'CSDN大礼包：《黑客&网络安全入门&进阶学习资源包》免费分享')**\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***
