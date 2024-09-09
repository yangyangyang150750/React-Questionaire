// 导入koa
const Koa=require('koa')
// 导入router
const Router=require('koa-router')
// 导入MockList
const mockList = require('./mock/index')

// 实例化
const app =new Koa()
const router =new Router()

// 获取结果数据函数
// 模拟真实网络
async function getRes(fn,ctx) {
    // 返回成功的promise
    return new Promise(resolve=>{
        setTimeout(()=>{
            // 1、执行fn函数 即response函数
            // 同时 将ctx传入response函数
            // => 获取结果数据
            const res  =fn(ctx)
            // 2、返回结果数据
            resolve(res)
        },1500)
    })
}

// 注册mock路由
mockList.forEach(item => {
    // 解构
    const {url,method,response}=item
    // 根据method 创建路由
    router[method](url,async ctx =>{
        // 获取返回结果
        // const res=response()
        const res =await getRes(response,ctx)   // 模拟网络请求的加载状态
        // 更新ctx.body
        ctx.body=res
    })
});

// 将路由注册至app
app.use(router.routes())
app.listen(3001)    //端口
