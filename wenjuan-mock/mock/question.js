
// 导入mockjs
const Mock =require('mockjs')
const getQuestionList = require('./data/getQuestionList')
// 导入获取问卷列表数据方法
const getComponentList = require('./data/getComponentList')

// 利用random
const Random =Mock.Random

module.exports=[
    // 模拟接口
    {
        // 获取单个问卷信息
        url: '/api/question/:id',
        method: 'get',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                    title: Random.ctitle(),
                    desc:'',
                    js:'',
                    css:'',
                    isPublished:true,
                    isDeleted:false,
                    // 定义组件相关信息
                    componentList:getComponentList()
                }
            }
        }
    },
    // 创建问卷
    {
        url: '/api/question',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id()
                }
            }
        }
    },
    // 获取（查询）问卷列表
    {
        url:'/api/question',
        method:'get',
        response(ctx){
            // 解构上下文ctx,查询参数query
            const {url='',query={}}=ctx
            // 判断是否有isDeleted参数
            const isDeleted=url.indexOf('isDeleted=true')>=0
            // 判断是否有isStar参数
            const isStar=url.indexOf('isStar=true')>=0
            // 取出pageSize
            const pageSize = parseInt(query.pageSize)||10 
            return {
                errno:0,
                data:{
                    list:getQuestionList({len:pageSize,isDeleted:isDeleted,isStar:isStar,pageSize:pageSize,}),// 当前页
                    total:100,// 总数
                }
            }
        }
    },
    // 更新问卷
    {
        url:'/api/question/:id',
        method:'patch',
        response(){
            return {
                errno:0
            }
        }
    },
     // 复制问卷
    {
        url:'/api/question/duplicate/:id',
        method:'post',
        response(){
            return {
                errno:0,
                data:{
                    id:Random.id()
                }
            }
        }
    },
    // 批量彻底删除
    {
        url:'/api/question',
        method:'delete',
        response(){
            return {
                errno:0
            }
        }
    }
]