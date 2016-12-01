import * as express from "express";
import * as assert from "assert";

export class Router {

    constructor(private _db: any) {}

    public configRoutes(): express.Router {
        let router = express.Router();

        this.configGetDevicesRoute(router);
        this.configGetReadingsRoute(router);

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

    private configDeleteDeviceRoute(router: express.Router): void {
        router.delete("/deviceDelete/:deviceId", (req, res) => {
            let id: string = req.params.deviceId;
            let query: string = "{_id:ObjectId('" + id + "')}";
            this._db.collection("devices").deleteOne(query, (err, result) => {
                assert.equal(null, err);
                assert.equal(1, result.deletedCount);

                res.send("ok");
            });
        });
    }

    private configGetReadingsRoute(router: express.Router): void {
        router.get("/readings", (req, res) => {
            this._db.collection("devices").find().toArray((e, devs) => {
                assert.equal(null, e);
               this._db.collection("readings").find().toArray((err, docs) => {
                    assert.equal(null, err);

                    docs.forEach(read => {
                        devs.forEach(doc => {
                            if (doc.tag === read.tag) {
                                read.device = doc.device;
                                read.imageUrl = doc.imageUrl;
                            }
                        });
                    });

                    let readings: string;
                    readings = JSON.stringify(docs);
                    res.send(readings);
                }); 
            });
        });
    }
}
