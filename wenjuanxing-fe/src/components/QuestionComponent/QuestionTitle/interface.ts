// 定义title组件所需属性  以及 数据类型

// 定义属性数据类型
export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean

  // onChange事件
  onChange?: (props: QuestionTitlePropsType) => void
  // disabled 用于实现属性组件的禁用效果
  disabled?: boolean
}

// 定义title默认属性
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
