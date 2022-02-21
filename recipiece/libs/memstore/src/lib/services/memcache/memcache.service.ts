import { Injectable } from '@nestjs/common';
import { Environment, EnvironmentSniffer, Utils } from '@recipiece/common';
import Cryo from 'cryo';
import {createClient, RedisClientType} from 'redis';

@Injectable()
export class MemcacheService {
  private readonly client: RedisClientType<any, any>;
  private connected: boolean;

  constructor() {
    EnvironmentSniffer.load();
    this.client = createClient({
      socket: {
        host: Environment.MEMCACHE_HOST,
        port: Environment.MEMCACHE_PORT,
      },
    });
    this.connected = false;
  }

  public async mgetset<T>(key: string, fetcher: () => Promise<T>, expiry: number = undefined): Promise<T> {
    await this.connect();
    const memKey = this.getNsKey(key);
    if (!(await this.mhas(memKey))) {
      await this.mset(memKey, await fetcher(), expiry);
    }
    return await this.mget(memKey);
  }

  public async mget<T>(key: string): Promise<T | undefined> {
    await this.connect();
    const retrieved = await this.client.get(this.getNsKey(key));
    if (retrieved) {
      return Cryo.parse(retrieved);
    } else {
      return undefined;
    }
  }

  public async mset<T>(key: string, entity: T, expiry = Environment.MEMCACHE_EXP) {
    await this.connect();
    const nsKey = this.getNsKey(key);
    const serialized = Cryo.stringify(entity);
    if (Utils.nou(expiry)) {
      await this.client.set(nsKey, serialized);
    } else {
      await this.client.setEx(nsKey, expiry, serialized);
    }
  }

  public async mhas(key: string): Promise<boolean> {
    await this.connect();
    const nsKey = this.getNsKey(key);
    return (await this.client.exists(nsKey)) !== 0;
  }

  public async mdelete(key: string) {
    await this.connect();
    const nsKey = this.getNsKey(key);
    await this.client.del(nsKey);
  }

  private async connect() {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
    }
  }

  private getNsKey(rawKey: string): string {
    return `rcp-mem:${rawKey}`;
  }
}
