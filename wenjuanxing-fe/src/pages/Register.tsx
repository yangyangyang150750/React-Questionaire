import { UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space ,Typography} from "antd";
import React,{FC} from "react";
import style from './Register.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { registerServe } from "../services/user";

// 解构
const{Title} = Typography
const Register:FC=()=>{
    // 创建路由
    const nav = useNavigate()

    // 注册按钮 回调
    const {run:register}=useRequest(async(values)=>{
        // 解构value
        const {username,password,nickname}=values
        // 发送请求
        const data = await registerServe(username,password,nickname)

        return data
    },{
        manual:true,
        // 成功回调
        onSuccess(){
            // 路由跳转
            nav(LOGIN_PATHNAME)
            // 成功信息
            message.success('注册成功')
        }
    })
    function onFinish(values:any) {
       register(values)
    }

    
    return <div className={style.container}>
        <Space>
            <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
        <Form labelCol={{span:8}} wrapperCol={{span:16}} onFinish={onFinish}>
            <Form.Item label='用户名' name='username' rules={[
                {required:true,message: '请输入用户名'},
                { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
                { pattern: /^\w+$/, message: '只能是字母数字下划线' },
                ]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='密码' name='password' rules={[
                { required: true, message: '请输入密码' }
                ]}
                >
                <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item label='确认密码' name='conform' dependencies={['password']} rules={[
                { required: true, message: '请输入密码' },
                ({getFieldValue})=>({
                    validator(_,value){
                        if (!value || getFieldValue('password')===value) {
                            return Promise.resolve()
                        } else {
                          return Promise.reject(new Error('两次密码不一致'))
                        }
                    }
                })
            ]}>
                <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item label='昵称' name='nickname'>
                <Input></Input>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">注册</Button>
                    <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
                </Space>
            </Form.Item>
        </Form>
    </div>
}

export default Register