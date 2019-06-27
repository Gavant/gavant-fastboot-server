process.chdir(__dirname);

var service = require('os-service');
var fs = require('fs');

function usage() {
    console.log('usage: node server --add <name> [username] [password]');
    console.log('       node server --remove <name>');
    console.log('       node server --run');
    process.exit(-1);
}

module.exports = function(options) {
    if (process.argv[2] == '--add' && process.argv.length >= 4) {
        var options = {
            programArgs: ['--run', 'me']
        };

        if (process.argv.length > 4) options.username = process.argv[4];

        if (process.argv.length > 5) options.password = process.argv[5];

        service.add(process.argv[3], options, function(error) {
            if (error) console.log(error.toString());
        });
        return service;
    } else if (process.argv[2] == '--remove' && process.argv.length >= 4) {
        service.remove(process.argv[3], function(error) {
            if (error) console.log(error.toString());
        });
        return service;
    } else if (process.argv[2] == '--run') {
        var logStream = fs.createWriteStream('service.log');
        service.run(logStream, function() {
            service.stop(0);
        });

        //start fastboot server
        var server = require('./index')(options);
        server.start();
        return service;
    } else {
        usage();
    }
};
