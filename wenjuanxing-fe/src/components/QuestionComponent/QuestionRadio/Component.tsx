import React, { FC } from 'react'

import { QuestionRadioPropsDefaultValue, QuestionRadioPropsType } from './interface'
import { Radio, Space, Typography } from 'antd'

const { Paragraph } = Typography
const QuestionRadioComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  // 解构属性
  const {
    title,
    isVertical,
    value: v,
    options = [],
  } = { ...QuestionRadioPropsDefaultValue, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={v}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(option => {
            // 解构option
            const { text, value } = option
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadioComponent
