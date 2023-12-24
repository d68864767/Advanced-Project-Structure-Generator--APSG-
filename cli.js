const yargs = require('yargs');
const treeGenerator = require('./treeGenerator');
const optimizer = require('./optimizer');
const visualization = require('./visualization');
const rules = require('./rules');
const versionControl = require('./versionControl');
const docGenerator = require('./docGenerator');
const analytics = require('./analytics');

let config = {};
let settings = {};

function init(cfg, stg) {
    config = cfg;
    settings = stg;
}

yargs.command({
    command: 'generate',
    describe: 'Generate project structure',
    handler: () => {
        treeGenerator.init(config, settings);
    }
});

yargs.command({
    command: 'optimize',
    describe: 'Optimize project structure',
    handler: () => {
        optimizer.init(config, settings);
    }
});

yargs.command({
    command: 'visualize',
    describe: 'Visualize project structure',
    handler: () => {
        visualization.init(config, settings);
    }
});

yargs.command({
    command: 'apply-rules',
    describe: 'Apply rules to project structure',
    handler: () => {
        rules.init(config, settings);
    }
});

yargs.command({
    command: 'commit',
    describe: 'Commit changes to version control',
    builder: {
        message: {
            describe: 'Commit message',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        versionControl.init(config, settings);
        versionControl.commit(argv.message);
    }
});

yargs.command({
    command: 'generate-docs',
    describe: 'Generate project documentation',
    handler: () => {
        docGenerator.init(config, settings);
    }
});

yargs.command({
    command: 'analyze',
    describe: 'Analyze project structure',
    handler: () => {
        analytics.init(config, settings);
    }
});

yargs.parse();

module.exports = {
    init
};
