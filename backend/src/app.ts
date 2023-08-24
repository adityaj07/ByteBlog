import "dotenv/config";
import express, { NextFunction, Request, Response } from "express"; 
import cors from "cors";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "../utils/validateEnv";
import authRouter from "./routes/auth";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(session({
    secret: env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_URL,
    }),
}))

app.use("/auth", authRouter);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found!"));
});



// Central error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.statusCode;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;
