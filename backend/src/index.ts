import bodyParser from "body-parser";
import express, { Express } from "express";

import apiRouter from "./routes";
import serverConfig from "./config/serverConfig";
import errorHandler from "./utils/errorHandler";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.get('/ping', (req, res) => {
    return res.json({message: "Backend service is up and running!"});
});

// kept the error handling middleware at the end, so if anything goes wrong then this will be called
app.use(errorHandler); 

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT ${serverConfig.PORT}`);
});