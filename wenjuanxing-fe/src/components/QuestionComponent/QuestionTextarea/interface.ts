// 定义input组件所需属性  以及 数据类型

// 定义属性数据类型
export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string

  // onChange事件
  onChange?: (props: QuestionTextareaPropsType) => void
  // disabled 用于实现属性组件的禁用效果
  disabled?: boolean
}

// 定义title默认属性
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行输入',
  placeholder: '请输入',
}
