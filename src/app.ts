import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from "helmet"
import compression from 'compression';
import "dotenv/config"
import indexRoute from './routes';

const app = express();

// init middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(helmet())
app.use(compression())

// init db

// init routers
app.use("/", indexRoute)

// Handle error

app.use((req,res,next) => {
    const error = new Error("Not found") as any
    error.status = 404
    next(error)
})

app.use((error:any, req:Request, res:Response, next:NextFunction) => {
    const statusCode = error.status || 500;
    
    return res.status(statusCode).json({
        status: "Error",
        code: statusCode,
        message: error.message || "Internal server error"
    })

})


export default app;