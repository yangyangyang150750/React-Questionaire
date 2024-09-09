/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

// 定义问卷相关数据 数据库格式
@Schema({
  timestamps:true // 记录时间戳
})
export class Question {
  @Prop({required:true})
  title: string;

  @Prop()
  desc: string;

  @Prop()
  author:string;

  @Prop()
  js:string;

  @Prop()
  css:string;

  @Prop({default:false})
  isPublished:boolean;

  @Prop({default:false})
  isStar:boolean;

  @Prop({default:false})
  isDeleted:boolean;

  @Prop()
  componentList:{
    fe_id:string; //组件 fe_id 需要前端控制生成
    type:string;
    title:string;
    isHidden:boolean;
    isLocked:boolean;
    props:object
  }[]

}

export const QuestionSchema = SchemaFactory.createForClass(Question);