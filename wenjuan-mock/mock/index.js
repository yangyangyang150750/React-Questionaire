
// 引入
const test = require('./test')
const question = require('./question')
const user=require('./user')
const stat=require('./stat')
const answer = require('./answer')


// 汇总
const mockList=[
    // ES6 解构语法
    // 解构各模块
    ...test,
    ...question,
    ...user,
    ...stat,
    ...answer
 
]

// 导出
module.exports = mockList