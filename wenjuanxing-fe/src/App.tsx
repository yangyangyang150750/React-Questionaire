import React,{FC} from "react";
// 引入list
import List from "./pages/manage/List";
// 引入RouterProvider
import { RouterProvider } from "react-router-dom";
// 引入路由配置
import routerConfig from "./router";
// 引入样式
import './App.css'
function App() {

  // 列表页
  return(
    <>
      <RouterProvider router={routerConfig}></RouterProvider>
    </>
  )

}

export default App;
