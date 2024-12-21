import { useEffect } from 'react'
import useGetUserInfo from './useGetUserInfo'
import {
  HOME_PATHNAME,
  isLoginOrRegister,
  isNoNeedLOGIN,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '../router'
import { useLocation, useNavigate } from 'react-router-dom'

// 用于实现类似路由守卫的功能
function useNavPage(waitingUserData: boolean) {
  // 从仓库中获取用户数据
  const { username } = useGetUserInfo()
  // 获取当前路由
  const { pathname } = useLocation()
  // 创建路由器
  const nav = useNavigate()

  // 监视数据变化
  useEffect(() => {
    // 判断当前是否已经加载完成
    if (waitingUserData) {
      // 若还在加载中
      // 不做任何操作 直接返回
      return
    }

    // 若当前已经加载完成
    // 则判断当前是否为登录状态(利用username判断)
    if (username) {
      // 若username有值 说明已经登录成功
      // 此时判断当前路由是否为登录页或注册页
      if (isLoginOrRegister(pathname)) {
        // 若为登录页或注册页
        // 则跳转至主页
        nav(MANAGE_INDEX_PATHNAME)
      }
    } else {
      // 若username没有值 说明尚未登录
      // 此时判断当前路由是否需要登录条件
      if (isNoNeedLOGIN(pathname)) {
        // 若无需登录条件
        return
      } else {
        // 否则 跳转至登录页
        nav(LOGIN_PATHNAME)
      }
    }
  }, [waitingUserData, username])
}

export default useNavPage
