import React,{FC, useState} from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { Button, Result, Spin } from "antd";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
// 引入模块化sass
import style from './index.module.scss'
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import PieDemo from "./PieDemo";
import ChartStat from "./ChartStat";

const Stat:FC=()=>{

    // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

    // 创建路由器
    const nav = useNavigate()

    // 调用获取问卷数据方法
    const{loading}= useLoadQuestionData()
    
    // 调用获取页面信息方法
    // => 获取页面发布状态
    const {isPublished,title} = useGetPageInfo()

    // 修改标题
    useTitle(`问卷统计 -- ${title}`)

    // loading效果
    const LoadingElement=<div style={{textAlign:'center',marginTop:'100px'}}><Spin></Spin></div>

    // Content Element
    function genContentElement() {
        // 判断当前页面是否已发布
        if (typeof isPublished ==='boolean' &&!isPublished) {
            // 若未发布
            // 显示提示信息
            return <div style={{flex:'1'}}>
                <Result
                status="warning"
                title="该页面尚未发布"
                extra={
                <Button type="primary" onClick={() => nav(-1)}>
                  返回上一页
                </Button>}
                >
                </Result>
            </div>
        }else{
            return <>
                <div className={style.left}>
                    <ComponentList
                      selectedComponentId={selectedComponentId}
                      setSelectedComponentId={setSelectedComponentId}
                      setSelectedComponentType={setSelectedComponentType}
                    />
                </div>
                <div className={style.main}>
                    <PageStat
                      selectedComponentId={selectedComponentId}
                      setSelectedComponentId={setSelectedComponentId}
                      setSelectedComponentType={setSelectedComponentType}
                    ></PageStat>
                </div>
                <div className={style.right}>
                    <ChartStat 
                    selectedComponentId={selectedComponentId}
                    selectedComponentType={selectedComponentType}
                    ></ChartStat>
                </div>
            </>
        }
    }
    return <div className={style.container}>
        <StatHeader /> 
        <div className={style['content-wrapper']}>
            {loading && LoadingElement}
            {!loading && <div className={style.content}>{genContentElement()}</div>}
        </div>
    </div>
}

export default Stat