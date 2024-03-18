import { env } from "@/config";
import { Channel, Connection, connect } from "amqplib";

class RabbitMQServer {
  private connection: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  public async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  public async publish(queue: string, content: string) {
    return this.channel.sendToQueue(queue, Buffer.from(content));
  }

  public async consume(queue: string, callback: (message: string) => void) {
    return this.channel.consume(queue, message => {
      if (!message) return;
      callback(message.content.toString());
      this.channel.ack(message);
    });
  }
}

export const rabbitMQServer = new RabbitMQServer(env.RABBITMQ_URI);
