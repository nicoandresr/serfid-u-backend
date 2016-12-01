import * as express from "express";
import * as assert from "assert";
import * as mongodb from "mongodb";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Router } from "./Infrastructure/router";

export class SerfidServer {

    private _startMsg: string = "App listening on port: ";
    private _uriMongo: string = "mongodb://localhost:27017/serfid-db";
    private _app: express.Application;
    private _port: number;
    private _router: express.Router;

    constructor(port: number) {
        this._port = port;
        this._startMsg += port;
        this._app = express();

        this.enableCors();
        this.startSerfidServer();
    }

    private enableCors(): void {
        let options = { 
            origin: "http://localhost:3000" };
        this._app.use(cors(options));
    }

    private startSerfidServer(): void {
        mongodb.MongoClient.connect(this._uriMongo, (error, db) => {
            assert.equal(null, error);
            let serfidRouter = new Router(db);
            this._router = serfidRouter.configRoutes();
            this.configureExpressServer();
        });
    }


    private configureExpressServer(): void {
        
        let jsonParser = bodyParser.json();

        this._app.use(jsonParser);
        this._app.use("/", this._router);
        this._app.listen(this._port, () => { console.log(this._startMsg) });
    }
}

new SerfidServer(process.env.PORT || 7000);
