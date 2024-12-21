import { Input } from 'antd'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input
const ListSearch: FC = () => {
  // 创建路由器
  const nav = useNavigate()
  // 获取当前url地址
  const { pathname } = useLocation()
  // 保存当前搜索框的值
  const [searchValue, setSearchValue] = useState<string>('')

  // 当url发生改变时 需要将查询参数赋值给搜索框
  // 使得二者保持一致
  // 读取查询参数
  const [searchParams] = useSearchParams()
  useEffect(() => {
    // 一旦查询参数发生改变
    // 更新搜索框的值
    setSearchValue(searchParams.get(LIST_SEARCH_PARAM_KEY) || '')
  }, [searchParams])

  // 点击搜索时的回调
  function onSearchHandler(val: string) {
    // 此时需要进行页面跳转 并且将搜索框内的值作为参数携带
    nav({
      // 跳转的路径
      pathname,
      // 携带的参数
      // 此时page和pagesize都为默认值,分页器从头开始
      search: `${LIST_SEARCH_PARAM_KEY}=${val}`,
    })
  }

  // 搜索框输入改变时的回调
  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(() => event.target.value)
  }
  return (
    <>
      <Search
        placeholder="请输入"
        allowClear
        value={searchValue}
        onChange={onChangeHandler}
        onSearch={onSearchHandler}
        style={{ width: 200 }}
      ></Search>
    </>
  )
}

export default ListSearch
