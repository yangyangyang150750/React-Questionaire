import React, { FC } from 'react'
// 导入Link 和创建路由方法
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { UserOutlined } from '@ant-design/icons'
import { Button, message, Space } from 'antd'
import { removeToken } from '../utils/user-token'
// 导入从仓库中获取用户信息的自定义hook
import useGetUserInfo from '../hooks/useGetUserInfo'
// 导入分派器
import { useDispatch } from 'react-redux'
// 导入退出登录action
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  // 创建路由
  const nav = useNavigate()

  // 创建分派器
  const dispatch = useDispatch()

  // * * * 使用redux前 获取用户信息的操作
  // // 发送请求 获取用户信息
  // const {data}=useRequest(getUserInfoServe)
  // // 解构data
  // const {username,nickname}=data||{}

  //  * * * 使用redux后 获取用户信息的操作
  const { username, nickname } = useGetUserInfo()
  console.log(username)

  // 退出按钮回调
  function logOut() {
    // 清空redux 内 user的数据
    dispatch(logoutReducer())
    // 清除token
    removeToken()
    // 路由跳转至登录页
    nav(LOGIN_PATHNAME)
    // 成功信息
    message.success('退出成功！')
  }

  // 登录成功组件
  const UserInfo = (
    <>
      <Space>
        <span style={{ color: '#e8e8e8' }}>
          <UserOutlined></UserOutlined>
          {username}
        </span>
        <Button type="link" onClick={logOut}>
          退出
        </Button>
      </Space>
    </>
  )

  // 请求登录组件
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
