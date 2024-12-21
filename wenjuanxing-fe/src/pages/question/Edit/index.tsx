import React, { FC } from 'react'
// 引入自定义hook 获取问卷数据
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
// 引入样式
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useTitle } from 'ahooks'
const Edit: FC = () => {
  // 调用获取问卷数据方法
  const { loading } = useLoadQuestionData()

  // 调用获取页面信息方法
  const { title } = useGetPageInfo()

  // 修改标题
  useTitle(`问卷编辑 -- ${title}`)

  // 创建分派器
  const dispatch = useDispatch()

  // 清除已选id方法
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          backgroundColor: '#fff',
          height: '40px',
          marginBottom: '15px',
        }}
      >
        <EditHeader></EditHeader>
      </div>
      <div className={styles['container_wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles.canvas_wrapper}>
              <div style={{ height: '900px' }}>
                {/* 此处需要将loading变量传给画布组件 */}
                <EditCanvas loading={loading}></EditCanvas>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
