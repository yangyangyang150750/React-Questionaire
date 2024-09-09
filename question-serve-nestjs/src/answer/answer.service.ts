/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schema/answer.schema';
 
@Injectable()
export class AnswerService {
    // 依赖注入
    constructor(
        @InjectModel(Answer.name) private readonly answerModal 
    ){}

    // 定义创建答卷方法
    async create(answerInfo){
        // 判断是否有问卷id
        if (!answerInfo.questionId) {
            // 若没有
            return new HttpException('缺少问卷id',HttpStatus.BAD_REQUEST)
        }
        console.log('answerInfo',answerInfo);
        answerInfo.answerList=answerInfo.answerList.map(answer => {
            const{fe_id,value}=answer
            const valueArr=value.split(',')
            return {
                fe_id,
                value:valueArr
            }
        });
        console.log('answerInfo.answerList',answerInfo.answerList);
        
        console.log('new-answerInfo',answerInfo);
        const answer = new this.answerModal({
            questionId:answerInfo.questionId,
            answerList:answerInfo.answerList
        })
        console.log('answer',answer);
        return await answer.save()
    }

    // 定义获取答卷总数方法
    async count(questionId:string){
        if (!questionId) {
            return 0
        }
        return await this.answerModal.countDocuments({questionId})
    }

    // 定义查找所有数据的方法
    async findAll(questionId:string,opt:{page:number,pageSize:number}){
        if (!questionId) {
            return []
        }

        const {page=1,pageSize=10}=opt

        const list= await this.answerModal
        .find({questionId}) // 查找满足条件数据
        .skip((page-1)*pageSize) //分页
        .limit(pageSize)    // 每页展示个数
        .sort({_id:-1}) // 根据_id逆序排序

        return list
    }
}
