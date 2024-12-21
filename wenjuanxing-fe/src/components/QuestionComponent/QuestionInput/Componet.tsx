import React, { FC } from 'react'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'
import { Input, Typography } from 'antd'

// 解构出Paragraph
const { Paragraph } = Typography
// 定义Input组件
const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  // 解构属性
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

// 导出
export default QuestionInput
