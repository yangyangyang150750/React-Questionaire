import React, { FC } from "react"
import styles from'./QuestionTextArea.module.scss'

type PropsType={
    fe_id:string,
    props:{
        title:string,
        placeholder:string,
    }
}

export const QuestionTextArea:FC<PropsType>=({fe_id='',props})=>{
    // 解构
    const {title,placeholder}= props

    return<>
        <p>{title}</p>
        <div className={styles.textareaWrapper}>
            <textarea name={fe_id} placeholder={placeholder}  rows={5}/>
        </div>
    </>
}

export default QuestionTextArea