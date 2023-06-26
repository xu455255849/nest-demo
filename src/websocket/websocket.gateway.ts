import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(12345, { transports: ['websocket'] })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // 当客户端连接时触发
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // 当客户端断开连接时触发
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    // 处理客户端发送的消息
    console.log('Received message:', payload);
    // 发送消息给客户端
    this.server.emit('message', 'Server received your message');
  }
}
