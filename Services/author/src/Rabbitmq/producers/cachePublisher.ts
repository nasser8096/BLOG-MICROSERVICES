import { getChannel } from "../config/rabbitmq.js";

export const publishToQueue = async (queueName: string, message: any) => {
  const channel = getChannel();

  await channel.assertQueue(queueName, { durable: true });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

export const invalidateCacheJob = async (cacheKeys: string[]) => {
  const message = {
    action: "invalidateCache",
    keys: cacheKeys,
  };

  await publishToQueue("cache-invalidation", message);

  console.log("✅ Cache invalidation job published:", message);
};
