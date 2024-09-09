/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
// 引入question类
import { Question } from 'src/schemas/question.schema';

// service文件 
// 用于操作数据 增删改查
@Injectable()
export class QuestionService {
    // 构造函数
    constructor(
        // 依赖注入
        @InjectModel(Question.name) private readonly questionModal,
    ){}

    // 定义创建数据方法
    async create(username:string){
        const question = new this.questionModal({
            title:'问卷标题'+Date.now(),
            desc:'问卷描述',
            author:username,
            componentList:[
                {
                    fe_id:nanoid(),
                    type:'questionInfo',
                    title:'问卷信息',
                    props:{
                        title:'问卷标题',
                        desc:'问卷描述...'
                    }
                }
            ]
        })
        return await question.save()
    }

    // 定义查找某一id对应数据的方法
    async findOne(id:string){
        return await this.questionModal.findById(id)
    }

    // 定义查找所有数据的方法
    async findAllList({keyword='',page=1,pageSize=10,isStar,isDeleted=false,author=''}){
        // 创建查询对象
        const whereOtp:any= {
            author,
            isDeleted
        }
        // 判断是否标星
        if (isStar) {
            whereOtp.isStar=isStar
        }
        // 判断是否有keyword
        if (keyword) {
            // 匹配
            const reg = new RegExp(keyword,'i')
            whereOtp.title={ $regex:reg }   // 模糊搜索
        }

        return await this.questionModal
        .find(whereOtp) // 查找满足条件数据
        .sort({_id:-1}) // 根据_id逆序排序
        .skip((page-1)*pageSize) //分页
        .limit(pageSize)    // 每页展示个数
    }

    // 定义删除某id对应数据方法
    async delete(id:string,author:string){
        // 根据传入的问卷id 以及 用户名删除对应问卷 
        const res = await this.questionModal.findOneAndDelete({
            _id:id,
            author,
        })
        return res
    }

    // 定义删除多条问卷的方法
    async deleteMany(ids:string[],author:string){
        const res = await this.questionModal.deleteMany({
            _id:{$in:ids},  //['aa','bb','cc'] 'aa'
            author,
        })
        return res
    }

    // 定义定义更新某id对应数据方法
    async update(id:string,updateData,author){
        return await this.questionModal.updateOne({
            _id:id,
            author
        },updateData)
    }

    // 获取数据总数的方法
    async countAll({keyword='',isStar=false,isDeleted=false,author=''}){
        // 创建空对象
        const whereOtp:any= {
            author,
            isDeleted
        }
        // 判断是否标星
        if (isStar) {
            whereOtp.isStar=isStar
        }
        // 判断是否有keyword
        if (keyword) {
            // 匹配
            const reg = new RegExp(keyword,'i')
            whereOtp.title={$regex:reg}   // 模糊搜索
        }

        return await this.questionModal.countDocuments(whereOtp)
    }

    // 定义复制问卷的方法
    async duplicate(id:string,author:string){
        // 根据id获取对应问卷
        const question =await this.questionModal.findById(id)
        
        // 根据当前问卷生成新问卷
        const newQuestion = new this.questionModal({
            // 解构当前问卷
            ...question.toObject(),

            // 更新_id
            // 生成一个新的mongodb的id
            _id :new mongoose.Types.ObjectId(),
            // 更新用户名
            author,
            // 更新title
            title:question.title+'-副本',
            // 更新标星标志
            isStar:false,
            // 更新发布状态
            isPublish:false,
            // 更新组件列表数据
            componentList:question.componentList.map(comp=>{
                return {
                    ...comp,
                    fe_id:nanoid(5),
                }
            })
        })

        return await newQuestion.save()
    }
}
