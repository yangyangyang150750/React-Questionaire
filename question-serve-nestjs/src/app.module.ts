/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
// 引入mongo数据库相关模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入配置模块
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AnswerModule } from './answer/answer.module';
import { StatModule } from './stat/stat.module';

@Module({
  // 引入其他模块
  imports: [
    // 配置模块
    // 用于将配置抽离
    ConfigModule.forRoot(),

    // mongo数据库模块
    // --配置抽离前
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestdb'),
    // --配置抽离后
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`),
    
    // 问卷模块
    QuestionModule,
    
    UserModule,
    
    AuthModule,
    
    AnswerModule,
    
    StatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
