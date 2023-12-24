const fs = require('fs');

let config;
let settings;

function init(cfg, stg) {
    config = cfg;
    settings = stg;
}

function applyRules() {
    if (!settings.optimization.enable) {
        console.log('Optimization is disabled in settings.json');
        return;
    }

    const rulesPath = settings.optimization.rules;
    if (!fs.existsSync(rulesPath)) {
        console.log(`Rules file ${rulesPath} does not exist`);
        return;
    }

    let rules;
    try {
        rules = require(`./${rulesPath}`);
    } catch (err) {
        console.log(`Failed to load rules from ${rulesPath}`);
        console.error(err);
        return;
    }

    if (typeof rules !== 'object' || !Array.isArray(rules)) {
        console.log(`Invalid rules format in ${rulesPath}`);
        return;
    }

    // Apply each rule
    for (const rule of rules) {
        if (typeof rule !== 'function') {
            console.log('Invalid rule format: rule is not a function');
            continue;
        }

        try {
            rule();
        } catch (err) {
            console.log('Failed to apply rule');
            console.error(err);
        }
    }
}

module.exports = {
    init,
    applyRules
};
