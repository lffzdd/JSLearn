// 一.日期对象
const date = new Date();//实例化,获取当前时间
const date1=new Date(2019,0,1,12,30,30);//2019年1月1日12点30分30秒,获得指定时间
const data2=new Date('2019-01-01');//2019年1月1日0点0分0秒

// 日期对象返回的数据不能直接使用,需要转换
data2.getFullYear