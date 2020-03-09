# DEPRECATED: gavant-fastboot-server

**This project has been deprecated.**

Creates and configures a FastBoot node.js server for the production enviroments of Gavant ember.js projects.

## Installation

```
yarn add @gavant/fastboot-server
```

(in your node server's directory)

## Usage

Create a main entry point file for the server, e.g. `server.js`, with:

```
const server = require('@gavant/fastboot-server')({
    appName: process.env.appName,
    distPath: process.env.distPath,
    envPath: process.env.envPath,
    configPath: process.env.CLIENT_CONFIG_PATH
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

## .NET Usage

Create a main entry point file to start the node server service, e.g. `service.js`, with:

```
const service = require('@gavant/fastboot-server/service')({
    distPath: process.env.distPath,
    applyConfig: false
});
```

Create a file to modify/override the app config, e.g. `apply-config.js`, with:

```
const applyConfig = require('@gavant/fastboot-server/runtime-config')({
    appName: process.env.appName,
    distPath: process.env.distPath,
    envPath: process.env.envPath,
    configPath: process.env.configPath
});
```

(`process.env` environment variables can be modified or replaced with hardcoded values as needed.)

In the node server's `package.json`, add:

```
"scripts": {
    "start": "node service.js",
    "applyConfig" "node apply-config.js"
}
```

To run, from a command line, exexcute the following commands, in order:

```
$ npm run applyConfig
$ npn run start
```
