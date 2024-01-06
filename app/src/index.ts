import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import config from "./config";
import morganConfig from "./configuration/morgan";
import corsConfig from "./configuration/cors";
import helmetConfig from "./configuration/helmet";
import path from "path";

const sendIndexHtml = (req: Request, res: Response, status: number = 200) => {
    const directoryToBuild = path.join(__dirname.substring(0, __dirname.length - 4), 'build', 'index.html');

    res.sendFile(directoryToBuild);
};

const createServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(morganConfig());
    app.use(corsConfig());
    app.use(helmetConfig());
    app.use(cookieParser());
    // app.use(errorHandler);

    // Configures SSR for react public and private applications
    const publicRoutes = express.static("build");

    app.use("/", async function (req, res, next) {
            publicRoutes(req, res, next)

    });
    // app.use('*', toAppRouter);
    app.get("/", (req, res) => sendIndexHtml(req, res));
    app.get("*", (req, res) => sendIndexHtml(req, res, 404));


    // Allows the app to accept network requests.
    app.listen(config.PORT, () => console.log(`Listening on http://localhost:${config.PORT}`));
};

createServer();
