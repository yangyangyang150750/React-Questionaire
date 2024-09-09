import { createSlice, PayloadAction } from "@reduxjs/toolkit"


// 1、定义数据类型
export type UserStateType={
    username:string,
    nickname:string
}

// 2、定义初始数据
const INIT_STATE:UserStateType ={
    username:'',
    nickname:''
}

// 3、创建slice
export const userSlice=createSlice({
    // 名称
    name:'user',
    // 初始数据
    initialState:INIT_STATE,
    // 方法
    reducers:{
        // 登录
        loginReducer:(state:UserStateType,actions:PayloadAction<UserStateType>)=>{
            // 返回新的用户信息数据
            console.log(actions.payload);
            return actions.payload
        },
        // 退出
        logoutReducer:()=>{
            // 初始化用户信息
            return INIT_STATE
        }
    }
})

// 导出actions
export const {loginReducer,logoutReducer}=userSlice.actions

// 导出reducer
export default userSlice.reducer
