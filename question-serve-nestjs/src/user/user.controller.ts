/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Post, Redirect } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
    // 依赖注入
    constructor(private readonly userService:UserService){}

    // ---定义创建用户的路由
    // 标记其为开放
    @Public()
    @Post('register')
    async register(@Body() userDot:CreateUserDto){
        try {
            return this.userService.create(userDot)
        } catch (err) {
            // 抛出错误
            return new HttpException(err,HttpStatus.BAD_REQUEST)
        }
    }

    // 定义获取用户信息路由
    @Get('info')
    // 因为此处需要验证token 所以需要进行重定向
    // http状态码 Get请求 
    // 301表示永久重定向 302表示临时重定向
    @Redirect('/api/auth/profile',302)
    async info(){
        return ;
    }

    // ---定义用户登录路由
    // 标记其为开放
    @Public()
    @Post('login')
    // 重定向
    // http状态码 Post请求 
    // 308表示永久重定向 307表示临时重定向
    @Redirect('/api/auth/login',307)
    async login(){
        return;
    }
}
