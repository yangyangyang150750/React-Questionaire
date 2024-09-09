/* eslint-disable prettier/prettier */
import { Controller, Get, } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 可以在controller中定义路由
  @Public()
  @Get('test')
  getText():string{
    // 模拟错误请求
    // throw new HttpException('获取数据失败',HttpStatus.BAD_REQUEST)
    return 'test'
  }
}
