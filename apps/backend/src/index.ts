import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import config from "./config";
import morganConfig from "./configuration/morgan";
import corsConfig from "./configuration/cors";
import helmetConfig from "./configuration/helmet";
import path from "path";

const sendIndexHtml = (req: Request, res: Response, status: number = 200) => {
    const directoryToBuild = path.join(__dirname.substring(0, __dirname.length - 4), 'build', 'index.html');
    res.status(status)
    res.sendFile(directoryToBuild);
};

const createServer = async () => {

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(morganConfig());
    app.use(corsConfig());
    app.use(helmetConfig());
    app.use(cookieParser());
    // app.use(errorHandler);

    app.use("/sitemap.xml", async function (req, res, next) {
        express.static("build/sitemap.xml")(req, res, next)
    });

    // Configures SSR for react public and private applications
    const publicRoutes = express.static("build/static");

    app.use("/static", async function (req, res, next) {
            publicRoutes(req, res, next)

    });
    // app.use('*', toAppRouter);
    app.get("/", (req, res) => sendIndexHtml(req, res));
    app.get("/{*splat}", (req, res) => sendIndexHtml(req, res, 404));


    // Allows the app to accept network requests.
    app.listen(config.PORT, () => console.log(`Listening on http://localhost:${config.PORT}`));
};

createServer();
