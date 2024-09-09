import React, { FC, useEffect, useMemo, useRef, useState,} from "react";
// import QuestionCard from "../components/QuestionCard";
// 引入模块sass
import style from './common.module.scss'
import QuestionCard from "../../components/QuestionCard";
// 引入三方hook useSearchParams
// 引入三方hook useTitle
// 用于修改标题
import { useDebounce, useDebounceFn, useRequest, useTitle } from "ahooks";
import Title from "antd/es/typography/Title";
import ListSearch from "../../components/ListSearch";
import { Empty, Spin } from "antd";
import { useSearchParams } from "react-router-dom";
import { getQuestionListServe } from "../../services/question";
import { LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from "../../constant";


// // 定义数据
// const rawQuestionList=[
//     // 为了和mongodb数据库统一 id改为_id
//   {_id:'q1',title:"问卷1",isPublished:false,isStart:false,answerCount:5,createdAt:'3月10日 13:42'},
//   {_id:'q2',title:"问卷2",isPublished:true,isStart:true,answerCount:3,createdAt:'3月10日 13:42'},
//   {_id:'q3',title:"问卷3",isPublished:false,isStart:false,answerCount:7,createdAt:'3月1日 13:42'},
//   {_id:'q4',title:"问卷4",isPublished:false,isStart:false,answerCount:9,createdAt:'3月14日 13:42'},
// ]


const List:FC =()=>{
    // 解析url参数
    // const [searchParams] = useSearchParams()
    // console.log('keyword:',searchParams.get('keyword'));

    // 修改标题 
    useTitle('小慕问卷-我的问卷')
    
    // // 列表数据
    // const [questionList,setQuestionList]= useState(rawQuestionList)


    // 组件加载时 获取问卷列表数据
    // 保存问卷列表数据、总和数据
    // const [list,setList]=useState([])
    // const [total,setTotal]=useState(0)
    // useEffect(()=>{
    //     // useEffect 内部不可以直接写异步函数
    //     // 所以需要包裹
    //     async function loadQuestionList() {
    //         // 调用请求问卷列表数据方法
    //         const data=await getQuestionListServe()
    //         // 解构数据
    //         const {list,total}=data
    //         // 保存数据
    //         setList(list)
    //         setTotal(total)
    //     }
    //     loadQuestionList()
    // },[])

    // 利用useRequest简化获取问卷列表数据操作
    // const{data={},loading,error}=useRequest(getQuestionListServe())

    // 获取问卷列表数据操作
    // 更简便的方式：
    // 封装为自定义hook
    // const{data={},loading,error}=useLoadQuestionListData()
     // 解构data
    // const {list=[],total} =data

    // ---------------------------
    // 由于本模块数据加载采用上滑加载更多的形式
    // url路径不可变 => 无法使用useLoadQuestionListData()
    // 为此 需要重新定义数据

    // 
    // 标记是否开始加载 
    // 用于实现防抖
    const [started,setStarted] = useState(false)
    // list内部数据 不在url中体现
    const [page,setPage]=useState(1)
    // 当前已经加载的列表数据 上滑加载更多 是个累计值
    const [List,setList]=useState([])
    // 全部数据总数
    const [total,setTotal]=useState(0)
    // 判断当前是否还有需要加载的数据
    const haveMoreData = total>List.length

    // 当前url没有page pageSize参数 但是有keyword
    const [searchParams]= useSearchParams()
    // 保存keyword
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY)||''

    // 实现搜索逻辑
    // 当搜索关键字时 需要清空数据 从而实现重新加载
    useEffect(()=>{
        // 清空数据
        setPage(1)
        setList([])
        setTotal(0)
        // 重设状态
        setStarted(false)
    },[keyword])

    // 触发加载
    // function tryLoadMore() {
    //      console.log('try load more....');
    // }

    // 真正执行触发加载的函数
    const {loading,run:load}=useRequest(async()=>{
        // 因为useRequest内部不能直接放异步函数 需要进行包裹
        const data=await getQuestionListServe({
            // 传入参数
            keyword,
            page,
            pageSize:LIST_PAGE_SIZE,
        })

        // 返回数据
        return data
    },{
        // 手动执行
        manual:true,
        // 执行成功的回调
        onSuccess(result){
            // result为执行成功的结果

            // 解构result 
            // 获取问卷列表数据 以及 问卷总数
            const {list:newList=[],total}=result

            // 更新
            // 更新问卷列表 拼接
            setList(List.concat(newList))
            // 更新当前已加载问卷总数
            setTotal(total)
            // 更新当前页码
            setPage(page+1)
        }
    })


    // 尝试触发加载 --防抖
    const containerRef = useRef<HTMLDivElement>(null)
    const{run:tryLoadMore}=useDebounceFn(()=>{
        // 获取dom元素
        const elem = containerRef.current
        if (elem==null) return

        // 利用getBoundingClientRect 获取元素位置信息
        const domRef=elem.getBoundingClientRect()
        if (domRef==null) return 

        // 解构domref  获取当前元素距离视口的距离
        const {bottom}=domRef

        // 一旦 当前元素距离视口顶部的距离 < 视口高度时
        // 即 当前元素露出 
        // => 触发加载
        if (bottom<=document.body.clientHeight) {
            // 手动触发加载
            load()

            // 更新加载标记
            // 标记为正在加载中
            setStarted(true)
        }

    },{
        wait:1000
    })

    // 触发加载的情形
    // 1、当页面首次加载或者查询参数keyword发生改变时 需要触发加载
    useEffect(()=>{
        tryLoadMore() //加载第一页 初始化
    },[searchParams])

    // 2、当页面滚动时 触发加载
    useEffect(()=>{
        // 判断是否还有需要加载的数据
        if (haveMoreData) {
            // 若还有需要加载的数据
            // 绑定页面滚动事件
            window.addEventListener('scroll',tryLoadMore)
        }

        return ()=>{
            // ！！！ 自行绑定的事件 销毁时 需要自行解绑
            window.removeEventListener('scroll',tryLoadMore)
        }
    },[searchParams,haveMoreData])
    
    // 处理加载更多数据 的方法
    // 优化 利用useMemo进行缓存
    const LoadMoreData=useMemo(()=>{
        // 判断是否正在加载中 或 还未开始加载
        if (!started||loading) {
            // 若正在加载 返回spin组件
            return <Spin></Spin>
        }

        // 判断是否有问卷列表数据
        if (total===0) {
            return <Empty description='暂无数据'></Empty>
        }

        // 判断是否还有要加载的数据
        if (!haveMoreData) {
            // 若没有
            return <span>没有更多了...</span>
        }

        return <span>
            开始加载下一页
        </span>
    },[started,loading,haveMoreData])

    return <>
        {/* 头部 */}
        <div className={style.header}>
            <div className={style.left}>
                <Title level={3}>我的问卷</Title>
            </div>
            <div className={style.right}>
                <ListSearch></ListSearch>
            </div>
        </div>
        {/* 列表展示区 */}
        <div className={style.content}>
            {/* 遍历数据 */}
            {List.length>0&&List.map((question:any)=>{
                    // 解构id
                    const {_id} = question
                    // 利用对象解构 将question传给QuestionCard
                    return <QuestionCard key={_id} {...question}></QuestionCard>
                })
            }
        </div>
        {/* 尾部 */}
        <div className={style.footer}>
            <div ref={containerRef}>
                {/* 抽离为函数 */}
                {LoadMoreData}
            </div>
        </div>
    </>
}

export default List