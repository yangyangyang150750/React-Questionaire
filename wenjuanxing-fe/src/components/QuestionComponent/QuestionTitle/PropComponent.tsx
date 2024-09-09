import React, { FC, useEffect } from "react";
import { QuestionTitlePropsType } from "./interface";
import { Checkbox, Form, Input, Select } from "antd";


const PropsComponent:FC<QuestionTitlePropsType>=(props:QuestionTitlePropsType)=>{
    // 解构属性
    const {text,level,isCenter,onChange,disabled}=props

    // 获取表单
    const [form] = Form.useForm()

    // 监听属性变化
    useEffect(()=>{
        // 更新表单值
        form.setFieldsValue({text,level,isCenter})
    },[text,level,isCenter])

    // 表单值发生改变时的回调
    function handleValueChange() {
        if (onChange) {
            // 调用父组件传入的onChange方法
            // 统一交给父级去处理
            onChange(form.getFieldsValue())
        }
    }
    return <Form layout="vertical" initialValues={{text,level,isCenter}} form={form} onValuesChange={handleValueChange} disabled={disabled}>
        <Form.Item label='标题内容' name='text' rules={[{required:true,message:'请输入标题内容'}]} >
            <Input></Input>
        </Form.Item>
        <Form.Item label='层级' name='level'>
            <Select options={[
                {value:1,text:1},
                {value:2,text:2},
                {value:3,text:3},
            ]}></Select>
        </Form.Item>
        <Form.Item  name='isCenter' valuePropName="checked">
            {/* 设置cheked为复选框的values属性 */}
            <Checkbox>居中显示</Checkbox>
        </Form.Item>
    </Form>
}

export default PropsComponent