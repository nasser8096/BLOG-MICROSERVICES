import express from "express"
import dotenv from "dotenv"
import { sql } from "./Config/db.js";
import blogRoutes from "./routes/blog.js"
import { connectRabbitMQ } from "./Rabbitmq/config/rabbitmq.js";
import cors from "cors";


dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1" , blogRoutes);

app.get("/", (req,res)=>{
    res.send("Author Api Service Is Working")
})

const port = process.env.PORT;


async function initDB(){
    try{
        await sql`
        CREATE TABLE IF NOT EXISTS blogs(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        blogcontent TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS comments(
        id SERIAL PRIMARY KEY,
        comment VARCHAR(255) NOT NULL,
        userid VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        blogid VARCHAR(255) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS savedblogs(
        id SERIAL PRIMARY KEY,
        userid VARCHAR(255) NOT NULL,
        blogid VARCHAR(255) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        console.log("Database intilized successfully");
    }
    catch(error){
           console.log(error);
    }
}

(async () => {
    await connectRabbitMQ();   
  })();

initDB().then(()=>{
    app.listen(port , ()=>{
        console.log(`Server is running on http://localhost:${port}`)
    });
});

