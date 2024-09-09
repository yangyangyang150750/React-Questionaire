/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatService } from './stat.service';

@Controller('stat')
export class StatController {
    constructor(
        private readonly statService:StatService
    ){}

    // 获取单个问卷的统计信息
    @Get(':questionId')
    async getQuestionStat(
        @Param('questionId') questionId:string,
        @Query('page')  page:number=1,
        @Query('pageSize')  pageSize:number=10,
    ){
        return await this.statService.getQuestionStatListAndCount(questionId,{page,pageSize})
    }

    // 获取单个问卷某个组件的的统计信息
    @Get(':questionId/:componentId')
    async getComponentStat(
        @Param('questionId') questionId:string,
        @Param('componentId') componentId:string,
    ){
        const stat= await this.statService.getComponentStat(questionId,componentId)
        return{
            stat,
        }
    }
}
