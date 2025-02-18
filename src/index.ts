import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose"
import userRouter from "./routes/userRoute"
import morgan from "morgan"
import { fdatasyncSync } from "fs"
import { Error } from './types/types';
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin:process.env.CLIENT_SIDE_URI,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true // Allow cookies and authentication headers
}))
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
// mongose database connect
mongoose.connect(process.env.MONGO_URI || '',{})
.then(()=> console.log('mongodb is connected'))
.catch((err)=>console.log('failed to connect mongodb',err))

app.use("/api",userRouter)



// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: err.message || 'Internal server error' 
    });
  });

app.listen(PORT,()=>{
    console.log(`surver is running PORT ${PORT}`)
}) 