
export type OptionsType={
    value:string,
    text:string,
    checked:boolean
}

export type QuestionCheckboxPropsType={
    title?:string,
    isVertical?:boolean,
    list?:OptionsType[],

    // 用于PropsComponent
    onChange?:(newProps:QuestionCheckboxPropsType)=>void
    disabled?:boolean
}

// 定义默认值
export const QuestionCheckboxDefaultProps={
    title:'多选',
    isVertical:false,
    list:[
        {value:'item1',text:'选项1',checked:false},
        {value:'item2',text:'选项2',checked:false},
        {value:'item3',text:'选项3',checked:false},
    ],
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}