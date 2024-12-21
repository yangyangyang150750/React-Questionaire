import React, { FC, useState } from 'react'
import style from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, message, Popconfirm } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionServe, updateQuestionServe } from '../services/question'
import confirm from 'antd/es/modal/confirm'
import { ResDataType } from '../services/ajax'

// 定义属性类型
type PropsType = {
  _id: string // 服务端mongodb 自动生成_id
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  // 解构属性
  const { _id, title, isPublished, answerCount, createdAt, isStar } = props

  // 保存标星状态
  const [isStarState, setIsStarState] = useState(isStar)

  // 保存删除状态
  const [isDeleteState, setIsDeleteState] = useState(false)

  // 调用修改问卷标星状态方法
  // ajax请求都需要用useRequest包裹
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      //异步函数需要包裹
      await updateQuestionServe(_id, { isStar: !isStarState })
    },
    {
      // 手动
      manual: true,
      // 请求成功的回调
      onSuccess() {
        // 更新标星状态
        setIsStarState(!isStarState)
        // 更新消息
        message.success('已更新')
      },
    }
  )

  // 复制问卷确认按钮回调
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      // 发送请求
      const data = await duplicateQuestionServe(_id)
      // 返回数据
      return data
    },
    {
      // 手动执行
      manual: true,
      // 执行成功的回调
      onSuccess(result: any) {
        // 提示信息
        message.success('复制成功')
        // 跳转至问卷编辑页
        nav(`/question/edit/${result.id || result._id}`)
      },
    }
  )

  // 删除按钮确认的回调方法
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      // 发送请求
      const data = (await updateQuestionServe(_id, {
        isDeleted: true,
      })) as ResDataType

      // 返回数据
      return data
    },
    {
      manual: true,
      // 删除成功的回调
      onSuccess() {
        // 更新删除状态
        setIsDeleteState(true)
        // 删除提示消息
        message.success('删除成功')
      },
    }
  )

  function del() {
    confirm({
      title: '确认删除此问卷?',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  // 若当前为删除状态
  // 则无需渲染
  if (isDeleteState) {
    return null
  }
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div className={style.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState}
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={style.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }}></Divider>
      <div className={style['button-container']}>
        <div className={style.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={style.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState === true ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制此问卷?"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
