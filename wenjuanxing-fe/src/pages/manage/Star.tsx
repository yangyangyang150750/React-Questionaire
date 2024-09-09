import React, { FC, useState } from "react";
// import QuestionCard from "../components/QuestionCard";
// 引入模块sass
import styles from './common.module.scss'
import QuestionCard from "../../components/QuestionCard";

// 引入三方hook useTitle
// 用于修改标题
import { useRequest, useTitle } from "ahooks";
import Title from "antd/es/typography/Title";
import { Empty, Pagination, Spin } from "antd";
import Search from "antd/es/input/Search";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { ResDataType } from "../../services/ajax";
import { toASCII } from "punycode";
import ListPage from "../../components/ListPage";



const Star:FC=()=>{
    // 修改标题 
    useTitle('小慕问卷-我的问卷')
    // 列表数据
    const {data={},loading,error}=useLoadQuestionListData({isStar:true})
    // 解构data
    const{list:questionList=[],total} = data 
    
    return<>
        {/* 头部 */}
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
            </div>
            <div className={styles.right}>
                <ListSearch></ListSearch>
            </div>
        </div>
        {/* 列表展示区 */}
        <div className={styles.content}>
            {   
                // ->首先判断是否加载完成
                loading?
                // 若未加载完成 显示加载组件
                <div><Spin /></div>:
                // ->加载完成 则判断当前问卷列表数组长度
                questionList.length === 0 ?
                // 若长度为0 显示暂无数据组件
                <Empty description="暂无数据" />:
                // 否则 展示问卷列表组件
                questionList.length>0&&questionList.map((question:any)=>{
                    // 解构id
                    const {_id} = question
                    // 利用对象解构 将question传给QuestionCard
                    return <QuestionCard key={_id} {...question}></QuestionCard>
                })
            }
        </div>
        {/* 尾部 */}
        <div className={styles.footer}>
            {/* 将分页组件抽出 */}
            <ListPage total={total}></ListPage>
        </div>
    </>
}

export default Star