/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform/transform.interceptor';
import { HttpExceptionFilter } from './http-exception/http-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 设置路由全局前缀
  app.setGlobalPrefix('api')

  // 设置全局拦截器
  // 将我们修改后的拦截器作为全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 设置全局过滤器
  // 将我们修改后的过滤器作为全局拦截器
  app.useGlobalFilters(new HttpExceptionFilter)

  // 跨域
  app.enableCors()

  // 设置端口
  await app.listen(3005); 
}
bootstrap();
