import QuestionInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import Head from "next/head";
import styles from '@/styles/Question.module.scss'
import { PageWrapper } from "@/components/QuestionComponents/PageWrapper";
import { getQuestionById } from "@/services/question";
import { getComponent } from "@/components/QuestionComponents";

export type PropsType={
    errno: number,
    data?: {
      _id: string
      title: string
      desc?: string
      js?: string
      css?: string
      isDeleted: boolean
      isPublished: boolean
      componentList: Array<any>
    }
    msg?: string
}

export default function Question(props:PropsType){
    const {errno,data,msg=''} =props
    
    // 数据错误
    // 判断errno的取值
    if (errno!==0) {
        return <PageWrapper title="错误">
            <h1>错误</h1>
            <p>{msg}</p>
        </PageWrapper>
    }

    const {_id,title,desc,js,css,isDeleted,isPublished,componentList=[]}=data||{}

    // 判断数据被删
    if (isDeleted) {
        return <PageWrapper title={title} desc={desc}>
            <h1>{msg}</h1>
            <p>数据已被删除</p>
        </PageWrapper>
    }

      // 尚未发布的，提示错误
    if (!isPublished) {
      return <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    }


    // 根据组件信息 生成对应组件
    const componentListElemt=<>
        {componentList.map(e=>{
        return <div key={e.fe_id} className={styles.componentWrapper}>
            {getComponent(e)}
        </div>
    })}
    </>

    return <PageWrapper title={title} desc={desc}>
            <form method="post" action="/api/answer">
                <input type="hidden" name="questionId" value={_id}/>
                    {componentListElemt}                
                <div className={styles.submitBtnContainer}>
                    {/* <input type="submit" value="提交"/> */}
                    <button type="submit">提交</button>
                </div>
            </form>
        </PageWrapper>
}

export async  function getServerSideProps(context:any) {
    // 从路由中提取出id
    const {id=''}=context.params

    // 利用id 异步获取数据...
    const data = await getQuestionById(id)
    // {errno,data,msg}

    return {
        props:data,
    }
}