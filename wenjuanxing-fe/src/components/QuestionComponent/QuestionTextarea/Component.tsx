import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface'

const { TextArea } = Input
// 解构出Paragraph
const { Paragraph } = Typography
// 定义Textarea组件
const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  // 解构属性
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

// 导出
export default QuestionTextarea
