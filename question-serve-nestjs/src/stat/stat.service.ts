/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionService } from 'src/question/question.service';


@Injectable()
export class StatService {
    // 依赖注入
    constructor(
        private readonly questionService:QuestionService,
        private readonly answerService:AnswerService,
    ){}

    private _getRadioOptText(value,props:any={}){
        const {options=[]}=props
        const length = options.length

        for (let i = 0; i < length; i++) {
            const item=options[i]
            if (value=item.value) {
                return item.text
                break;
            }            
        }

        return ''
    }

    private _getCheckboxOptText(value,props:any={}){
        const {list=[]}=props
        const length = list.length

        for (let i = 0; i < length; i++) {
            const item=list[i]
            if (value=item.value) {
                return item.text
                break;
            }            
        }

        return ''
    }

    /*
    * 生成答卷信息格式 : {componentId1:value1,componentId2:value2}
    */
    private _getAnswerInfo(question,answerList=[]){
        const res={}
        const {componentList=[]} = question

        answerList.forEach(a=>{
            const {fe_id,value=[]}=a

            // 获取组件信息
            const comp=componentList.filter(c=>c.fe_id===fe_id)
            const {type,props={}}=comp
            
            if (type==='questionRadio') {
                // 单选
                res[fe_id]=value.map(v=>{
                    this._getRadioOptText(v,props).toString()
                })
            }else if(type==='questionCheckbox'){
                // 多选
                res[fe_id]=value.map(v=>{
                    this._getCheckboxOptText(v,props).toString()
                })
            }else{
                // 其他
                res[fe_id]=value.toString()
            }
        })
        return res
    }

    // 获取单个问卷的答卷列表数据和总数
    async getQuestionStatListAndCount(
        questionId:string,
        opt:{page:number,pageSize:number}
    ){
        console.log('');
        
        console.log('questionId',questionId);
        console.log('opt',opt);
        
        const noData={list:[],count:0}
        if (!questionId) {
            return noData
        }

        const q = await this.questionService.findOne(questionId)
        if (q==null) {
            return noData
        }

        const total = await this.answerService.count(questionId)
        console.log('total ',total );
        
        if (total==0) {
            return noData
        }

        const answers=await this.answerService.findAll(questionId,opt)

        const list=answers.map(a=>{
            return{
                _id:a._id,
                ...this._getAnswerInfo(q,a.answerList)
            }
        })

        return{
            list,
            total
        }
    }

    // 获取单个组件的统计数据
    async getComponentStat(questionId:string,fe_id:string){
        if (!questionId||!fe_id) {
            return []
        }

        // 获取问卷
        const q = await this.questionService.findOne(questionId)
        if (q==null) {
            return []
        }

        // 获取组件
        const {componentList=[]}=q
        const comp = componentList.filter(c=>c.fe_id===fe_id)[0]
        if (comp==null) {
            return []
        }

        // 
        const {type,props}=comp
        if (type!=='questionRadio'&&type!=='questionCheckbox') {
            // 只统计单选和多选
            return []
        }

        // 获取答卷列表
        const total=await this.answerService.count(questionId)
        if (total==0) {
            return []
        }
        const answers = await this.answerService.findAll(questionId,{
            page:1,
            pageSize:total // 不分页
        })

        // 累加各个value数字
        const countInfo={}
        answers.forEach(a=>{
            const {answerList=[]}=a
            answerList.forEach(a=>{
                if (a.fe_id!==fe_id) {
                    return
                }
                a.value.forEach(v=>{
                    if (countInfo[v]==null) {
                        countInfo[v]=0
                    }
                    // 累加
                    countInfo[v]++
                })
            })
        })

        // 整理数据
        const list=[]
        for (const val in countInfo) {
            // 根据val 求出text
            let text=''
            if (type=='questionRadio') {
                text=this._getRadioOptText(val,props)
            }
            if (type=='questionCheckbox') {
                text=this._getCheckboxOptText(val,props)
            }

            list.push({name:text,count:countInfo[val]})
        }

        
        return list
    }
}
