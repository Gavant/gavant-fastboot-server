gavant-fastboot-server
==============================================================================
Creates and configures a FastBoot node.js server for the production enviroments of Gavant ember.js projects.

Installation
------------------------------------------------------------------------------
```
yarn add @gavant/fastboot-server
```
(in your node server's directory)

Usage
------------------------------------------------------------------------------
Create a main entry point file for the server, e.g. `server.js`, with:
```
const server = require('gavant-fastboot-server')({
    appName: process.env.appName,
    distPath: process.env.distPath,
    envPath: process.env.envPath
});
server.start();
```

In the node server's `package.json`, add:
```
"scripts": {
    "start": "appName='{EMBER_APP_DIR}' distPath='../../../{EMBER_APP_DIR}/dist' envPath='{EMBER_APP_DIR}/config/environment' node server.js"
}
```
Replacing `{EMBER_APP_DIR}` with the actual ember.js application directory name. (`distPath` is relative to this package's index.js file)
