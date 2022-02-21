import { Module } from '@nestjs/common';
import { PubsubService } from './services/pubsub/pubsub.service';
import { MemcacheService } from './services/memcache/memcache.service';

@Module({
  controllers: [],
  providers: [PubsubService, MemcacheService],
  exports: [PubsubService, MemcacheService],
})
export class MemstoreModule {}
