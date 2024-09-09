import { useRequest } from "ahooks"
import {useSearchParams } from "react-router-dom"
import { getQuestionListServe } from "../services/question"
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from "../constant"

// 定义参数类型
type OptionType={
    isStar:boolean,
    isDeleted:boolean,
}
function useLoadQuestionListData(option:Partial<OptionType>={}) {

    // 解构option配置对象
    const {isStar,isDeleted}=option

    // 1、获取url查询参数
    const [searchParams]=useSearchParams()

    // 2、调用获取问卷列表数据方法
    const{data,loading,error,refresh}=useRequest(async ()=> {
        // 为了获取问卷列表数据时，传入查询参数 ==> 用于实现问卷搜索功能
        // 定义异步组件进行包裹

        // 2-1 提取查询参数
        // 获取keyword
        const keyword=searchParams.get(LIST_SEARCH_PARAM_KEY)||''
        // 获取page
        const page =parseInt(searchParams.get(LIST_PAGE_PARAM_KEY)||'')||1
        // 获取pageSize
        const pageSize =parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)||'')||15

        // 2-2 获取问卷列表数据
        const data=await getQuestionListServe({
            // 传入参数
            keyword,
            isStar,
            isDeleted,
            page,
            pageSize
        })

        // 2-3 返回数据
        return data // {list,total}
    },{
        // 传入配置对象

        // 1、定义依赖项
        // 当searchParams改变时 异步函数重新执行
        refreshDeps:[searchParams] 
    })
    

    // 3、返回
    return {data,loading,error,refresh}
}

export default useLoadQuestionListData