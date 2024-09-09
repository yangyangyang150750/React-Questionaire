import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoServe } from "../services/user";
import { loginReducer } from "../store/userReducer";
import { useDispatch } from "react-redux";


// 获取用户数据方法 (利用ajax)
function useLoadUserData() {
    // 定义分派器
    const dispatch = useDispatch()
    
    // 定义加载状态
    const [waitingUserData,setWaitingUserData] = useState(true)

    // 发送请求
    const {run}=useRequest(getUserInfoServe,{
        // 手动执行
        manual:true,
        // 成功回调
        onSuccess(result){
            // 解构
            const {username,nickname}= result
            // 存于仓库中
            dispatch(loginReducer({username,nickname}))
        },
        // 收尾回调
        onFinally(){
            // 修改加载状态
            setWaitingUserData(false)
        }
    })


    // 从仓库中获取当前用户名
    // 看当前是否已经加载完用户数据
    const{username} = useGetUserInfo()

    // 监听username数据
    useEffect(()=>{
        if (username) {
            // 若username有值
            // 表明用户数据已经加载完成
            // 此时需要更新加载状态
            setWaitingUserData(false)
            return 
        }
        // 若username没有值
        // 则发送请求 获取用户数据
        run()
    },[username])


    // 返回值为当前加载状态
    return waitingUserData
}

export default useLoadUserData