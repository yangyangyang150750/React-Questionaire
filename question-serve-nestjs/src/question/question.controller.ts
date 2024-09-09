/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query,Request } from '@nestjs/common';
import { QuestionDto } from 'src/question/dto/question.dto';
// 引入question的相关方法
import { QuestionService } from './question.service';
import { Public } from 'src/auth/decorators/public.decorator';

// controller文件
// 用于定义路由
@Controller('question')
export class QuestionController {
    // 构造器
    constructor(
        // 为了获取question的相关方法
        // 依赖注入：
        // 将questionService注入到QuestionController中
        // 从而 可以获取到操作question的相关方法
        private readonly questionService:QuestionService
    ){}

    // 模拟返回问卷数据的路由
    // @Get 表明这是get请求
    @Get()
    async findAll(
        // 处理query
        @Query('keyword') keyword:string,
        @Query('page') page:number,
        @Query('pageSize') pageSize:number,
        @Query('isStar') isStar:boolean=false ,
        @Query('isDeleted') isDeleted:boolean=false,
        @Request() req
    ){
        // 解构
        const {username} = req.user

        // 获取符合条件的问卷数据列表
        const list =await this.questionService.findAllList({
            keyword,
            page,
            pageSize,
            isStar,
            isDeleted,
            author:username
        })

        // 获取当前问卷列表总数
        const count =await this.questionService.countAll({
            keyword,
            isStar,
            isDeleted,
            author:username})
        return {
            list,
            count,
        }
    }

    // 定义创建数据的路由
    @Post()
    create(@Request() req){
        // 解构出用户名
        const {username} = req.user
        return this.questionService.create(username)
    }

    // 定义获取某一问卷路由
    @Public()
    @Get(':id')
    findOne(
        //处理param
        @Param('id') id:string,
    ){
        return this.questionService.findOne(id)
    }

    // 定义更新某一问卷的路由
    @Patch(':id')
    updateOne(
        @Param('id') id:string,
        // 获取body
        @Body() questionDto:QuestionDto,
        @Request() req    
    ){
        // 解构
        const {username}=req.user
        return this.questionService.update(id,questionDto,username)
    }

    // 定义删除某一数据的路由
    @Delete(':id')
    deleteOne(
        @Param('id') id:string,
        @Request() req    
    ){
        // 解构
        const {username}=req.user
        return this.questionService.delete(id,username)
    }

    // 定义删除多个数据的路由
    @Delete()
    deleteMany(
        @Body() body,
        @Request() req
    ){
        // 解构
        const {username} = req.user
        const {ids=[]}=body
        return this.questionService.deleteMany(ids,username)
    }

    // 定义复制单个问卷的方法
    @Post('duplicate/:id')
    duplicate(
        @Param('id') id:string,
        @Request() req
    ){
        // 获取当前用户名
        const {username }= req.user
        // 调用方法
        return this.questionService.duplicate(id,username)
    }


    

    @Get('test')
    getText():string{
      // 模拟错误请求
      throw new HttpException('获取数据失败',HttpStatus.BAD_REQUEST)
    }
}
