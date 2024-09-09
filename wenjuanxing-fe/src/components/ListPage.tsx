import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from "../constant";

// 定义属性参数类型
type PropsType ={
    total:number
}
function ListPage(props:PropsType) {
    // 解构总问卷数
    const {total}=props

    // 记录当前页码数
    // 默认为1
    const [currentPage,setCurrentPage]=useState(1)

    // 记录每页展示条目数
    const [pageSize,setPageSize] = useState(LIST_PAGE_SIZE)

    // 获取当前url地址
    const{pathname} =useLocation()
    // 获取查询参数
    const[searchParams] =useSearchParams()
    // 创建路由器
    const nav = useNavigate()

    // ---从url中获取page 和 pageSize  同时传入Pagination中
    useEffect(()=>{
        // 获取page pageSize
        const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY)||'')||1
        const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)||'')||15
        
        // 更新page pageSize
        setCurrentPage(page)
        setPageSize(pageSize)
    },[])

    // 分页器点击指定页码、指定pageSize时的回调函数
    function handlePageChange(page:number,pageSize:number) {
        // 1、更新page,pageSize
        setCurrentPage(page);
        setPageSize(pageSize)

        // 2、 更新查询参数
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())

        // 3、更新url地址 传递参数
        nav({
            // 跳转的路径
            pathname,
            // 携带的参数
            search:searchParams.toString()
        })
    }
    

    return <>
        <Pagination 
        current={currentPage} 
        onChange={handlePageChange} 
        total={total} 
        pageSize={pageSize}
        align={"center"}/>
    </>
}

export default ListPage