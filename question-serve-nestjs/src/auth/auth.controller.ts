/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    // 依赖注入
    constructor(private readonly authService:AuthService){}

    // 配置登录路由
    // 设置其为public 无需解析token 
    @Public()  
    @Post('login')
    async login(@Body() userInfo:CreateUserDto){
        // 解构
        const {username,password} = userInfo
        
        return await this.authService.signIn(username,password)
    }

    // 配置获取用户信息路由
    // 使用Guard 用于解析token 
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req){
        return req.user
    }
}
