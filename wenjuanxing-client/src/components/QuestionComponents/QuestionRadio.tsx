import React, { FC } from "react"
import styles from'./QuestionRadio.module.scss'

type PropsType={
    fe_id:string,
    props:{
        options:Array<{
            value:string,
            text:string
        }>,
        isVertical:boolean,
        title:string,
        value:string,
    }
}

export const QuestionRadio:FC<PropsType>=({fe_id,props})=>{
    // 解构
    const {options,isVertical,title,value}=props
    
    // 判断竖向、横向
    let liClassName = ''
    if (isVertical) liClassName = styles.verticalItem
    else liClassName = styles.horizontalItem

    return<>
        <p>{title}</p>
        <ul className={styles.list}>
            {options.map(opt=>{
                // 解构
                const {value:val,text}=opt

                return <li key={val} className={liClassName}>
                    <label>
                        <input type="radio" name={fe_id} value={val} defaultChecked={val===value} />
                        {text}
                    </label>
                </li>
            })}
        </ul>
    </>
}

export default QuestionRadio