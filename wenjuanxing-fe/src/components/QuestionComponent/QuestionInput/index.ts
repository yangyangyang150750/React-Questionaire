
// 引入输入框组件
import Component from './Componet'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'
// 引入属性组件


// 将interface内的全部内容导出
export * from './interface'

// 默认导出
// Input组件的配置
export default {
    title:'输入框',
    type:'questionInput', //要和后端一致
    // 画布显示的组件
    Component,
    // 属性组件
    PropComponent,
    defaultProps:QuestionInputDefaultProps
}