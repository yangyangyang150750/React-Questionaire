import { useSelector } from "react-redux";
import { StateType } from "../store";
import { UserStateType } from "../store/userReducer";

// 获取用户信息hook
function useGetUserInfo() {
    // 获取仓库内的用户数据 并解构
    const {username,nickname}= useSelector<StateType>(state=>{
        console.dir(state);
        return state.user
    }) as UserStateType
    // 返回获取到的用户信息
    return {username,nickname}
}

export default useGetUserInfo