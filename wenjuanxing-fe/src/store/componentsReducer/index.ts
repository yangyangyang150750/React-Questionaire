// 用于存储组件列表数据

import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
// 引入组件统一属性
import { ComponentPropsType } from '../../components/QuestionComponent'
import { produce } from 'immer'

// 导入lodash的深拷贝方法
import cloneDeep from 'lodash.clonedeep'
import { getNextSelectedId, insertNewComponent } from './utils'
import { arrayMove } from '@dnd-kit/sortable'
// 定义组件信息类型
export type ComponentInfoType = {
  fe_id: string //前端生成的id  服务端mongodb不认 所以自定义id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

// 定义组件列表数据类型
export type ComponentsStateType = {
  // 记录已选组件id
  selectedId: string
  // 组件列表
  componentList: Array<ComponentInfoType>
  // 已复制的组件
  copiedComponent: ComponentInfoType | null
}

// 定义组件列表初始数据
const INIT_STATE: ComponentsStateType = {
  //已选组件id
  selectedId: '',
  componentList: [],
  // 已复制的组件
  copiedComponent: null,
}

// 创建组件列表Slice
export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置组件方法
    resetComponent: (state: ComponentsStateType, actions: PayloadAction<ComponentsStateType>) => {
      return actions.payload
    },
    // 修改selectedID方法
    changeSelectedId: produce((draft: ComponentsStateType, actions: PayloadAction<string>) => {
      // 利用immer的produce
      // 简化更新数据的写法
      // 但是本质还是不可变数据
      draft.selectedId = actions.payload
    }),
    // 添加新组件方法
    addComponent: produce(
      (draft: ComponentsStateType, actions: PayloadAction<ComponentInfoType>) => {
        // 获取
        const newComponent = actions.payload
        insertNewComponent(draft, newComponent)
      }
    ),

    // 修改已有组件属性的方法
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        actions: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        // 解构出当前要修改的组件id 以及 新属性
        const { fe_id, newProps } = actions.payload

        // 找到当前id对应的组件
        const orientComponent = draft.componentList.find(c => c.fe_id === fe_id)

        // 判断是否找到
        if (orientComponent == null) {
          // 如果未找到 则直接返回
          return
        } else {
          // 否则
          // 修改目标组件的属性
          orientComponent.props = {
            ...orientComponent.props,
            ...newProps,
          }
        }
      }
    ),
    // 删除所选组件方法
    removeSelectComponent: produce((draft: ComponentsStateType) => {
      // 获取当前所选组件id 以及 当前组件列表数据
      const { selectedId, componentList } = draft

      // 获取当前所选组件id 对应的索引
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(selectedId, componentList)
      // 更新selectedID
      draft.selectedId = newSelectedId

      // 判断当前索引
      if (index >= 0) {
        // 删除索引所对应组件信息
        draft.componentList.splice(index, 1)
      }
    }),
    // 隐藏/显示已选组件方法
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        actions: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        // 解构
        const { componentList } = draft
        const { fe_id, isHidden } = actions.payload

        // 获取当前已选id 所对应 组件索引
        const index = componentList.findIndex(C => C.fe_id === fe_id)

        // 重新计算selectedId
        // 判断当前是需要隐藏还是显示
        let newSelectedId = ''
        if (isHidden) {
          // 若是隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 若是显示
          newSelectedId = fe_id
        }
        // 更新selectedID
        draft.selectedId = newSelectedId

        // 判断索引
        if (index < 0) {
          return
        } else {
          // 更新当前组件
          componentList[index].isHidden = isHidden
        }
      }
    ),
    // 锁定/解锁已选组件方法
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, actions: PayloadAction<{ fe_id: string }>) => {
        // 解构出当前已选组件id
        const { fe_id } = actions.payload

        // 获取当前id所对应组件
        const comp = draft.componentList.find(c => c.fe_id === fe_id)
        if (comp) {
          // 若找到此组件
          // 切换isLocked状态
          comp.isLocked = !comp.isLocked
        }
      }
    ),
    // 拷贝已选组件方法
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      // 获取当前已选组件id
      const { selectedId } = draft
      // 获取已选组件
      const comp = draft.componentList.find(c => c.fe_id === selectedId)

      // 判断是否存在对应组件
      if (!comp) {
        return
      } else {
        // 将当前已选组件加入到复制组件上
        // 深拷贝
        draft.copiedComponent = cloneDeep(comp)
      }
    }),
    // 粘贴拷贝的组件方法
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      // 解构出当前复制的组件
      const { copiedComponent } = draft

      //
      if (!copiedComponent) {
        // 若当前没有复制组件
        // 直接返回
        return
      } else {
        // 若当前有复制的组件
        // 则需要将此组件添加至问卷数据列表中

        // 1、更新id
        // 保证问卷数据列表内的id值唯一
        copiedComponent.fe_id = nanoid(5)

        // 2、将复制的组件插入至问卷数据列表中
        insertNewComponent(draft, copiedComponent)
      }
    }),
    // 选择已选组件上一组件方法
    selectPreComponent: produce((draft: ComponentsStateType) => {
      // 解构出已选组件id 当前问卷列表数据
      const { componentList, selectedId } = draft

      // 获取当前已选组件id对应的组件索引
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      // 判断是否存在对应索引
      if (selectedIndex < 0) {
        // 此时没有已选组件
        return
      }

      // 判断当前已选组件是否为第一项
      if (selectedIndex === 0) {
        // 当前已选组件为第一项 不能再向上选取
        return
      }

      // 否则
      // 更新当前已选组件id
      draft.selectedId = draft.componentList[selectedIndex - 1].fe_id
    }),
    // 选择已选组件下一组件方法
    selectNextComponent: produce((draft: ComponentsStateType) => {
      // 解构出已选组件id 当前问卷列表数据
      const { componentList, selectedId } = draft

      // 获取当前已选组件id对应的组件索引
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      // 判断是否存在对应索引
      if (selectedIndex < 0) {
        // 此时没有已选组件
        return
      }

      // 判断当前已选组件是否为最后一项
      if (selectedIndex === componentList.length - 1) {
        // 当前已选组件为最后项 不能再向下选取
        return
      }

      // 否则
      // 更新当前已选组件id
      draft.selectedId = draft.componentList[selectedIndex + 1].fe_id
    }),
    // 改变组件标题方法
    changeComponentTitle: produce(
      (draft: ComponentsStateType, actions: PayloadAction<{ fe_id: string; title: string }>) => {
        // 解构
        const { fe_id, title } = actions.payload

        // 获取对应组件配置
        const comp = draft.componentList.find(c => c.fe_id === fe_id)

        // 更新
        if (comp) {
          comp.title = title
        }
      }
    ),
    // 移动组件位置方法
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        actions: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        // 解构
        const { componentList } = draft
        const { oldIndex, newIndex } = actions.payload
        draft.componentList = arrayMove(componentList, oldIndex, newIndex)
      }
    ),
  },
})

// 导出actions
export const {
  moveComponent,
  changeComponentTitle,
  selectNextComponent,
  selectPreComponent,
  pasteCopiedComponent,
  copySelectedComponent,
  toggleComponentLocked,
  changeComponentHidden,
  resetComponent,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectComponent,
} = componentSlice.actions

// 导出reducer
export default componentSlice.reducer
