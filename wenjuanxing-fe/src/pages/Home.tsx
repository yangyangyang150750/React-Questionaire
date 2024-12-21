import React, { FC, useEffect } from 'react'
// 引入三方hook useNavigate
// 用来实现路由跳转
import { useNavigate } from 'react-router-dom'
// 引入antd 的Button Typography
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import style from './Home.module.scss'
import axios from 'axios'

// 引入mock
// import '../_mock/index'
// 注意
// - Mock.js 只能劫持 XHR ，不能劫持 fetch ，所以不要用 fetch 请求。
// - Mock.js 要在生产环境下去掉，否则上线会有问题 —— Mock.js 体积也很大
// - 结论：不建议直接在前端使用 Mock.js

// import axios from "axios";

// 解构Typography
const { Title, Paragraph } = Typography
const Home: FC = () => {
  // 创建跳转器
  const nav = useNavigate()

  // // 组件渲染时 发送请求
  // useEffect(()=>{
  //     // fetch('/api/test')
  //     //   .then(res => res.json())
  //     //   .then(data => console.log('fetch data', data))
  //     // mock.js 只能劫持 XMLHttpRequest ，不能劫持 fetch

  //     // axios 内部使用 XMLHttpRequest API ，没用 fetch
  //     axios.get('/api/test').then(res=>console.log(res));
  // },[])
  useEffect(() => {
    // 注意！
    // 请求数据地址端口为3001 而前端端口为3000
    // 存在跨域问题！！！

    // 由于我们使用CRA创建项目 CRA内部利用webpack打包
    // => 我们对webpack做devServe代理 来解决跨域问题

    // 此时 fetch 和 axios 都能生效

    // fetch('/api/test')
    // .then(res => res.json())
    // .then(data => console.log('fetch data', data))

    axios.get('/api/test').then(res => console.log(res))
  }, [])
  return (
    <div className={style.container}>
      <div className={style.info}>
        <Title>问卷调查|在线调查</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </div>
  )
}

export default Home
