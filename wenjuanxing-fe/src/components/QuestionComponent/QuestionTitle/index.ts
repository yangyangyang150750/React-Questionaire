// 导入输入框组件
import Component from './Componet'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

// 将interface内的全部内容导出
export * from './interface'

// 默认导出
// Title组件的配置
export default {
  title: '标题',
  // type很重要！！
  type: 'questionTitle', //要和后端一致
  // 画布显示的组件
  Component,
  // 属性组件
  PropComponent,
  // 默认属性
  defaultProps: QuestionTitleDefaultProps,
}
