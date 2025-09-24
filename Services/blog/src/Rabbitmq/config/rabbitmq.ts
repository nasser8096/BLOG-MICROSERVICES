import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: "localhost",
      port: 5672,
      username: "admin",
      password: "admin123",
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


