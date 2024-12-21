import React, { FC } from 'react'
// 引入RouterProvider
import { RouterProvider } from 'react-router-dom'
// 引入路由配置
import routerConfig from './router'
// 引入样式
import './App.css'
function App() {
  return (
    <>
      <RouterProvider router={routerConfig}></RouterProvider>
    </>
  )
}

export default App
