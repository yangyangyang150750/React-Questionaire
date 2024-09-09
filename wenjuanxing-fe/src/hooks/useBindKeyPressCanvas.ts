import { useKeyPress } from "ahooks"
import { useDispatch } from "react-redux"
import { copySelectedComponent, pasteCopiedComponent, removeSelectComponent, selectNextComponent, selectPreComponent } from "../store/componentsReducer"
import { ActionCreators } from "redux-undo"

// 判断当前激活元素是否合法
// 用于配合删除快捷键
function isActiveElementValid() {  
    if (document.activeElement==document.body) {
        return true
    }else if(document.activeElement?.matches('div[role="button"]')){
        return true
    }else{
        return false
    }
}

// 画布内 绑定快捷键方法
function useBindKeyPressCanvas() {
    // 创建分派器
    const dispatch = useDispatch()

    // 删除快捷键
    useKeyPress(['backspace','delete'],()=>{
        // 判断当前激活元素是否为组件
        // 若不是组件 直接返回 不做操作
        if (!isActiveElementValid()) return

        // 调用删除所选组件方法
        dispatch(removeSelectComponent())
    })

    // 复制快捷键
    useKeyPress(['ctrl.c','meta.v'],()=>{
        // 判断当前激活元素是否为组件
        // 若不是组件 直接返回 不做操作
        if (!isActiveElementValid()) return

        // 调用复制所选组件方法
        dispatch(copySelectedComponent())
    })

    // 粘贴快捷键
    useKeyPress(['ctrl.v','meta.v'],()=>{
        // 判断当前激活元素是否为组件
        // 若不是组件 直接返回 不做操作
        if (!isActiveElementValid()) return

        // 调用复制所选组件方法
        dispatch(pasteCopiedComponent())
    })

    // 上移一个
    useKeyPress(['uparrow'],()=>{
        // 判断当前激活元素是否为组件
        // 若不是组件 直接返回 不做操作
        if (!isActiveElementValid()) return

        // 调用获取所选组件上一组件方法
        dispatch(selectPreComponent())
    })

    // 下移一个
    useKeyPress(['downarrow'],()=>{
        // 判断当前激活元素是否为组件
        // 若不是组件 直接返回 不做操作
        if (!isActiveElementValid()) return

        // 调用获取所选组件下一组件方法
        dispatch(selectNextComponent())
    })

    // 撤销
     useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )

    // 重做
    useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
      if (!isActiveElementValid()) return
      dispatch(ActionCreators.redo())
    })
}

export default useBindKeyPressCanvas