import { getChannel } from "../config/rabbitmq.js";
import redis from "../../config/upstash_redis.js";
import { sql } from "../../config/db.js";

interface CacheInvalidationMessage {
  action: string;
  keys: string[];
}

export const startCacheConsumer = async () => {
  const channel = getChannel();

  const queueName = "cache-invalidation";

  await channel.assertQueue(queueName, { durable: true });

  console.log("👂 Blog service is listening for cache invalidation...");

  channel.consume(queueName, async (msg) => {
    if (!msg) return;

    try {
      const content = JSON.parse(msg.content.toString()) as CacheInvalidationMessage;

      console.log("📩 Received cache invalidation message:", content);

      if (content.action === "invalidateCache") {
        for (const pattern of content.keys) {
          const keys = await redis.keys(pattern);

          if (keys.length > 0) {
            await redis.del(...keys);
            console.log(`🗑️ Invalidated ${keys.length} cache keys for pattern: ${pattern}`);

            // 🔄 Optionally rebuild cache (example: latest blogs)
            const category = "";
            const searchQuery = "";
            const cacheKey = `blogs:${searchQuery}:${category}`;

            const blogs = await sql`SELECT * FROM blogs ORDER BY create_at DESC`;

            await redis.set(cacheKey, JSON.stringify(blogs), { ex: 3600 });

            console.log("🔄 Cache rebuilt with key:", cacheKey);
          }
        }
      }

      channel.ack(msg);
    } catch (error) {
      console.error("❌ Error handling cache invalidation:", error);
      channel.nack(msg, false, true);
    }
  });
};
