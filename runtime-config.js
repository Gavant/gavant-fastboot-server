const path = require('path');
const fs = require('fs-extra');
const merge = require('merge');

module.exports = function applyRuntimeConfig(appName, distPath, configName) {
    const configContentPattern = new RegExp(`<meta name="${configName}" content="([^"]+)" />`);
    const pkgPath = path.join(__dirname, distPath, 'package.json');
    const indexPath = path.join(__dirname, distPath, 'index.html');
    const configuredIndexPath = path.join(__dirname, distPath, 'index-configured.html');
    let indexContents = fs.readFileSync(indexPath, {encoding: 'utf-8'});

    try {
        if (process.env.CLIENT_CONFIG_PATH) {
            //if the file does not exist, is not readable, or is not valid JSON, an error will be thrown and the process will exit
            let fileContents = fs.readFileSync(process.env.CLIENT_CONFIG_PATH, {encoding: 'utf-8'});
            let parsedFileContents = JSON.parse(fileContents);
            let origConfig = JSON.parse(unescape(indexContents.match(configContentPattern)[1]));
            let mergedConfig = merge.recursive(true, origConfig, parsedFileContents);
            let serializedConfig = escape(JSON.stringify(mergedConfig));
            indexContents = indexContents.replace(configContentPattern, `<meta name="${configName}" content="${serializedConfig}" />`);

            //apply the same config changes to the package.json's appConfig object, so that the changes will be used in fastboot
            let pkgContents = fs.readFileSync(pkgPath, {encoding: 'utf-8'});
            let pkgJSON = JSON.parse(pkgContents);
            let mergedPkgConfig = merge.recursive(true, pkgJSON, {fastboot: { config: {[appName]: parsedFileContents}}});
            pkgContents = JSON.stringify(mergedPkgConfig, null, '  ');
            fs.writeFileSync(pkgPath, pkgContents);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    console.log('Creating new index-configured.html file with all runtime configurations applied...');
    fs.writeFileSync(configuredIndexPath, indexContents);
}
