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
        router.get("/devices", (req, res) => {
            this._db.collection("devices").find().toArray((error, docs) => {
                assert.equal(null, error);

                let devices: string;
                devices = JSON.stringify(docs);

                res.send(devices);
            });
        });
    }

    private configRegisterDeviceRoute(router: express.Router): void {
        router.post("/deviceRegister", (req, res) => {
            let data = req.body;
            data.registerDate = Date.now();
            this._db.collection("devices").insertOne(data, (err, result) => {
                assert.equal(null, err);
                assert.equal(1, result.insertedCount);

                res.send("ok");
            });
        });
    }
}
