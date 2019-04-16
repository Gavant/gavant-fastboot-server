const express = require('express');
const path = require('path');

class Router {
    constructor (app, middleware, distPath) {
        this.app = app;
        this.middleware = middleware;
        this.distPath = distPath;
        this.router = express.Router();
    }

    buildRoutes () {
        const router = this.router;
        const distPath = this.distPath;
        router.get("*", this.middleware);

        //All paths above this get rendered in fastboot. Then as a fallback we serve up the index.html file.
        router.get("*", function(req, res) {
            res.sendFile(path.join(__dirname, distPath, '/index-configured.html'));
        });

        this.app.use("/", router);
    }
}

module.exports = Router;
