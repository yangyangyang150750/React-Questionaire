
// 统一封装post 和 get请求

import { Bodoni_Moda } from "next/font/google"
import { renderToReadableStream } from "react-dom/server"

// 定义Mock的host
// const HOST = 'http://localhost:3001'

// 定义Nest服务端的host
const HOST = 'http://localhost:3005'

// 定义get请求
export async function get(url:string) {
    // 利用fetch
    const res = await fetch(`${HOST}${url}`)
    // 将结果转换为json格式
    const data = res.json()
    return data
}

// 定义post请求
export async function post(url:string,body:any) {
    // 利用fetch
    const res = await fetch(`${HOST}${url}`,{
        // 指明请求类型
        method:'post',
        // 声明提交的是json格式数据
        headers:{
            'Content-Type':'application/json',
        },
        // 数据转换为json格式
        body:JSON.stringify(body)
    })
    // 将结果转换为json格式
    const data = res.json()
    return data
}