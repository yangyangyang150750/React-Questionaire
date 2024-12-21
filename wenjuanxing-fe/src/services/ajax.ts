// 引入axios

import { message } from 'antd'
import axios from 'axios'
import { getToken } from '../utils/user-token'

// 创建axios实例
const instance = axios.create({
  // 设置url
  baseURL: 'http://localhost:3005/',
  // 设置时延
  timeout: 10 * 1000,
  // 设置请求头
  headers: {},
})

// 定义请求拦截器
// 对于请求request 统一进行处理
instance.interceptors.request.use(
  config => {
    // 设置请求头
    // JWT固定格式
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

// 定义响应拦截器
// 对于响应的response数据 进行统一拦截处理
instance.interceptors.response.use(res => {
  // response的数据格式：
  // response -- `{ errno: 0 ,data: {...} }

  // 取出response中的data数据
  const resData = (res.data || {}) as ResType
  // 解构resData
  const { errno, data, msg } = resData

  // 判断errno
  if (errno !== 0) {
    // 若不为0 表示出错了
    if (msg) {
      // 显示错误信息
      message.error(msg)
    }
    // 抛出错误
    throw new Error(msg)
  }

  // 返回真正需要的data数据
  return data as any
})

// 定义返回数据类型
export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}
// 定义data数据类型
export type ResDataType = {
  [key: string]: any
}
// 导出实例
export default instance
