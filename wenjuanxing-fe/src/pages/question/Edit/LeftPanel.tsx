import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import { Space, Tabs } from 'antd'
import React, { FC } from 'react'
import Lib from './componentLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentlib',
      label: (
        <span>
          <Space>
            <AppstoreAddOutlined></AppstoreAddOutlined>
            组件库
          </Space>
        </span>
      ),
      children: <Lib></Lib>,
    },
    {
      key: 'layers',
      label: (
        <span>
          <Space>
            <BarsOutlined />
            图层
          </Space>
        </span>
      ),
      children: <Layers></Layers>,
    },
  ]

  return <Tabs defaultActiveKey="componentlib" items={tabsItems}></Tabs>
}

export default LeftPanel
