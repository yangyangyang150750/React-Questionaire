import { UserAddOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Space ,Typography} from "antd";
import React,{FC, useEffect} from "react";
import style from './Login.module.scss'
import { Link, useNavigate } from "react-router-dom";
import {  MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { loginServe } from "../services/user";
import { setToken } from "../utils/user-token";
import { loginReducer } from "../store/userReducer";
import { useDispatch } from "react-redux";


// 解构
const{Title} = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

// 登录组件
const Login:FC=()=>{
  // 创建分派器
    const dispatch = useDispatch()
  // 创建路由器
  const nav = useNavigate()
    // 利用三方hook
    // 拿到当前表单form
    const[form]=Form.useForm()
    // 组件重新渲染时
    useEffect(()=>{
        const{username,password}=getUserInfoFromStorage()
        form.setFieldsValue({ username, password })
    },[])


    // 登录按钮 回调
    const {run:loginHandle}=useRequest(async(username:string, password:string)=>{
      // 发送请求
      const data = await loginServe(username, password)
      // 返回数据
      return data
    },{
      manual:true,
      //成功回调
      onSuccess(result){
        const {username,nickname}=form.getFieldsValue()
        console.log({username,nickname});
        dispatch(loginReducer({username,nickname}))
        // 解构出token 并保存
        const {token} = result
        setToken(token)
        // 跳转至问卷页
        nav(MANAGE_INDEX_PATHNAME)
        // 提示消息
        message.success('登录成功！')
      }
    })

    function onFinish(values:any) {
        const { username, password, remember } = values || {}

        if (remember) {
          rememberUser(username, password)
        } else {
          deleteUserFromStorage()
        }

        // 调用登录方法
        loginHandle(username, password)
    }


    return <div className={style.container}>
        <Space>
            <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
        <Form labelCol={{span:8}} wrapperCol={{span:16}} onFinish={onFinish} initialValues={{remember:true}} form={form}>
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
            <Form.Item name='remember' valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">登录</Button>
                    <Link to={REGISTER_PATHNAME}>注册新用户</Link>
                </Space>
            </Form.Item>
        </Form>
    </div>
}

export default Login