import React,{FC} from "react";
// 引入outlet
import { Outlet } from "react-router-dom";
// 引入模块sass
import style from './MainLayOut.module.scss'
// 引入Logo组件
import Logo from "../components/Logo";
// 引入UserInfo组件
import UserInfo from "../components/UserInfo";
// 引入 Layout
import { Layout, Spin } from 'antd';
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
// 解构 Layout
const { Header, Footer, Sider, Content } = Layout;

const MainLayOut:FC =()=>{
    // 调用获取用户数据方法
    // 获取当前加载状态
    const waitingUserData=useLoadUserData()

    // 添加路由守卫
    useNavPage(waitingUserData)

    return <Layout>
        <Header className={style.header}>
            <div className={style.left}>
                <Logo></Logo>
            </div>
            <div className={style.right}>
                <UserInfo></UserInfo>
            </div>
        </Header>
        <Content className={style.main}>
            {/* Outlet 类似Vue的插槽 */}
            {waitingUserData?<div style={{textAlign:'center',marginTop:'200px'}}><Spin></Spin></div>:<Outlet></Outlet>}
        </Content>
        <Footer className={style.footer}>MainLayOut Footer &copy;</Footer>
    </Layout>
}

export default MainLayOut