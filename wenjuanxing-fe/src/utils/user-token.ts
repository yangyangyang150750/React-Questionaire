// 保存或获取token

// 定义常量key
const KEY='USER_TOKEN'

// 保存token
export function setToken(token:string){
    return localStorage.setItem(KEY,token)
}

// 取出token
export function getToken(){
    return localStorage.getItem(KEY)
}

// 清除token
export function removeToken(){
    return localStorage.removeItem(KEY)
}