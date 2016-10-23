import * as express from "express";
import * as assert from "assert";
import * as mongodb from "mongodb";

module Serfid {
    export class Server {
        static consoleLogStartMsg: string = "App listening on port: ";
        private _app: express.Application;
        private _uriMongo: string = "mongodb://user:pass@ds061246.mlab.com:61246/serfid-db";
        private _port: number;

        constructor(port: number) {
            this._port = port;
            this._app = express();
            mongodb.MongoClient.connect(this._uriMongo, (error, db) => {
                assert.equal(null, error);
                this.mongoConnectHandler(db);
            });
        }

        private mongoConnectHandler(db: any): void {
            db.collection("devices").find().toArray((error, docs) => {
                assert.equal(null, error);
                let devices: string;
                devices = JSON.stringify(docs);
                this.configureExpressServer(devices);
            });
        }

        private configureExpressServer(devices: string):void {
                this._app.get("/", (req, res) => { res.send(devices) });
                this._app.listen(this._port, () => { console.log(Server.consoleLogStartMsg + this._port) });
        }
    }
}

new Serfid.Server(7000);
