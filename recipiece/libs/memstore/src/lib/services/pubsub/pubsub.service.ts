import { Injectable, Logger } from '@nestjs/common';
import { Environment, EnvironmentSniffer } from '@recipiece/common';
import { randomUUID } from 'crypto';
import NRP from 'node-redis-pubsub';
import { PubsubMessage } from './message';

@Injectable()
export class PubsubService {
  private readonly psClient: NRP.NodeRedisPubSub;
  private subscriptions: { [subId: string]: any };

  constructor() {
    EnvironmentSniffer.load();
    this.subscriptions = {};
    this.psClient = NRP({
      host: Environment.MEMCACHE_HOST,
      port: Environment.MEMCACHE_PORT,
    });
  }

  public send<T>(message: PubsubMessage, body?: T) {
    Logger.log(`Sending ${JSON.stringify(body)} to "${message}"`);
    this.psClient.emit(message, JSON.stringify(body));
  }

  public subscribe<T>(message: PubsubMessage, callback: (data: T, message: PubsubMessage) => void): string {
    const subId = randomUUID();
    const newSub = this.psClient.on(message, (d: string, c: string) => {
      callback(JSON.parse(d), c as PubsubMessage);
    });
    this.subscriptions[subId] = newSub;
    return subId;
  }

  public unsubscribe(subId?: string) {
    if (subId) {
      this.subscriptions[subId]();
    } else {
      Object.keys(this.subscriptions).forEach((k) => {
        this.subscriptions[k]();
      });
    }
  }
}
