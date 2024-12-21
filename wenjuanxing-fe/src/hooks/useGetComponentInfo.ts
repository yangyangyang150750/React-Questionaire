import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

// 获取组件信息方法
const useGetComponentInfo = () => {
  // 1、从redux 仓库中获取组件数据
  const components = useSelector<StateType>(
    state => state.components.present
  ) as ComponentsStateType

  // 2、解构出组件列表数据
  // 解构出问卷列表数据 已选组件id 当前已复制组件
  const { componentList, selectedId, copiedComponent } = components

  // 3、获取当前已选组件
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)
  // 返回组件列表数据
  return { copiedComponent, componentList, selectedId, selectedComponent }
}

export default useGetComponentInfo
