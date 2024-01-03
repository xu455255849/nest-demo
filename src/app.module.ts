import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CatsModule } from './routes/cats/cats.module';
import { UploadModule } from './routes/upload/upload.module';
import { LoggerMiddleware } from './middleware/logger';
import configuration from './config/configuration';
import { TasksService } from './service/schedule';
import { WebsocketModule } from './websocket/websocket.module';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [
    // CatsModule,
    UploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, WebsocketGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
