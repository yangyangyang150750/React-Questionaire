

// 定义questionInfo组件属性数据类型
export type QuestionInfoPropsType={
    title?:string,
    desc?:string,

    // onChange事件
    onChange?:(props:QuestionInfoPropsType)=>void
    // disabled 用于实现属性组件的禁用效果
    disabled?:boolean
}

// 定义questionInfo组件属性默认值
export const QuestionInfoPropsDefaultValue={
    title:'问卷标题',
    desc:'问卷描述'
}