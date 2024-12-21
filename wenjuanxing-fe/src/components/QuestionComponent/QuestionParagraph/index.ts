// 导入组件
import Component from './Component'
// 导入默认属性
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

// 导出接口
export * from './interface'

// 导出配置
export default {
  title: '段落',
  type: 'questionParagraph',
  // 导出组件 => 用于画布canvas
  Component,
  // 导出属性组件 => 用于属性区
  PropComponent,
  // 导出默认属性
  defaultProps: QuestionParagraphDefaultProps,
}
