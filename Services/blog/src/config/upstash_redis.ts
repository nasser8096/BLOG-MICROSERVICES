
import { Redis } from "@upstash/redis";
import "dotenv/config";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL!;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN!;

if (!redisUrl || !redisToken) {
  throw new Error("Upstash Redis credentials missing in .env");
}

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

console.log("✅ Connected to Upstash Redis via HTTP.");

export default redis;








// import { createClient } from "redis";
// import "dotenv/config";

// const redisUrl = process.env.UPSTASH_REDIS_URL;

// if (!redisUrl) {
//   throw new Error("Redis connection URL is not defined in your .env file.");
// }

// const redisClient = createClient({
//   url: redisUrl,
// });

// redisClient.on("error", (err) => {
//   console.error("Redis Client Error:", err);
// });

// export const connectRedis = async () => {
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//     console.log("✅ Connected to Redis via TCP.");
//   }
// };

// export default redisClient;


