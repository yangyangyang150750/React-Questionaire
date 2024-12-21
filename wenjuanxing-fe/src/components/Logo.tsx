import React, { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import style from './Logo.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'

// 解构Typography
const { Title } = Typography

const Logo: FC = () => {
  // 调用自定义hook 从仓库中获取用户信息
  const { username } = useGetUserInfo()

  // 保存路由地址
  // 默认为首页
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  // 监听用户名
  useEffect(() => {
    // 判断是否存在用户名
    if (username) {
      // 若当前有用户名
      // => 已经登录
      // 跳转至我的问卷页面
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <div className={style.container}>
      <Link to={pathname}>
        <Space>
          <Title className={style.h1}>
            <FormOutlined></FormOutlined>
          </Title>
          <Title className={style.h1}>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
