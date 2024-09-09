import React, { FC, useState } from "react";
// import QuestionCard from "../components/QuestionCard";
// 引入模块sass
import style from './common.module.scss'
import QuestionCard from "../../components/QuestionCard";
// 引入三方hook useSearchParams
// 用于解析url参数
import { useSearchParams } from "react-router-dom";
// 引入三方hook useTitle
// 用于修改标题
import { useRequest, useTitle } from "ahooks";
import Title from "antd/es/typography/Title";
import { Button, Empty, message, Space, Spin, Table, Tag } from "antd";
import {Modal} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { TRUE } from "sass";
import { listenerCount } from "process";
import ListPage from "../../components/ListPage";
import { deleteQuestionServe, updateQuestionServe } from "../../services/question";

// 解构modal
const { confirm } = Modal


// 定义表格列
const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
]

  

const Trash:FC=()=>{
    useTitle('小慕问卷 - 回收站')
    // 记录选中的 id
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    // 获取问卷数据
    const{data={},loading,error,refresh}=useLoadQuestionListData({isDeleted:true})
    // 解构data
    const {list:questionList=[],total}= data
    
    // 恢复按钮回调
    const {loading:recoverLoading,run:recover}=useRequest(async()=>{
      // 遍历数组 执行异步操作
      for await(const id of selectedIds){
        // 发送请求
        await updateQuestionServe(id,{isDeleted:false})
      }
    },{
      manual:true,
      // 防抖
      debounceWait:500,
      // 恢复成功的回调
      onSuccess(){
        // 手动刷新
        refresh()
        // 重置已选问卷
        setSelectedIds([])
        // 成功提示消息
        message.success('恢复成功')
      }
    })

    // 彻底删除按钮的回调
    const {loading:deleteLoading,run:deletePure}= useRequest(async()=>{
      // 发送请求
      const data = await deleteQuestionServe(selectedIds)
      return data
    },{
      manual:true,
      // 防抖
      debounceWait:500,
      onSuccess(){
        // 手动刷新
        refresh()
        // 提示信息
        message.success('彻底删除成功！')
        // 重置已选问卷
        setSelectedIds([])
      }
    })
    function del() {
        confirm({
          title: '确认彻底删除该问卷？',
          icon: <ExclamationCircleOutlined />,
          content: '删除以后不可以找回',
          onOk: deletePure,
        })
    }
    // 可以把 JSX 片段定义为一个变量
    const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={questionList}
          columns={tableColumns}
          pagination={false}
          rowKey={q => q._id}
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              setSelectedIds(selectedRowKeys as string[])
            },
          }}
          />
        </div>
      </>
    )
    return<>
        {/* 头部 */}
        <div  className={style.header}>
            <div className={style.left}>
                <Title level={3}>回收站</Title>
            </div>
            <div className={style.right}>
              <ListSearch></ListSearch>
            </div>
        </div>
        {/* 列表展示区 */}
        <div className={style.content}>
            {/* // ->首先判断是否加载完成
                loading?
                // 若未加载完成 显示加载组件 */}
            {loading&&<div><Spin /></div>}
            {!loading&&questionList.length === 0 && <Empty description="暂无数据" />}
            {questionList.length > 0 && TableElem}
        </div>
        {/* 尾部 */}
        <div className={style.footer}>
            {/* 将分页组件抽出 */}
            <ListPage total={total}></ListPage>
        </div>
    </>
}

export default Trash