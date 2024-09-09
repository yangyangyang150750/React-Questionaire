// 引入Mock
const Mock = require('mockjs')

// 导出random
const Random = Mock.Random

module.exports=[
    {
        // 获取用户信息
        url:'/api/user/info',
        method:'get',
        response(){
            return {
                errno:0,
                data:{
                    username:Random.title(),
                    nickname:Random.cname()
                }
            }
        }
    },
    {
        // 注册
        url:'/api/user/register',
        method:'post',
        response(){
            return {
                errno:0
            }
        }
    },
    {
        // 登录
        url:'/api/user/login',
        method:'post',
        response(){
            return {
                errno:0,
                data:{
                    token:Random.word(20)
                }
            }
        }
    }
]