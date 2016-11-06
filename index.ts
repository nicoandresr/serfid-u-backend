import * as express from "express";
import * as assert from "assert";
import * as mongodb from "mongodb";
import { Router } from "./Infrastructure/router";

export class SerfidServer {

    private _startMsg: string = "App listening on port: ";
    private _uriMongo: string = "mongodb://nico:'S3rf1d'@ds061246.mlab.com:61246/serfid-db";
    private _app: express.Application;
    private _port: number;
    private _router: express.Router;

    constructor(port: number) {
        this._port = port;
        this._startMsg += port;
        this._app = express();

        this.startSerfidServer();
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
        this._app.use("/", this._router);
        this._app.listen(this._port, () => { console.log(this._startMsg) });
    }
}

new SerfidServer(7000);
