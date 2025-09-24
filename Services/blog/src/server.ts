import express from "express";
import dotenv from "dotenv"
import blogRoutes from "./routes/blog.js"
import cors from "cors"
import redis from "./config/upstash_redis.js";
import { connectRabbitMQ } from "./Rabbitmq/config/rabbitmq.js";
import { startCacheConsumer } from "./Rabbitmq/consumers/cacheConsumer.js";

// import { connectRedis } from "./config/redis"/;

dotenv.config();

const app = express()

app.use(express.json());

app.use(cors());

app.use("/api/v1" , blogRoutes);

const port = process.env.PORT ;

// (async () => {
//     await connectRedis();  // 👈 connect Redis before starting server
  
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })();


const startServer = async () => {
    await connectRabbitMQ();
    await startCacheConsumer();
  
    app.listen(5002, () => console.log("🚀 Blog service running on port 5002"));
  };

  startServer();

