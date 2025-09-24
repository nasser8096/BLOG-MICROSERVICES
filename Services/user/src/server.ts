import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.js"
import { startGrpcServer } from "./Grpc/server/userserver.js";
import cors from "cors";

dotenv.config();

const app = express();

app.get("/",(req , res)=>{
    res.send("User Service Api Is Working")
});

app.use(express.json());

app.use(cors());

app.use("/api/v1", userRoutes);


const port = process.env.PORT ;

app.listen(port,()=>{
    connectDB();
    console.log(`Server is Listening On ${port}`);
});

// start gRPC server in parallel
startGrpcServer();