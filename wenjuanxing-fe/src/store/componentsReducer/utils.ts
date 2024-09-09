import { ComponentInfoType, ComponentsStateType } from "."

/**
 * 获取下一个 selectedId
 * @param fe_id 当前的 id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度 > 1
    if (index + 1 === length) {
      // 要删除最后一个，就要选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 要删除的不是最后一个，删除以后，选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}

/**
 * 插入新组件
 */

export function insertNewComponent(draft:ComponentsStateType,newComponent:ComponentInfoType) {
  // 获取当前已选中组件id
  const {selectedId} = draft
  // 获取已选中组件id对应的下标索引
  const index = draft.componentList.findIndex(c=>c.fe_id===selectedId)
  // 判断下标索引情况
  if (index <0) { 
      // 若未找到对应下标
      // 即当前没有已选中组件
      // => 新组件加至数组末尾
      draft.componentList.push(newComponent)
      // 更新已选组件id
      draft.selectedId=draft.componentList[draft.componentList.length-1].fe_id
  }else{
      // 若找到对应下标
      // => 新组件加至当前下标之后
      draft.componentList.splice(index+1,0,newComponent)
      // 更新已选组件id
      draft.selectedId=draft.componentList[index+1].fe_id
  }

}