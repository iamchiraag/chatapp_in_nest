import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket,Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
  

  @WebSocketServer() wss:Server;

  private Logger:Logger = new Logger('AppGateway');

  afterInit(Server: Server) {
    this.Logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.Logger.log(`Client Disconnect:${client.id}`)
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.Logger.log(`Client Connected:${client.id}`)
  }
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    // client.emit('msgtoClient',text)
    this.wss.emit('msgToClient', text);
    // return {event: 'msgtoClient',data :text};
  }
}

