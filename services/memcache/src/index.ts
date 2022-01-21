import { Environment } from 'recipiece-common';
import { memcacheApp } from './app';

memcacheApp.listen(Environment.MEMCACHE_SERIVCE_PORT, () => {
  console.log(`Memcache listening on port ${Environment.MEMCACHE_SERIVCE_PORT}`);
});
