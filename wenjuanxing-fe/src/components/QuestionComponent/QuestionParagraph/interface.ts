

// 定义组件属性数据类型
export type QuestionParagraphPropsType={
    title?:string,
    isCenter?:boolean,

    // onChange事件
    onChange?:(props:QuestionParagraphPropsType)=>void
    // disabled 用于实现属性组件的禁用效果
    disabled?:boolean
}

// 定义paragraph默认属性
export const  QuestionParagraphDefaultProps:QuestionParagraphPropsType={
    title:'一行段落',
    isCenter:false,
}