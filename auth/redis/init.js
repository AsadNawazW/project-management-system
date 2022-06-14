import { createClient } from 'redis';

export default async function initRedis() {
  const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
  const client = createClient({
    url: redisUrl,
  });
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
}
