import { post } from "./ajax"

// 定义提交答卷信息的方法
export async function postAnswer(answerInfo:any) {
    // 定义url参数
    const url='/api/answer'
    // 调用封装的post方法 发送请求
    const data = await post(url,answerInfo)
    return data
}