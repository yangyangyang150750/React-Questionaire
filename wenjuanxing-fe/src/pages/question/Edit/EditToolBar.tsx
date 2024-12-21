import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownCircleOutlined,
  EyeInvisibleOutlined,
  LockFilled,
  RedoOutlined,
  UndoOutlined,
  UpCircleOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ActionCreators } from 'redux-undo'

const EditToolBar: FC = () => {
  // 获取当前已选组件id 已选组件 已复制组件
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()

  // 获取组件个数
  const length = componentList.length
  // 获取当前已选组件索引
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

  // 判断是否为第一个
  const isFirst = selectedIndex <= 0
  // 判断是否为最后一个
  const isLast = selectedIndex >= length - 1
  // 解构isLocked
  const { isLocked } = selectedComponent || {}

  // 创建分派器
  const dispatch = useDispatch()

  // 删除按钮点击回调
  function deleteHandle() {
    // 调用移除已选组件方法
    dispatch(removeSelectComponent())
  }

  // 隐藏按钮点击回调
  function hiddenHandle() {
    // 调用隐藏已选组件方法
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  // 锁定按钮点击回调
  function lockedHandle() {
    // 调用锁定已选组件方法
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  // 复制按钮点击回调
  function copy() {
    dispatch(copySelectedComponent())
  }

  // 粘贴按钮回调
  function paste() {
    dispatch(pasteCopiedComponent())
  }

  // 上移按钮回调
  function moveUp() {
    if (isFirst) {
      return
    }
    // 调用移动组件方法
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  // 下移按钮回调
  function moveDown() {
    if (isLast) {
      return
    }
    // 调用移动组件方法
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }
  // 撤销
  function undo() {
    dispatch(ActionCreators.undo())
  }

  // 重做
  function redo() {
    dispatch(ActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined></DeleteOutlined>}
          onClick={deleteHandle}
          disabled={selectedIndex < 0 || selectedIndex > length}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={hiddenHandle}
          disabled={selectedIndex < 0 || selectedIndex > length}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockFilled />}
          onClick={lockedHandle}
          disabled={selectedIndex < 0 || selectedIndex > length}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={copy}
          disabled={selectedIndex < 0 || selectedIndex > length}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpCircleOutlined />}
          onClick={moveUp}
          disabled={isFirst || selectedIndex < 0 || selectedIndex > length}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownCircleOutlined />}
          onClick={moveDown}
          disabled={isLast || selectedIndex < 0 || selectedIndex > length}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo} disabled={isLast}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo} disabled={isLast}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolBar
