import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExcludeNullInterceptor, ResponseInterceptor } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new ResponseInterceptor(),
  );
  // 全局中间件
  // app.use(logger)
  await app.listen(3000);
}
bootstrap();
