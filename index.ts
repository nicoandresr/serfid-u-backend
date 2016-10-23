import * as express from "express";

module Serfid {
    export class Server {
        private _consoleLogStartMsg: string = "App listening on port: ";

        constructor(port: number){
            console.log(this._consoleLogStartMsg + port);
        }
    }
}

new Serfid.Server(7000);
