import React,{FC, useState} from "react";
// 引入outlet useNavigate useLocation
import { Outlet ,useNavigate,useLocation} from "react-router-dom";
// 引入icon
import { PlusOutlined,BarsOutlined,StarOutlined,DeleteOutlined } from "@ant-design/icons";
// 引入模块sass
import style from './ManageLayOut.module.scss'
import { Button,Space,Divider, message } from "antd";
// 引入创建问卷方法
import { createQuestionServe } from "../services/question";
import { useRequest } from "ahooks";

const ManageLayOut:FC =()=>{
    // 创建路由器
    const nav =useNavigate()
    // 获取当前地址
    const {pathname} = useLocation()
    // // 设置加载状态
    // let [loading,setLoading] = useState(false)

    // // 创建问卷按钮的回调方法
    // // 存在问题：连续多次点击！！
    // // 解决方法：创建loading 
    // async function createQuestionHandler() {
    //     // 1、设置加载状态
    //     // 标记当前正在加载中
    //     setLoading(true)

    //     // 2、获取问卷数据
    //     // 调用创建问卷方法
    //     const data=await createQuestion()
    //     // 解构数据 获取问卷id
    //     const {id}=data

    //     // 3、页面跳转
    //     // 跳转至编辑问卷页面
    //     nav(`/question/edit/${id}`)
    //     // 提示信息
    //     if (id) {
    //         message.success('创建成功')
    //     }

    //     // 4、设置加载状态
    //     // 表示当前加载完成
    //     setLoading(false)
    //     return
    // }

    // 利用useRequest简化
    const {loading,run:handleCreateClick}=useRequest(createQuestionServe,{
        // ---设置配置对象---
        // 1、手动触发
        manual:true,
        // 2、成功回调
        onSuccess(result:any){
            // 2-1 跳转至编辑问卷页面
            nav(`/question/edit/${result.id || result._id}`)
            // 2-2 成功提示消息
            message.success('创建成功')
        }
    })

    return <div className={style.container}>
        <div className={style.left}>
            <Space direction="vertical" size="small" >
                <Button type="primary" size="large" icon={<PlusOutlined/>} onClick={handleCreateClick} disabled={loading}>
                    创建问卷
                </Button>
                <Divider />
                <Button 
                type={pathname.startsWith('/manage/list')?"default":'text'}
                size="large" 
                icon={<BarsOutlined/>}
                onClick={()=>nav('/manage/list')}>
                    我的问卷
                </Button>
                <Button 
                type={pathname.startsWith('/manage/star')?"default":'text'} 
                size="large" 
                icon={<StarOutlined/>}
                onClick={()=>nav('/manage/star')}>
                    星标问卷
                </Button>
                <Button 
                type={pathname.startsWith('/manage/trash')?"default":'text'} 
                size="large" 
                icon={<DeleteOutlined/>}
                onClick={()=>nav('/manage/trash')}>
                    回收站
                </Button>
            </Space>
            
        </div>
        <div className={style.right}>
            {/* Outlet 类似Vue的插槽 */}
            <Outlet></Outlet>
        </div>
    </div>
}

export default ManageLayOut