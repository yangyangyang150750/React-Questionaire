import { Space, Typography } from "antd";
import { FC } from "react";
import { QuestionInfoPropsDefaultValue, QuestionInfoPropsType } from "./interface";


const {Paragraph,Title} = Typography

const QuestionInfoComponent:FC<QuestionInfoPropsType>=(props:QuestionInfoPropsType)=>{
    
    // 解构属性
    const {title='',desc=''} = {...QuestionInfoPropsDefaultValue,...props}
    
    // 重构desc
    const descArray = desc.split('\n')

    return <div style={{textAlign:'center'}}>
        <Title style={{fontSize:'24px'}}>{title}</Title>
        <Paragraph>{descArray.map((desc,index)=>{
            return <span key={index}>
                {desc}<br/>
            </span>
        })}</Paragraph>
    </div>
}

export default QuestionInfoComponent