import React, { FC, MouseEvent } from 'react'
// 引入模块化样式
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponent,
} from '../../../store/componentsReducer'
import {
  ComponentConfigType,
  getComponentConfigByType,
} from '../../../components/QuestionComponent'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindKeyPressCanvas from '../../../hooks/useBindKeyPressCanvas'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import { nanoid } from '@reduxjs/toolkit'

// 声明接收属性的类型
export type PropsType = {
  loading: boolean
}

// 根据组件信息(从redux中获取的) 生成对应组件
function genComponent(componentInfo: ComponentInfoType) {
  // 解构当前组件信息
  const { title, type, props } = componentInfo

  // 根据当前组件类型获取对应组件配置
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig === null) return

  // 解构出对应组件
  const { Component } = componentConfig as ComponentConfigType

  // 返回组件
  return <Component {...props} />
}

const EditCanvas = ({ loading }: PropsType) => {
  // 获取组件数据
  const { componentList, selectedId } = useComponentInfo()

  // 创建分派器
  const dispatch = useDispatch()

  // 绑定快捷键
  useBindKeyPressCanvas()

  // 组件点击时的回调
  function handleClick(event: MouseEvent, id: string) {
    // 阻止向上冒泡
    // 防止触发父组件的清除已选id方法
    event.stopPropagation()
    // 调用更新所选组件id方法
    dispatch(changeSelectedId(id))
  }

  // 判断当前是否正在加载数据
  if (loading) {
    // 若还未获取到数据
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spin></Spin>
      </div>
    )
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {/* // 渲染组件列表数据 */}
        {componentList
          .filter(c => !c.isHidden)
          .map(component => {
            // 解构component
            const { fe_id, props, type, title, isLocked } = component

            // 拼接classname
            // 默认样式
            const wrapperDefaultClassName = styles['component-wrapper']
            // 鼠标点击样式
            const selectedClassName = styles.selected
            // 组件锁定样式
            const Locked = styles.Locked

            // 拼接类名
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: selectedId === fe_id,
              [Locked]: isLocked,
            })
            return (
              <>
                <SortableItem key={fe_id} id={fe_id}>
                  <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                    <div className={styles.component}>{genComponent(component)}</div>
                  </div>
                </SortableItem>
              </>
            )
          })}
      </div>

      {/* // <div className={styles.canvas}>
        //     <div className={styles['component-wrapper']}>
        //         <div className={styles.component}>
        //             <QuestionInput></QuestionInput>
        //         </div>
        //     </div>
        //     <div className={styles['component-wrapper']}>
        //         <div className={styles.component}>
        //             <QuestionTitle></QuestionTitle>
        //         </div>
        //     </div>
            
        // </div> */}
    </SortableContainer>
  )
}

export default EditCanvas
