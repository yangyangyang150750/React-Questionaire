/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

// 定义用户相关数据 数据库格式
@Schema({
    timestamps:true // 记录时间戳 createAt 和 updateAt
})
export class Answer{
    // 设置当前答卷对应的问卷id
    @Prop({required:true})
    questionId: string;   

    // 设置答卷数据列表
    @Prop()
    answerList: {
        // 对应问卷组件的id
        fe_id:string,   
        // 对应问卷组件的值
        value:string
    }[]
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);