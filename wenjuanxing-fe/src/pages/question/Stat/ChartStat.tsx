import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '../../../services/stat'
import { getComponentConfigByType } from '../../../components/QuestionComponent'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  // 获取当前问卷id
  const { id = '' } = useParams()

  // 保存统计数据
  const [stat, setStat] = useState([])

  // 发送请求 获取组件统计数据
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        // 保存统计数据
        // 用于渲染图标
        setStat(res.stat)
      },
    }
  )

  // 监听已选组件id的改变
  useEffect(() => {
    // 一旦已选组件改变
    // 重新获取统计数据
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  // 生成统计图表
  function genStatElem() {
    if (!selectedComponentId) return <div>未选中组件</div>
    //
    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {}
    if (StatComponent == null) return <div>该组件无统计图表</div>
    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div style={{ textAlign: 'center' }}>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
