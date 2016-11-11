import * as express from "express";
import * as assert from "assert";

export class Router {

    constructor(private _db: any) {}

    public configRoutes(): express.Router {
        let router = express.Router();

        this.configGetDevicesRoute(router);
        this.configRegisterDeviceRoute(router);

        return router;
    }

    private configGetDevicesRoute(router: express.Router): void {
        this._db.collection("devices").find().toArray((error, docs) => {
            assert.equal(null, error);

            let devices: string;
            devices = JSON.stringify(docs);

            router.get("/devices", (req, res) => {
                res.send(devices);
            });
        });
    }

    private configRegisterDeviceRoute(router: express.Router): void {
        router.post("/deviceRegister", (req, res) => {
            console.log(req.body);
            res.send("ok");
        });
    }
}
