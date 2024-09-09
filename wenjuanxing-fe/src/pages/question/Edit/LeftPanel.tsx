import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import { Space, Table, Tabs } from "antd";
import { FC } from "react";
import Lib from'./componentLib'
import Layers from "./Layers";

const LeftPanel=()=>{
    const tabsItems=[
        {
            key:'componentlib',
            label:(
                <span>
                    <Space>
                        <AppstoreAddOutlined></AppstoreAddOutlined>
                        组件库
                    </Space>
                </span>
            ),
            children:<Lib></Lib>
        },
        {
            key:'layers',
            label:(
                <span>
                    <Space>
                        <BarsOutlined/>
                        图层
                    </Space>
                </span>
            ),
            children:<Layers></Layers>
        }
    ]

    return <Tabs defaultActiveKey='componentlib' items={tabsItems}></Tabs>
}

export default LeftPanel