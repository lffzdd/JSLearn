class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallBacks = []
    this.onRejectedCallBacks = []

    const resolve = (value) => {
      this.state = 'fulfilled'
      this.value = value
      this.onFulfilledCallBacks.forEach((callback) => {
        callback(this.value)
      })
    }

    const reject = (reason) => {
      this.state = 'rejected'
      this.reason = reason
      this.onRejectedCallBacks.forEach((callback) => {
        callback(this.reason)
      })
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    } else if (this.state === 'rejected') {
      onRejected(this.reason)
    } else if (this.value === 'pending') {
      this.onFulfilledCallBacks.push(onFulfilled)
      this.onRejectedCallBacks.push(onRejected)
    }
  }
}

const promise=new MyPromise()


@Component   public class CORSFilter implements Filter {           @Override       public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)               throws IOException, ServletException {           HttpServletResponse res = (HttpServletResponse) response;           res.addHeader("Access-Control-Allow-Credentials", "true");           res.addHeader("Access-Control-Allow-Origin", "*");           res.addHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");           res.addHeader("Access-Control-Allow-Headers", "Content-Type,X-CAF-Authorization-Token,sessionToken,X-TOKEN");           if (((HttpServletRequest) request).getMethod().equals("OPTIONS")) {               response.getWriter().println("ok");               return;           }           chain.doFilter(request, response);       }       @Override       public void destroy() {       }       @Override       public void init(FilterConfig filterConfig) throws ServletException {       }   }