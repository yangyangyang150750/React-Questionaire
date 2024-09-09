import { useRequest } from "ahooks"
import { FC, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuestionStatListService } from "../../../services/stat"
import useGetComponentInfo from "../../../hooks/useGetComponentInfo"
import { Pagination, Spin, Table, Typography } from "antd"
import { STAT_PAGE_SIZE } from "../../../constant"


// 定义属性类型
export type PropsType = {
  selectedComponentId: string
  setSelectedComponentId:   (id: string) => void
  setSelectedComponentType  : (type: string) => void
}

const{Title} = Typography

const PageStat:FC<PropsType>=(props:PropsType)=>{
  // 结构属性
  const {setSelectedComponentId,setSelectedComponentType,selectedComponentId} =props

  // 获取当前问卷id
  const {id=''} = useParams()

  // 保存当前页码
  const [page,setPage] = useState(1)
  // 保存pageSize
  const [pageSize,setPageSize] = useState(STAT_PAGE_SIZE)
  // 保存总数据
  const [total,setTotal]= useState()

  // 保存统计列表数据
  const [list,setList] = useState([])

  // 
  
  // 发送请求 获取问卷统计数据
  const {loading}=useRequest(async()=>{
    // 获取问卷统计信息
    const res = await getQuestionStatListService(id,{page,pageSize})
    return res
  },{
    // 定义刷新依赖
    refreshDeps:[id,page,pageSize],
    // 成功回调
    onSuccess(res){
      // 解构出total list
      const {total,list=[]}=res
      // 保存
      setTotal(total)
      setList(list)
    }
  })

  // 获取组件列表数据
  const {componentList} =useGetComponentInfo()

  // 定义表格列
  const columns = componentList.map(c=>{
      // 解构
      const { fe_id,title,props={},type} = c

      // 获取表格列tital数据
      const colTitle = props!.title || title

      // 返回
      return {
        // 此处可以写jsx
        // title:colTitle,
        title:(
          <div
          style={{cursor:'pointer'}}
          onClick={()=>{
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)}}
            >
              <span style={{color:selectedComponentId===fe_id?'#1890ff':'inherit'}}>
                {colTitle}
              </span>
          </div>
        ),
        dataIndex:fe_id
      }
  }) 

  // 列表数据添加id
  const dataSourceList=list.map((i:any)=>{return {...i,key:i._id}})

  // 定义表格元素
  const TableElement = <>
    <Table
      // 表格列
      columns={columns}
      // 要渲染的数据
      dataSource={list}
      // 分页效果
      pagination={false}
    />
    {/* 分页组件 */}
    <Pagination
      style={{marginTop:'10px'}}
      align={'center'}
      total={total}
      pageSize={pageSize}
      current={page}
      onChange={page=>setPage(page)}
      onShowSizeChange={(page,pageSize)=>{
        setPage(page)
        setPageSize(pageSize)
      }}
    />
  </>


  return <>
      <Title level={3}>答卷数量:{total}</Title>
      {loading&&<div style={{textAlign:'center'}}>
          <Spin></Spin>
        </div>}
      {!loading&&TableElement}
  </>
}

export default PageStat