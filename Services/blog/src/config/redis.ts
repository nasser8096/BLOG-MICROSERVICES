
// import { createClient } from "redis";
// import "dotenv/config";

// const redisUrl = process.env.REDIS_URL;

// if (!redisUrl) {
//   throw new Error("❌ Redis connection URL is missing in .env");
// }

// const redisClient = createClient({
//   url: redisUrl,
// });

// redisClient.on("connect", () => {
//   console.log("✅ Redis Client Connected");
// });

// redisClient.on("ready", () => {
//   console.log("🚀 Redis is ready to use");
// });

// redisClient.on("error", (err) => {
//   console.error("❌ Redis Client Error:", err);
// });

// redisClient.on("end", () => {
//   console.log("⚠️ Redis Client Disconnected");
// });

// export const connectRedis = async () => {
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//   }
// };

// export default redisClient;
