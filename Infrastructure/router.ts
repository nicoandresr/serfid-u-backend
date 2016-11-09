import * as express from "express";
import * as assert from "assert";

export class Router {

    constructor(private _db: any) {}

    public configRoutes(): express.Router {
        let router = express.Router();

        this._db.collection("devices").find().toArray((error, docs) => {
            assert.equal(null, error);

            let devices: string;
            devices = JSON.stringify(docs);

            router.get("/devices", (req, res) => {
                res.send(devices);
            });
        });

        return router;
    }
}
