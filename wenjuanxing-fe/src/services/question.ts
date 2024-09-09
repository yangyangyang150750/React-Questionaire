import axios from './ajax'
import type {ResDataType} from './ajax'

// 定义数据类型
// 定义查询参数类型
type SearchOption={
    keyword:string
    isStar:boolean,
    isDeleted:boolean,
    page:number,
    pageSize:number,
    // ...
}


// 定义获取单个问卷信息的方法
export async function getQuestionServe(id:string):Promise<ResDataType> {
    // 定义请求地址
    const url =`/api/question/${id}`
    // 获取返回数据
    // 利用axios的get方法
    const data =await(axios.get(url)) as ResDataType

    // 返回data数据
    return data
}

// 定义创建问卷方法
export async function createQuestionServe() :Promise<ResDataType>{
    // 定义请求地址
    const url = '/api/question'
    // 获取返回数据
    // 利用axios的post方法
    const data = await(axios.post(url)) as ResDataType

    // 返回data数据
    return data
}

// ！option:Partial<SearchOption>={}
// 此语句含义为option为SeachOption的部分类型,属性可有可无 初始值为空对象

// 定义查询（获取）问卷列表方法
export async function getQuestionListServe(option:Partial<SearchOption>={}):Promise<ResDataType> {
    // 1、定义请求地址
    const url='/api/question'

    // ***
    // axios.get(url,{params:option})
    // 第二个参数用于传入配置对象
    // params属性值 用于拼接查询参数
    // 若option为{a:1,b:2}
    // => url:/api/question?a=1&b=2
    // ***

    // 2、获取问卷列表数据
    const data = (await axios.get(url,{params:option})) as ResDataType
    
    // 返回data数据
    return data
}

// 更新单个问卷方法
export async function updateQuestionServe(id:string,option:{[key:string]:any}):Promise<ResDataType> {
    // 配置路由url
    const url =`/api/question/${id}`
    // 获取数据
    const data = (await axios.patch(url,option)) as ResDataType

    // 返回数据
    return data
}

// 复制问卷
export async function duplicateQuestionServe(id:string):Promise<ResDataType> {
    // 配置路由
    const url =`/api/question/duplicate/${id}`
    // 获取数据
    const data = await(axios.post(url)) as ResDataType

    return data 
}

// 批量彻底删除方法
export async function deleteQuestionServe(ids:string[]):Promise<ResDataType> {
    // 配置路由
    const url='/api/question'
    // 获取数据
    const data = await(axios.delete(url,{data:{ids}})) as ResDataType

    return data
}
