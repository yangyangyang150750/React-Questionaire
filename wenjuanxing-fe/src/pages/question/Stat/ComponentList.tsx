import React, { FC } from 'react'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './ComponentList.module.scss'
import { getComponentConfigByType } from '../../../components/QuestionComponent'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  // 获取组件列表信息
  const { componentList } = useGetComponentInfo()

  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden) // 过滤隐藏的组件
        .map(c => {
          // 对于每个组件
          // 1、解构组件
          // 获取组件fe_id props type
          const { fe_id, props, type } = c

          // 2、根据组件type获取组件配置 并从组件配置中获取对应组件
          const componentConf = getComponentConfigByType(type)
          if (componentConf == null) return null
          // 获取对应组件
          const { Component } = componentConf

          // 3、拼接 class name
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId, // 是否选中
          })

          // 4、渲染组件
          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props}></Component>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
