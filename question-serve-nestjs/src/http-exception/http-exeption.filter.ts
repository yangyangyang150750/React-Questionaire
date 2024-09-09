/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message=exception.message?exception.message:'服务器错误！';
    
    // 定义错误信息格式
    response.status(status).json({
        errno:-1,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}