import React, { FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'
import { Typography } from 'antd'

const { Paragraph, Title } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (Props: QuestionParagraphPropsType) => {
  // 解构属性
  const { title = '', isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...Props,
  }
  console.log(title)

  // 处理title文本
  const titleArray = title.split('\n')

  return (
    <>
      <Paragraph
        style={{
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: '0px',
        }}
      >
        {titleArray.map((title, index) => {
          return (
            <span key={index}>
              {title}
              <br />
            </span>
          )
        })}
      </Paragraph>
    </>
  )
}

export default QuestionParagraph
