// 正则表达式

// 一.用法
let str = 'IT培训课程:JS高级课程,JS基础课程,HTML5课程,CSS3课程'
// 1.创建正则表达式
let reg = /JS/g // / /之间是正则表达式,JS是要匹配的字符串,g是全局匹配
// 2.使用正则表达式
// reg.test()方法返回true或false,表示是否匹配到
console.log( reg.test( str ) ) //test()方法返回true或false,表示是否匹配到
// reg.exec()方法返回一个数组,表示匹配到的结果,没有匹配到返回null
console.log( reg.exec( str ) ) //exec()方法返回一个数组,表示匹配到的结果,没有匹配到返回null
// [ 'JS', index: 6, input: 'IT培训课程:JS高级课程,JS基础课程,HTML5课程,CSS3课程', groups: undefined ],只返回第一个匹配到的结果
// exec()只返回第一个匹配到的结果,再次调用会返回下一个匹配到的结果,直到没有匹配到为止,想要匹配所有结果,需要使用循环
let result = reg.exec( str )
while ( result ) {
    console.log( result )
    result = reg.exec( str )
}

// 二.元字符
// 1.边界元字符
// ^:匹配字符串的开始位置
let reg1 = /^IT/g
// $:匹配字符串的结束位置
let reg2 = /CSS3$/g

// 2.数量元字符
// *:匹配前面的字符0次或多次
let reg3 = /JS*/g //匹配J后面的S,0次或多次,即匹配J或JS或JSS或JSSS...
// +:匹配前面的字符1次或多次
let reg4 = /JS+/g //匹配J后面的S,1次或多次,即匹配JS或JSS或JSSS...
// ?:匹配前面的字符0次或1次
let reg5 = /JS?/g //匹配J后面的S,0次或1次,即匹配J或JS
// {n}:匹配前面的字符n次
let reg6 = /JS{2}/g //匹配J后面的S,2次,即匹配JSS
// {n,}:匹配前面的字符至少n次
let reg7 = /JS{2,}/g //匹配J后面的S,至少2次,即匹配JSS或JSSS...
// {n,m}:匹配前面的字符n到m次
let reg8 = /JS{1,2}/g //匹配J后面的S,1到2次,即匹配JS或JSS

// 3.字符类元字符
// [ ]:匹配[ ]中的任意一个字符
let reg9 = /[JS]/g //匹配J或S
// [^ ]:匹配除了[ ]中的任意一个字符
let reg10 = /[^JS]/g //匹配除了J和S之外的任意一个字符
// [ ]里面的-表示范围,如[a-z]表示匹配a到z之间的任意一个字符,常见的有[a-z],[A-Z],[0-9],[a-zA-Z0-9]
let reg11 = /[a-zA-Z0-9]/g //匹配字母和数字
// . 匹配除了换行符之外的任意一个字符
/*
    \d:匹配数字,等价于[0-9]
    \D:匹配非数字,等价于[^0-9]
    \w:匹配字母,数字,下划线,等价于[a-zA-Z0-9_]
    \W:匹配非字母,数字,下划线,等价于[^a-zA-Z0-9_]
    \s:匹配空白字符,包括空格,制表符,换行符等
    \S:匹配非空白字符
*/

// 4.分组元字符
// ():分组,可以将多个字符看作一个整体
let reg12 = /(JS)+/g //匹配JS,JSJS,JSJSJS...
// |:或,匹配|两边的任意一个字符
let reg13 = /JS|HTML/g //匹配JS或HTML
let reg14 = /JS|HTML|CSS/g //匹配JS或HTML或CSS

// 5.修饰符
// 修饰符是对正则表达式进行修饰,可以改变正则表达式的行为,如是否区分大小写,是否多行匹配等
// i:忽略大小写
let reg15 = /JS/gi //匹配JS,js,Js,JS...
// m:多行匹配
let reg16 = /JS$/gm //匹配以JS结尾的行
// g:全局匹配
let reg17 = /JS/g //匹配所有的JS

// 6.位置元字符
// \b:匹配单词边界,单词边界指单词和空格之间的位置
let reg18 = /\bJS\b/g //匹配JS,不匹配JSX,JS1,1JS
// \B:匹配非单词边界
let reg19 = /\BJS\B/g //匹配JSX,JS1,1JS,不匹配JS
