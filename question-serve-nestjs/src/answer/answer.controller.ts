/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('answer')
export class AnswerController {
    // 依赖注入
    // 注入操作答卷的相关方法
    constructor(private readonly answerService:AnswerService){}

    // 定义提交答卷路由
    @Public()
    @Post()
    async create(
        // body接收前端传入的答卷信息
        @Body() body
    ){
        console.log('body--',body);
        
        // 调用提交答卷方法
        return await this.answerService.create(body)
    }
}
