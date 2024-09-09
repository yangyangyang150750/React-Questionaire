import { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import TextArea from "antd/es/input/TextArea";


const QuestionInfoPropsComponent:FC<QuestionInfoPropsType>=(props:QuestionInfoPropsType)=>{
    // 解构属性
    const {title,desc,onChange,disabled} = props

    // 获取表单实例
    const [form] = Form.useForm()

    // 表单内容改变时的回调方法
    function handleChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    // 监听title 和 desc的改变
    useEffect(()=>{
        // 一旦改变
        // 更新form表单值
        form.setFieldsValue({title,desc})
    },[title,desc,form])

    return <Form
    layout="vertical"
    initialValues={{title,desc}}
    disabled={disabled}
    onValuesChange={handleChange}
    form={form}
    >
        <Form.Item label='问卷标题' name='title' rules={[{required:true,message:'请输入问卷标题'}]}>
            <Input></Input>
        </Form.Item>
        <Form.Item label='问卷描述' name='desc' >
            <TextArea></TextArea>
        </Form.Item>
    </Form>
}

export default QuestionInfoPropsComponent