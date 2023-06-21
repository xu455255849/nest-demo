import { Module } from '@nestjs/common';
import { WebsocketController } from './websocket.controller';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  providers: [WebsocketGateway],
  controllers: [WebsocketController],
})
export class WebsocketModule {}
