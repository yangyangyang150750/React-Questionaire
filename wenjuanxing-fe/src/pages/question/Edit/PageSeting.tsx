import { FC } from "react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../store/pageInfoReducer";


const PageSetting:FC=()=>{
    // 从redux store中获取页面信息
    const pageInfo = useGetPageInfo()

    // 获取表单实例
    const [form] = Form.useForm()

    // 创建分派器
    const dispatch = useDispatch()

    // 表单值改变时的回调
    function hanleValuesChange() {
        dispatch(resetPageInfo(form.getFieldsValue()))
    }

    return <Form
    layout="vertical"
    initialValues={pageInfo}
    onValuesChange={hanleValuesChange}
    form={form}
    >
        <Form.Item 
        label='问卷标题' 
        name='title'
        rules={[{required:true,message:'请输入问卷标题'}]}>
            <Input></Input>
        </Form.Item>
        <Form.Item
        label='问卷描述'
        name='desc'
        rules={[{required:true,message:'请输入问卷描述'}]}>
            <TextArea></TextArea>
        </Form.Item>
        <Form.Item
        label='样式代码'
        name='js'
        rules={[{required:true,message:'请输入样式代码'}]}>
            <TextArea></TextArea>
        </Form.Item>
        <Form.Item
        label='脚本代码'
        name='css'
        rules={[{required:true,message:'请输入脚本代码'}]}>
            <TextArea></TextArea>
        </Form.Item>

    </Form>
}

export default PageSetting