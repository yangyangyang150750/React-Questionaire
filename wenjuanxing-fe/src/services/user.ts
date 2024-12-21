import axios from './ajax'
import type { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoServe(): Promise<ResDataType> {
  // 配置路由
  const url = '/api/user/info'
  // 发送请求
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 注册用户
export async function registerServe(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  // 配置路由
  const url = '/api/user/register'
  // 保存参数
  const body = { username, password, nickname: nickname || username }
  // 发送请求
  const data = (await axios.post(url, body)) as ResDataType
  return data
}

// 登录
export async function loginServe(username: string, password: string) {
  // 配置路由
  const url = '/api/user/login'
  // 保存参数
  const body = { username, password }
  // 发送请求
  const data = (await axios.post(url, body)) as ResDataType
  return data
}
