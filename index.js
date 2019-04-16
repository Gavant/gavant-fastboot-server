const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');
const ExpressServer = require('./express-server');
const applyRuntimeConfig = require('./runtime-config');

module.exports = function(options) {
    const distPath = options.distPath;
    const debounceDelay = options.debounceDelay || 250;
    const workerCount = options.workerCount || 1;

    applyRuntimeConfig(options.appName, distPath, options.envPath);

    const notifier = new FastBootWatchNotifier({
        debounceDelay,
        distPath,
        saneOptions: {
            poll: true
        }
    });

    const httpServer = new ExpressServer({
        distPath: distPath,
        gzip: true
    });

    const server = new FastBootAppServer({
        notifier: notifier,
        httpServer: httpServer,
        distPath: distPath,
        workerCount: workerCount
    });

    return server;
};
