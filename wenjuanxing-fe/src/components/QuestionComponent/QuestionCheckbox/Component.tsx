import { OptionsType, QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './Interface'
import { Checkbox, Space, Typography } from 'antd'
import React, { FC } from 'react'

const { Paragraph } = Typography
const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  // 解构属性
  const { title, list, isVertical } = {
    ...QuestionCheckboxDefaultProps,
    ...props,
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((option: OptionsType) => {
          // 解构
          const { value, text, checked } = option
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
