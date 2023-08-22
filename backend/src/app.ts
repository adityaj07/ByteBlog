import "dotenv/config";
import express, { NextFunction, Request, Response } from "express"; // Import Request and Response types
import cors from "cors";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found!"));
});


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
