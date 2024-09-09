/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
// 定义操作用户数据相关方法
export class UserService{
    // 依赖注入
    constructor(@InjectModel(User.name) private readonly userModal){}

    // 定义注册用户方法
    async create(userData:CreateUserDto){
        // 获取创建的用户
        const createdUser = new this.userModal(userData)
        return await createdUser.save()
    }

    // 定义登录用户方法
    async findOne(username:string,password:string){
        return await this.userModal.findOne({username,password})
    }
}
