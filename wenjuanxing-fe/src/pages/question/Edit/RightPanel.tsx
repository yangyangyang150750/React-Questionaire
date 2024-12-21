import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Space, Tabs } from 'antd'
import ComponentProp from './componentProp'
import PageSeting from './PageSeting'
import React, { useEffect, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import PageSetting from './PageSeting'

// 枚举
// => 方便维护
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel = () => {
  // 标记当前选中的模块
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)

  // 获取当前组件信息
  // 解构出当前已选组件的id
  const { selectedId } = useGetComponentInfo()

  // 监听selectedId的改变
  useEffect(() => {
    // 判断当前selectedId是否有值
    // 即 当前是否选中组件
    if (selectedId) {
      // 若选中
      // 切换模块为prop
      setActiveKey(TAB_KEYS.PROP_KEY)
    } else {
      // 否则
      // 说明此时未选中组件
      // 切换模块为setting
      setActiveKey(TAB_KEYS.SETTING_KEY)
    }
  }, [selectedId])

  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <Space>
            <FileTextOutlined />
            属性
          </Space>
        </span>
      ),
      children: <ComponentProp></ComponentProp>,
    },
    {
      key: 'setting',
      label: (
        <span>
          <Space>
            <SettingOutlined />
            设置
          </Space>
        </span>
      ),
      children: <PageSetting></PageSetting>,
    },
  ]

  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>
}

export default RightPanel
