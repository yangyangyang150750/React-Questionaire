import QuestionCheckBox from "./QuestionCheckBox"
import { QuestionInfo } from "./QuestionInfo"
import QuestionInput from "./QuestionInput"
import { QuestionParagraph } from "./QuestionParagraph"
import QuestionRadio from "./QuestionRadio"
import QuestionTextArea from "./QuestionTextArea"
import { QuestionTitle } from "./QuestionTitle"

type PropsType={
    fe_id:string,
    type:string,
    isHidden:boolean,
    props:any
}

// 根据组件信息 生成对应组件
export function getComponent(componentInfo:PropsType) {
    // 解构
    const{fe_id,type,isHidden,props}=componentInfo

    if (isHidden) {
        return null
    }
    
    if (type==='questionInput') {
        return <QuestionInput fe_id={fe_id} props={props}></QuestionInput>
    }

    if (type==='questionRadio') {
        return <QuestionRadio fe_id={fe_id} props={props}></QuestionRadio>
    }

    if (type==='questionParagraph') {
        return <QuestionParagraph {...props}></QuestionParagraph>
    }

    if (type==='questionTitle') {
        return <QuestionTitle {...props}></QuestionTitle>
    }

    if (type==='questionInfo') {
        return <QuestionInfo {...props}></QuestionInfo>
    }

    if (type==='questionCheckbox') {
        return <QuestionCheckBox fe_id={fe_id} props={props}></QuestionCheckBox>
    }

    if (type==='questionTextarea') {
        return <QuestionTextArea fe_id={fe_id} props={props}></QuestionTextArea>
    }

    return null
}