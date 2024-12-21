import React, { FC } from 'react'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'
import { Typography } from 'antd'
// 引入默认属性 以及 属性类型

// 解构出Title组件
const { Title } = Typography
// 定义Title组件
const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  // 解构属性
  const {
    text = '一行标题',
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props }

  // 根据level 获取对应字体大小
  function genFontSize(level: number) {
    if (level === 1) {
      return '24px'
    } else if (level === 2) {
      return '20px'
    } else if (level === 3) {
      return '16px'
    } else {
      return '16px    '
    }
  }
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  )
}

// 导出
export default QuestionTitle
