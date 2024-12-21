// 自定义加载问卷数据hook
// 将返回的问卷数据存于redux中
import { useParams } from 'react-router-dom'
import { getQuestionServe } from '../services/question'
// 引入useRequest三方hook 用于管理状态
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponent } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionData() {
  // 解析路由参数
  const { id = '' } = useParams()

  // 创建分派器
  const dispatch = useDispatch()

  // ajax 请求问卷数据
  const { data, loading, error, run } = useRequest(
    async id => {
      // 判断当前是否有id数据
      if (!id) {
        // 若当前没有id数据
        // 直接返回
        return
      }
      // 否则
      // 发送获取问卷数据请求(基于当前id)
      const data = await getQuestionServe(id)
      // 返回data
      return data
    },
    {
      // 设置为手动调用
      manual: true,
    }
  )

  // 监听data
  useEffect(() => {
    // 判断当前是否有data数据
    if (!data) {
      // 若还没有 直接返回 不做操作
      return
    }

    // 若当前已有返回的问卷数据
    // 则将其存于redux 中

    // 解构当前数据
    const { title, desc, js, css, isPublished, componentList } = data

    // 设置默认selectedID
    let selectedId = ''
    // 判断当前是否有问卷数据
    if (componentList.length > 0) {
      // 默认第一个为已选问卷
      selectedId = componentList[0].fe_id
    }

    // 调用reset方法 将componentList存于redux store中
    dispatch(resetComponent({ componentList, selectedId, copiedComponent: null }))
    // 调用reset方法 将问卷信息存于redux store中
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])

  // 监听id变化
  useEffect(() => {
    // 一旦id发生变化
    // => 重新获取当前id对应的问卷数据
    run(id)
  }, [id])

  // 此时 无需返回data数据
  // 因为已经存于redux中了
  return { loading, error }
}
export default useLoadQuestionData
