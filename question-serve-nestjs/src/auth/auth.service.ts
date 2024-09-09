/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // 依赖注入
    constructor(
        private readonly userService:UserService,
        private readonly jwtService: JwtService
    ){}

    // 定义登陆方法
    async signIn(username:string,password:string){
        // 获取当前对应的用户
        const user = await this.userService.findOne(username,password)

        // 判断是否存在
        if (!user) {
            throw new UnauthorizedException('用户名或密码错误')
        }

        // 不返回password信息
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password:p,...userInfo}=user.toObject()
        
        return {
            // 加密
            token:this.jwtService.sign(userInfo),
        };
    }
}
