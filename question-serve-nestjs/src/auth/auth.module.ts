/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[
    // 引入用户模块
    UserModule,
    // 引入JWT模块
    JwtModule.register({
      // 全局应用
      global: true,
      secret: jwtConstants.secret,
      signOptions: { 
        // 过期时间
        expiresIn: '1d' 
      },
    })],
  providers: [
    AuthService,
    // 用于实现全局JWT校验的配置
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
  controllers: [AuthController]
})
export class AuthModule {}
