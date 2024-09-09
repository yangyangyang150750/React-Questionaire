// 定义input组件所需属性  以及 数据类型

// 定义属性数据类型
export type QuestionInputPropsType ={
    title?:string,
    placeholder?:string

    // onChange事件
    onChange?:(props:QuestionInputPropsType)=>void
    // disabled 用于实现属性组件的禁用效果
    disabled?:boolean
}

// 定义title默认属性
export const  QuestionInputDefaultProps:QuestionInputPropsType={
    title:'输入框标题',
    placeholder:'请输入'
}