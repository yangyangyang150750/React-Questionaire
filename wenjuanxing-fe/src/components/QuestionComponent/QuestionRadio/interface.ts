

export type optionType={
    value:string,
    text:string
}

export type QuestionRadioPropsType={
    title?:string,
    isVertical?:boolean,
    options?:optionType[],
    value?:string

        // onChange事件
    onChange?:(props:QuestionRadioPropsType)=>void
    // disabled 用于实现属性组件的禁用效果
    disabled?:boolean
}

export const  QuestionRadioPropsDefaultValue:QuestionRadioPropsType={
    title:'单选标题',
    isVertical:false,
    options:[
        {value:'item1',text:'选项1'},
        {value:'item2',text:'选项2'},
        {value:'item3',text:'选项3'},
    ],
    value:''
}

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}