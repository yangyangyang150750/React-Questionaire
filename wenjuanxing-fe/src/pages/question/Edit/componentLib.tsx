import React, { FC, useCallback } from 'react'
// 引入组件配置分组
import { componentConfGroup, ComponentConfigType } from '../../../components/QuestionComponent'
import { Typography } from 'antd'
// 引入模块化sass
import styles from './componentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'

// 解构出title
const { Title } = Typography

// 根据组件配置 生成对应组件
function genComponent(compConfig: ComponentConfigType) {
  // 创建分派器
  const dispatch = useDispatch()

  // 解构当前组件配置
  const { title, type, Component, defaultProps } = compConfig

  // // // 组件点击回调事件
  // function handleClick() {
  //     dispatch(addComponent({
  //         fe_id:nanoid(5),    // 前端生成的id
  //         type,
  //         title,
  //         props:defaultProps,
  //     }))
  // }
  // 使用useCallBack优化
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(5), // 前端生成的id
        type,
        title,
        props: defaultProps,
      })
    )
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component {...defaultProps}></Component>
      </div>
    </div>
  )
}

// 组件库组件
const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((groupConfig, index) => {
        // 解构当前组的组件配置
        const { groupId, groupName, components } = groupConfig

        return (
          <div key={groupId}>
            {/* 生成标题 */}
            <Title
              level={3}
              style={{
                fontSize: '12px',
                marginTop: index > 0 ? '0px' : '20px',
              }}
            >
              {groupName}
            </Title>
            {/* 生成组件 */}
            {components.map(compConfig => genComponent(compConfig))}
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
