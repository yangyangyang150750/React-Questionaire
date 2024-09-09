import React, { lazy } from 'react'
// 引入创建浏览器路由
import { createBrowserRouter } from 'react-router-dom'

// 引入各个页面/模板
import MainLayout from '../layouts/MainLayOut'
import ManageLayout from '../layouts/ManageLayOut'
import QuestionLayout from '../layouts/QuestionLayOut'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'
import path from 'path'
// import Edit from '../pages/question/Edit'
// import Stat from '../pages/question/Stat'

// 路由懒加载 拆分bundle 优化首页体积
const Edit = lazy(()=>import(/* webpackChunkName:'editPage'*/'../pages/question/Edit'))
const Stat = lazy(()=>import(/* webpackChunkName:'statPage'*/'../pages/question/Stat'))

// 配置路由
const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            // 主页
            {
                path:'/',
                element:<Home></Home>
            },
            // 登录
            {
              path: 'login',
              element: <Login />,
            },
            // 注册
            {
              path: 'register',
              element: <Register />,
            },
            // manage
            {
              path: 'manage',
              element: <ManageLayout />,
              children: [
                {
                  path: 'list',
                  element: <List />,
                },
                {
                  path: 'star',
                  element: <Star />,
                },
                {
                  path: 'trash',
                  element: <Trash />,
                },
              ],
            },

            // 404
            {
              path: '*', // 404 路由配置，都写在最后（兜底）
              element: <NotFound />,
            },
        ],
    },
    // question
    {
    path: 'question',
    element: <QuestionLayout />,
    children: [
        // 编辑
      {
        // 添加动态路由
        path: 'edit/:id',
        element: <Edit />,
      },
      // 统计
      {
        // 添加动态路由
        path: 'stat/:id', // statistic 统计
        element: <Stat />,
      },
    ],
  },
])


// 常用的路由，常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

// 判断是否为登录页或者注册页
export const isLoginOrRegister=(pathname:string)=>{
  if ([REGISTER_PATHNAME,LOGIN_PATHNAME].includes(pathname)) {
    return true
  }else{
    return false
  }
}

// 判断当前页面是否需要登录条件
export const isNoNeedLOGIN =(pathname:string)=>{
  if ([REGISTER_PATHNAME,LOGIN_PATHNAME,HOME_PATHNAME].includes(pathname)) {
    return true
  }else{
    return false
  }
}
export default router

