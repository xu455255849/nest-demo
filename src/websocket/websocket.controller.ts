import { Controller, Get } from '@nestjs/common';

@Controller()
export class WebsocketController {
  @Get('websocket')
  getWebSocket(): string {
    return 'WebSocket endpoint';
  }
}
