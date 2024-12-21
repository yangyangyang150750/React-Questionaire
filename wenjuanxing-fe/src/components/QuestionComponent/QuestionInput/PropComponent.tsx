import React, { FC, useEffect } from 'react'
import { QuestionInputPropsType } from './interface'
import { Form, Input } from 'antd'

const PropsComponent: FC = (props: QuestionInputPropsType) => {
  // 解构属性
  const { title, placeholder, onChange, disabled } = props

  // 获取表单
  const [form] = Form.useForm()

  // 监听属性变化
  useEffect(() => {
    // 更新表单值
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  // 组件表单内容改变时的回调
  function handleValuesChange() {
    if (onChange) {
      // 统一交给父级处理
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input></Input>
      </Form.Item>
    </Form>
  )
}

export default PropsComponent
