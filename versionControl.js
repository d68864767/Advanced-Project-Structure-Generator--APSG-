const { exec } = require('child_process');

let config;
let settings;

function init(c, s) {
    config = c;
    settings = s;
}

function commit(message) {
    exec(`git add . && git commit -m "${message}"`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

function push() {
    exec(`git push ${config.versionControl.repository}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

function pull() {
    exec(`git pull ${config.versionControl.repository}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

module.exports = {
    init,
    commit,
    push,
    pull
};
