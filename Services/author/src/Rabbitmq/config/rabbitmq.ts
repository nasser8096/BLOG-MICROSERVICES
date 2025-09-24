import amqp from "amqplib";
import dotenv from "dotenv"
dotenv.config();

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.Rabbimq_Host,
      port: 5672,
      username: process.env.Rabbimq_Username,
      password: process.env.Rabbimq_Password,
    });

    channel = await connection.createChannel();

    // Optional: Handle cleanup
    process.on('exit', () => connection.close());
    
    console.log("✅ Connected To RabbitMq");
  } catch (error) {
    console.error("❌ Not connected To Rabbitmq", error);
  }
};

export const getChannel = (): amqp.Channel => {  
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized. Call connectRabbitMQ() first.");
  }
  return channel;
};


