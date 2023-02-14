import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Producer} from "@nestjs/microservices/external/kafka.interface";
import {Inject, OnModuleInit} from "@nestjs/common";
import {ClientKafka} from "@nestjs/microservices";
import {Socket, Server} from "socket.io"

@WebSocketGateway({cors:true})
export class RoutesGateway implements OnModuleInit {
  private kafkaProducer:Producer;

  @WebSocketServer()
  server: Server;
  constructor(
      @Inject('KAFKA_SERVICE')
      private kafkaClient: ClientKafka,
  ){}
  async onModuleInit(){
    this.kafkaProducer = await this.kafkaClient.connect();
  }
  @SubscribeMessage('new-direction')
  handleMessage(client: Socket, payload: { routeId: string }) {
    this.kafkaProducer.send({
      topic: 'route.new-direction',
      messages: [
          {
          key: 'route.new-direction',
          value: JSON.stringify({
            routeId: payload.routeId,
            clientId: client.id
          }),
        },
      ],
    })
    console.log(payload, client.id);
  }

  async sendPosition(data: {
    clientId: string;
    routeId: string;
    position: [number, number];
    finished: boolean;
  }) {
    if(data === undefined) {
      console.error(
          'Data not received, please check producer',
      );
      return;
    }

    const { clientId, ...rest } = data;

    const sockets = await this.server.sockets.in(clientId).fetchSockets();

    if (!sockets.length) {
      console.error(
          'Client not exists, refresh React Application and resend new direction again.',
      );
      return;
    }

    this.server.sockets.in(clientId).emit('new-position', rest);
  }

}
