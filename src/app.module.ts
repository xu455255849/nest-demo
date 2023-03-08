import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './routes/cats/cats.module';
import { UploadModule } from './routes/upload/upload.module';
import { LoggerMiddleware } from './middleware/logger';
import configuration from './config/configuration';
import { TasksService } from './service/schedule';

@Module({
  imports: [
    CatsModule,
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
