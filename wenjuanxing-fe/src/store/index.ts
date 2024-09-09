// 引入仓库配置
import { configureStore } from "@reduxjs/toolkit";
import  userReducer, { UserStateType }  from "./userReducer";
import componentsReducer, {  ComponentsStateType } from "./componentsReducer";
import PageInfoReducer,{ PageInfoType } from "./pageInfoReducer";

// 从redux-undo中引入方法
import undoable,{excludeAction,StateWithHistory} from "redux-undo";

// 定义数据信息
export type StateType={
    user:UserStateType
    // 增加undo之前
    // components:ComponentsStateType
    // 增加undo之后
    components:StateWithHistory<ComponentsStateType>
    pageInfo:PageInfoType
}

// 配置仓库 并导出
export default configureStore({
    // 配置reducer
    reducer:{
        user:userReducer ,
        // 模块化
        // 后续可扩展，
        // 如问卷信息

        // 组件列表(复杂 undo/redo)

        // 没有添加undo之前
        // components:componentsReducer,

        // 添加undo之后
        components:undoable(componentsReducer,{
            // 限制undo的步数
            limit:20,
            // 过滤
            filter:excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ])
        }),

        // 页面信息
        pageInfo:PageInfoReducer
    }
})