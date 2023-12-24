const fs = require('fs');
const path = require('path');

let config = {};
let settings = {};

function init(cfg, stg) {
    config = cfg;
    settings = stg;
    generateDocumentation(config.project.name);
}

function generateDocumentation(rootName) {
    const structure = getStructure(rootName);
    const documentation = createDocumentation(structure);
    writeDocumentation(rootName, documentation);
}

function getStructure(root) {
    const structure = [];
    const files = fs.readdirSync(root);

    files.forEach(file => {
        const filePath = path.join(root, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            structure.push({
                name: file,
                type: 'directory',
                children: getStructure(filePath)
            });
        } else {
            structure.push({
                name: file,
                type: 'file'
            });
        }
    });

    return structure;
}

function createDocumentation(structure) {
    let documentation = '';

    structure.forEach(item => {
        if (item.type === 'directory') {
            documentation += `Directory: ${item.name}\n`;
            documentation += createDocumentation(item.children);
        } else {
            documentation += `File: ${item.name}\n`;
        }
    });

    return documentation;
}

function writeDocumentation(root, documentation) {
    const docPath = path.join(root, 'DOCUMENTATION.md');
    fs.writeFileSync(docPath, documentation, 'utf8');
}

module.exports = {
    init
};
