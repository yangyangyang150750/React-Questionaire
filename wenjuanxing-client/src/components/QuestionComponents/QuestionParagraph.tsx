import React ,{ CSSProperties, FC } from "react"


// 
type PropsType={
    // 仅用于展示 无需fe_id
    text:string,
    isCenter?:boolean
}
export const QuestionParagraph:FC<PropsType>=(props:PropsType)=>{
    // 解构
    const {text='',isCenter}=props
    
    const style:CSSProperties={}
    if (isCenter) {
        style.textAlign='center'
    }

    // 处理换行
    const textArr = text.split('\n')

    return <p>
        {textArr.map((t,index)=>{
            return <span key={index}>
                {t}<br/>
            </span>
            
        })}
    </p>
}