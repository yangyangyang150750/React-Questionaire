import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { createExportDefault, createNoSubstitutionTemplateLiteral } from 'typescript'

// 定义pageInfo的数据类型
export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

// 定义pageInfo数据初始值
const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

// 创建slice
const pageInfoSlice = createSlice({
  // 模块名
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    // 重置pageInfo方法
    resetPageInfo: (state: PageInfoType, actions: PayloadAction<PageInfoType>) => {
      return actions.payload
    },
    // 修改pageInfo的title方法
    changePageTitle: produce(
      (draft: PageInfoType, actions: PayloadAction<{ newTitle: string }>) => {
        draft.title = actions.payload.newTitle
      }
    ),
  },
})

// 导出方法
export const { changePageTitle, resetPageInfo } = pageInfoSlice.actions

// 导出reducers
export default pageInfoSlice.reducer
