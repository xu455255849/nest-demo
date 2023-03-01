import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 全局中间件
  // app.use(logger)
  await app.listen(3000);
}
bootstrap();
