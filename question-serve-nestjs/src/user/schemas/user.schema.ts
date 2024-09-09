/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// 定义用户相关数据 数据库格式
@Schema({
    timestamps:true // 记录时间戳 createAt 和 updateAt
})
export class User {
  @Prop({required:true,unique:true})
  username: string;

  @Prop({required:true})
  password: number;

  @Prop()
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
