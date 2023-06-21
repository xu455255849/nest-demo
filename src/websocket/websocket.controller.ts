import { Controller, Get } from '@nestjs/common';

@Controller('websocket')
export class WebsocketController {
  @Get('websocket')
  getWebSocket(): string {
    return 'WebSocket endpoint';
  }
}
