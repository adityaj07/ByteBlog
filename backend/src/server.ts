import "dotenv/config";
import mongoose from "mongoose";
import env from "../utils/validateEnv"
import app from "./app";

const port = env.PORT;


mongoose.connect(env.MONGO_URL).then(() => {
    console.log("Mongodb connected successully");
    app.listen(port, () => {
        console.log("Server started at port " + port)
    });
}).catch(console.error);

