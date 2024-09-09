// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { postAnswer } from "@/services/answer";
import type { NextApiRequest, NextApiResponse } from "next";

// 改造数据
function genAnswerInfo(reqBody:{[key:string]:any}) {
    console.log('reqBody',reqBody);
    
    const answerList:any[]=[]

    Object.keys(reqBody).forEach(key => {
        if (key==='questionId') {
            return
        }
            answerList.push({
            fe_id:key,
            value:reqBody[key]})
    });

    return {
        questionId:reqBody.questionId,
        answerList,
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    // 判断请求是否为post
    if (req.method!=='POST') {
        // 若不是post请求
        // 返回错误信息
        return res.status(200).json({
            errno:-1,
            msg:'Method 错误'
        })
    }


    // 将提交的表单数据 进行改造
    // 方便后端处理
    const answerInfo =  genAnswerInfo(req.body)
    console.log('改造后的数据',answerInfo);
    try {
        // 提交数据至mock
        const resData = await postAnswer(answerInfo)

        
        // 判断提交状态
        if (resData.errno==0) {
            // 提交成功
            // 重定向
            res.redirect('/success')
        }else{
            // 提交失败
            // 重定向
            res.redirect('/fail')
        }
    } catch (error) {
        // 重定向
        res.redirect('/fail')
    }
}
