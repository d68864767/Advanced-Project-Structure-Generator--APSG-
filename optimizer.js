const fs = require('fs');
const path = require('path');

let config = {};
let settings = {};

function init(cfg, stg) {
    config = cfg;
    settings = stg;
    if (config.optimization.enable) {
        optimizeStructure(config.project.name);
    }
}

function optimizeStructure(rootName) {
    const structure = getStructure(rootName);
    const optimizedStructure = applyOptimizationRules(structure);
    updateStructure(rootName, optimizedStructure);
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

function applyOptimizationRules(structure) {
    const rules = require(config.optimization.rules);
    return rules.optimize(structure);
}

function updateStructure(root, structure) {
    structure.forEach(item => {
        const itemPath = path.join(root, item.name);

        if (item.type === 'directory') {
            if (!fs.existsSync(itemPath)) {
                fs.mkdirSync(itemPath);
            }
            updateStructure(itemPath, item.children);
        } else {
            if (!fs.existsSync(itemPath)) {
                fs.writeFileSync(itemPath, '', 'utf8');
            }
        }
    });
}

module.exports = {
    init
};
