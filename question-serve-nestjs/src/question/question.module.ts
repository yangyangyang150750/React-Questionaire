/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
// 引入question的schema模块
import { Question, QuestionSchema } from '../schemas/question.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // 导入question的schema模块
  imports: [
    MongooseModule.forFeature([
    {name: Question.name, schema: QuestionSchema }
  ])
],
  exports: [QuestionService],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
