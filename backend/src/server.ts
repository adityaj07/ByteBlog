import env from "../utils/validateEnv"
import express from "express";

const server = express();
 const port = env.PORT;

server.get("/", (req, res)=> {
    res.send("Jai Shri Ram");
})

server.listen(port!, () => {
    console.log("Server Started at port " + port)
});