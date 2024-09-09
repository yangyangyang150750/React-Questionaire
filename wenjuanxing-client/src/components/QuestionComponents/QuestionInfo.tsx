import React ,{ CSSProperties, FC } from "react"


// 
type PropsType={
    // 仅用于展示 无需fe_id
    title:string,
    desc?:string,
}
export const QuestionInfo:FC<PropsType>=(props:PropsType)=>{
    // 解构
    const {title,desc}=props
    const style:CSSProperties={}

    return <div style={{textAlign:'center'}}>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>
}