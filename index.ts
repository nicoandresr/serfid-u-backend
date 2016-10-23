import * as express from "express";
import * as assert from "assert";
import * as mongodb from "mongodb";

module Serfid {
    export class Server {
        static consoleLogStartMsg: string = "App listening on port: ";
        private _app: express.Application;
        private _uriMongo: string = "mongodb://nico:'S3rf1d'@ds061246.mlab.com:61246/serfid-db";

        constructor(port: number){
                this._app = express();
                this.configureExpressServer(port);
        }

        private configureExpressServer(port: number):void {
                this._app.get("/", (req, res) => { res.send("hola mundo") });
                this._app.listen(port, () => { console.log(Server.consoleLogStartMsg + port) });
        }
    }
}

new Serfid.Server(7000);
