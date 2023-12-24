const fs = require('fs');
const path = require('path');

let config = {};
let settings = {};

function init(cfg, stg) {
    config = cfg;
    settings = stg;
    if (config.analytics.enable) {
        analyzeStructure(config.project.name);
    }
}

function analyzeStructure(rootName) {
    const structure = getStructure(rootName);
    const analyticsData = applyAnalyticsRules(structure);
    displayAnalytics(analyticsData);
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

function applyAnalyticsRules(structure) {
    const rules = require(config.analytics.rules);
    return rules.analyze(structure);
}

function displayAnalytics(data) {
    console.log('Project Structure Analytics:');
    console.log(data);
}

module.exports = {
    init
};
