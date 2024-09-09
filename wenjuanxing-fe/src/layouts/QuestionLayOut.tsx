import React,{FC} from "react";
// 引入outlet
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import { Spin } from "antd";
import useNavPage from "../hooks/useNavPage";

const QuestionLayOut:FC =()=>{
    // 调用获取用户数据方法
    // 获取当前加载状态
    const waitingUserData=useLoadUserData()
    
    // 添加路由守卫
    useNavPage(waitingUserData)
    return <>
        <div >
            {/* Outlet 类似Vue的插槽 */}
            {waitingUserData?<div style={{textAlign:'center',marginTop:'200px'}}><Spin></Spin></div>:<Outlet></Outlet>}
        </div>
    </>
}

export default QuestionLayOut