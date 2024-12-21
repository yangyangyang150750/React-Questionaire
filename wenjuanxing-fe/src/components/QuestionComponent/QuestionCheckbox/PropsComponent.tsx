import React, { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'
import { OptionsType, QuestionCheckboxPropsType } from './Interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  // 解构属性
  const { title, isVertical, list = [], onChange, disabled } = props

  // 获取表单实例
  const [form] = Form.useForm()

  // 监听属性变化
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])
  // 表单内容改变时的回调
  function handleChange() {
    if (!onChange) {
      return
    }
    // 获取当前表单内容

    // 由于新增选项没有value值
    // => 需要遍历list数组 补充value值

    // 解构出list
    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
    const { list = [] } = newValues
    // 遍历options
    list.forEach((option: OptionsType) => {
      // 判断是否有value值
      if (!option.value) {
        // 若没有 则赋值
        option.value = nanoid(5)
      } else {
        // 若有 则不做任何操作
        return
      }
    })

    // 调用onChange方法
    // 更新redux store内 组件数据
    onChange(newValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      form={form}
      onValuesChange={handleChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项 (可删除) */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项是否选中 */}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字...' },
                        {
                          // 验证器
                          validator: (_, text) => {
                            // 获取当前表单值 解构出options
                            const { list = [] } = form.getFieldsValue()

                            //记录options各对象中与当前text重复的个数
                            let num = 0
                            // 循环options 找出与当前text重复的个数
                            list.forEach((option: OptionsType) => {
                              if (option.text === text) {
                                num++
                              }
                            })
                            // 判断num的取值情况
                            if (num > 1) {
                              // 若大于一
                              // 说明有重复
                              return Promise.reject(new Error('当前选项重复！！！'))
                            } else {
                              // 否则 未重复
                              return Promise.resolve()
                            }
                          },
                        },
                      ]}
                    >
                      <Input placeholder="输入选项文字..."></Input>
                    </Form.Item>

                    {/* 当前选项 删除按钮 */}
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)}></MinusCircleOutlined>
                    )}
                  </Space>
                )
              })}
              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', text: '' })}
                  icon={<PlusCircleOutlined></PlusCircleOutlined>}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
