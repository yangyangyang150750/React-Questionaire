import React, { FC, useEffect, useState } from "react"
import styles from'./QuestionCheckBox.module.scss'

type PropsType={
    fe_id:string,
    props:{
        list:Array<{
            value:string,
            text:string,
            checked:boolean
        }>
        isVertical:boolean,
        title:string,
    }
}

export const QuestionCheckBox:FC<PropsType>=({fe_id,props})=>{
    // 解构
    console.log('props:',props);
    
    const {list,isVertical,title}=props

    // 保存当前已选按钮
    const[selectedValues,setSelectedValues]=useState<string[]>([])
    
    // 初始化当前已选按钮数组
    useEffect(()=>{
        list.forEach(item=>{
            if (item.checked) {
                setSelectedValues(selectedValues.concat(item.value))
            }
        })
    },[list])

    // 判断竖向、横向
    let liClassName = ''
    if (isVertical) liClassName = styles.verticalItem
    else liClassName = styles.horizontalItem

    // 点击按钮回调
    function handlerChange(value:string) {
        // 判断当前按钮是否已选
        if (selectedValues.includes(value)) {
            // 若已选
            // 切换为未选
            setSelectedValues((selectedValues)=>selectedValues.filter(v=>v!==value))
        }else{
            // 切换为已选
            setSelectedValues((selectedValues)=>selectedValues.concat(value))
        }
    }
    return<>
        <p>{title}</p>
        {/* 汇总checkbox的值 */}
        <input type="hidden" name={fe_id} value ={selectedValues.toString()} />
        <ul className={styles.list}>
            {list.map(item=>{
                // 解构
                const {value:val,text,checked}=item

                // 判断竖向、横向
                let liClassName = ''
                if (isVertical) liClassName = styles.verticalItem
                else liClassName = styles.horizontalItem
                
                return <li key={val} className={liClassName}>
                    <label>
                        <input type="checkbox" checked={selectedValues.includes(val)} onChange={()=>handlerChange(val)}/>
                        {text}
                    </label>
                </li>
                // checkbox情况比较特殊
                // input redio 一个name对应一个value
                // checkbox 一个name 对应多个value
            })}
        </ul>
    </>
}

export default QuestionCheckBox