
// 引入输入框组件
import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'
// 引入属性组件


// 将interface内的全部内容导出
export * from './interface'

// 默认导出
// Input组件的配置
export default {
    title:'多行输入',
    type:'questionTextarea', //要和后端一致
    // 画布显示的组件
    Component,
    // 属性组件
    PropComponent,
    defaultProps:QuestionTextareaDefaultProps
}