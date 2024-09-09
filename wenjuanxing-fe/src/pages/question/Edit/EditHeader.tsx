import { ChangeEvent, FC,useState } from "react"
// 导入模块化sass
import styles from './EditHeader.module.scss'
import { Button, Input, message, Space } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import Title from "antd/es/typography/Title"
import { EditOutlined, LeftCircleOutlined, LoadingOutlined } from "@ant-design/icons"
import EditToolBar from "./EditToolBar"
import useGetPageInfo from "../../../hooks/useGetPageInfo"
import { useDispatch } from "react-redux"
import { changePageTitle } from "../../../store/pageInfoReducer"
import useGetComponentInfo from "../../../hooks/useGetComponentInfo"
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks"
import { updateQuestionServe } from "../../../services/question"

// 将问卷标题模块抽离
const TitleElem:FC=()=>{
    //创建分派器
    const dispatch= useDispatch()

    // 获取问卷信息 解构出标题
    const {title} = useGetPageInfo()

    // 记录编辑状态
    const [editState,setEditState] = useState(false)

    // 输入框内容改变时的回调
    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        // 获取输入框内的内容
        const newTitle = event.target.value.trim()
        if (!newTitle) {
            return
        }
        // 调用修改问卷标题方法
        dispatch(changePageTitle({newTitle}))
    }
    // 判断当前是否处于编辑状态
    if (editState) {
        // 若处于编辑状态
        return (
            <Input
            value={title}
            onPressEnter={()=>setEditState(false)}
            onBlur={()=>setEditState(false)}
            onChange={handleChange}></Input>
        )
    }

    return <Space>
        <Title>{title}</Title>
        <Button 
        icon={<EditOutlined></EditOutlined>}
        type="text"
        onClick={()=>setEditState(true)}
        />
    </Space>
}

// 将保存按钮模块抽离
const SaveButton:FC=()=>{
    // 获取要提交的数据
    // 1、当前id
    // 利用useParam方法 从路由上获取id
    const {id}=useParams()
    // 2、当前组件列表数据componentList
    const {componentList} = useGetComponentInfo()
    // 3、当前页面信息
    const pageInfo= useGetPageInfo()
    
    // 发送更新问卷信息请求
    const {loading,run:save}=useRequest(async()=>{
        if (!id) {
            return 
        }
        // 发送请求
        await updateQuestionServe(id,{...pageInfo,componentList})
    },{
        manual:true
    })

    // 设置快捷键
    // 手动保存
    useKeyPress(['ctrl.s','meta.s'],(event:KeyboardEvent)=>{
        // 阻止默认行为
        event.preventDefault()
        // 防止连续触发
        if (!loading) {
            save()
        }
    })

    // 自动保存
    // 使用带有防抖功能的useEffect
    useDebounceEffect(()=>{
        save()
    },[componentList,pageInfo])

    return (
        <Button 
        onClick={save} 
        disabled={loading}
        icon={loading?<LoadingOutlined/>:null}>保存</Button>
    )
}

// 将发布按钮模块抽离
const PublishButton:FC=()=>{
    // 创建路由器
    const nav = useNavigate()

    // 获取要提交的数据
    // 1、当前id
    // 利用useParam方法 从路由上获取id
    const {id}=useParams()
    // 2、当前组件列表数据componentList
    const {componentList} = useGetComponentInfo()
    // 3、当前页面信息
    const pageInfo= useGetPageInfo()
    
    // 发送更新问卷信息请求
    const {loading,run:pub}=useRequest(async()=>{
        if (!id) {
            return 
        }
        // 发送请求
        await updateQuestionServe(id,{...pageInfo,componentList,isPublished:true})
    },{
        manual:true,
        // 成功回调
        onSuccess(){
            message.success('发布成功')
            // 跳转至统计页面
            nav('/question/stat/'+id)
        },
    })
    return (
        <Button 
        type="primary" 
        onClick={pub}
        disabled={loading}
        >发布</Button>
    )
}

// 编辑器头部
const EditHeader:FC =()=>{
    // 创建路由器
    const nav = useNavigate()
    return (
        <div className={styles['container-wrapper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button type="link" icon={<LeftCircleOutlined></LeftCircleOutlined>} onClick={()=>nav(-1)}> 返回</Button>
                        {/* 问卷标题组件 */}
                        <TitleElem></TitleElem>
                    </Space>
                </div>
                <div className={styles.main}>
                    <EditToolBar></EditToolBar>
                </div>
                <div className={styles.right}>
                    <Space>
                        <SaveButton></SaveButton>
                        <PublishButton></PublishButton>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default EditHeader