import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Checkbox from 'antd/es/checkbox/Checkbox'

// 属性组件
const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  // 解构属性
  const { title, isCenter, onChange, disabled } = props

  // 监听text isCenter的变化
  useEffect(() => {
    form.setFieldsValue({ title, isCenter })
  }, [title, isCenter])

  // 获取表单实例
  const [form] = Form.useForm()

  // 表单数据改变时的回调
  function handleChange() {
    // 判断是否有onChange方法
    if (onChange) {
      // 调用onChange方法 传入表单值
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isCenter }}
      onValuesChange={handleChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="段落内容"
        name="title"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
