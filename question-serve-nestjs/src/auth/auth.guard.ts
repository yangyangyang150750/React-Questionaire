/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector:Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    // * * * * * 判断当前路由是否为Public * * * * * 
    // 判断当前是否为public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 若为public 
    // 则表明此路由为开放路由 此时无需验证token 
    if (isPublic) {
      return true;
    }
    
    // * * * * * 取出token * * * * * 
    // 获取request请求对象
    const request = context.switchToHttp().getRequest();
    // 从请求头中 获取token
    const token = this.extractTokenFromHeader(request);

    // * * * * * 判断token状态 * * * * * 
    // 判断本次请求是否有token
    if (!token) {
      // 若没有
      // => 抛出错误
      console.log('本次请求无token');
      throw new UnauthorizedException('未登录');
    }

    // 若本次请求携带了token
    try {
      // 根据本次请求携带的token 
      // 解析出用户信息
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      // 此处payload 即为userInfo
      request['user'] = payload;  
    } catch {
      throw new UnauthorizedException('Token无效');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // 将请求头的authorization属性值进行拆分
    // => 'Bearer' 'xxx'
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
