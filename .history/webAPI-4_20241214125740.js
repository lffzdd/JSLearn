// 一.日期对象
const date = new Date();//实例化,获取当前时间
const date1=new Date(2019,0,1,12,30,30);//2019年1月1日12点30分30秒,获得指定时间
const data2=new Date('2019-01-01');//2019年1月1日0点0分0秒

// 日期对象返回的数据不能直接使用,需要转换
data2.getFullYear();//获得年份,4位数
data2.getMonth();//获得月份,0~11
data2.getDate();//获得日期,1~31
data2.getDay();//获得星期几,0~6
data2.getHours();//获得小时,0~23
data2.getMinutes();//获得分钟,0~59
data2.getSeconds();//获得秒,0~59

// 时间戳
// 如果计算倒计时效果,前面方法无法直接使用,需要借助时间戳
//时间戳,从1970年1月1日0点0分0秒开始计算,单位毫秒
// 算法:
// 结束时间-当前时间=剩余时间
// 剩余时间/1000=剩余秒数,再/60=剩余分钟数,再/60=剩余小时数,再/24=剩余天数 
// 三种方法获取时间戳
console.log(date.getTime());//使用getTime()方法
console.log(+new Date());//使用+号,+号会调用valueOf()方法,+new Date()等同于new Date().valueOf()
console.log(Date.now());//使用Date.now()方法,无需