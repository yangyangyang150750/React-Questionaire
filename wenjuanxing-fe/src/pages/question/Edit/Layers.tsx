import React, { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { message, Input, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeSelectedId,
  changeComponentTitle,
  toggleComponentLocked,
  changeComponentHidden,
  moveComponent,
} from '../../../store/componentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    // 获取当前组件配置
    const curComp = componentList.find(c => c.fe_id === fe_id)
    
    // 若当前组件配置存在 并且为隐藏状态
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }

    // 若当前组件不是已选组件
    if (fe_id !== selectedId) {
      // 当前组件未被选中
      // 此时执行选中流程
      // 1、调用修改已选组件id方法
      // => 将当前组件变为已选组件
      dispatch(changeSelectedId(fe_id))
      // 2、重设当前正在修改标题的组件
      setChangingTitleId('')
      return
    }

    // 若当前组件不是隐藏状态 且已经是已选组件
    // 将其设置为正在修改标题的组件
    setChangingTitleId(fe_id)
  }

  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    // 获取输入框内容
    const newTitle = event.target.value.trim()
    // 处理边界情况
    if (!newTitle) return
    if (!selectedId) return
    // 调用改变组件标题方法
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
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
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c

        // 拼接 title className
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changingTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    // 按下回车时 => 重置正在修改的组件
                    onPressEnter={() => setChangingTitleId('')}
                    // 失去焦点时 => 重置正在修改的组件
                    onBlur={() => setChangingTitleId('')}
                  />
                )}
                {fe_id !== changingTitleId && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
