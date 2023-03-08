import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExcludeNullInterceptor, ResponseInterceptor } from './common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(compression());
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
