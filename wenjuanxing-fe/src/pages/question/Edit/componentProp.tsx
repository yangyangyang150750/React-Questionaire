import React, { FC } from 'react'
import {
  ComponentConfigType,
  ComponentPropsType,
  getComponentConfigByType,
} from '../../../components/QuestionComponent'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeComponentProps } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'

//
const NoProps = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  // 创建分派器
  const dispatch = useDispatch()

  // 获取当前已选组件
  const { selectedComponent, selectedId } = useGetComponentInfo()
  // 若当前没有已选组件
  if (selectedComponent == null) {
    return <NoProps></NoProps>
  }

  // 解构当前组件配置
  // 获取type
  const { type, props, isLocked } = selectedComponent
  // 根据type 获取对应组件配置
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig == null) {
    return <NoProps></NoProps>
  }

  // 解构出属性组件
  const { PropComponent } = componentConfig as ComponentConfigType

  // 属性组件表单值发生改变时的回调
  function changeProps(newProps: ComponentPropsType) {
    // 判断当前是否有已选组件
    if (selectedComponent == null) {
      return
    } else {
      // 解构当前已选组件
      const { fe_id } = selectedComponent
      // 调用changeComponentProps方法
      // 修改redux内组件的属性
      dispatch(changeComponentProps({ fe_id, newProps }))
    }
  }
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked}></PropComponent>
}

export default ComponentProp
