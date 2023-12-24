const fs = require('fs');
const path = require('path');

let config = {};
let settings = {};

function init(cfg, stg) {
    config = cfg;
    settings = stg;
    generateStructure(config.project.name);
}

function generateStructure(rootName) {
    fs.mkdirSync(rootName);
    createSubDirectories(rootName, settings.structure);
}

function createSubDirectories(root, structure) {
    structure.forEach(dir => {
        const dirPath = path.join(root, dir.name);
        fs.mkdirSync(dirPath);

        if (dir.subDirectories) {
            createSubDirectories(dirPath, dir.subDirectories);
        }

        if (dir.files) {
            createFiles(dirPath, dir.files);
        }
    });
}

function createFiles(dirPath, files) {
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        fs.writeFileSync(filePath, '', 'utf8');
    });
}

module.exports = {
    init
};
