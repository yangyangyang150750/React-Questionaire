import { get } from "./ajax"


// 定义根据id获取问卷信息方法
export async function getQuestionById(id:string) {
    // 定义路由
    const url =`/api/question/${id}`
    // 调用封装的get请求 获取问卷数据
    const data = await get(url)
    return data 
}