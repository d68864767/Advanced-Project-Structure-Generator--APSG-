const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const treeGenerator = require('./treeGenerator');
const optimizer = require('./optimizer');
const visualization = require('./visualization');
const rules = require('./rules');
const versionControl = require('./versionControl');
const docGenerator = require('./docGenerator');
const analytics = require('./analytics');
const cli = require('./cli');

const config = require('./config.json');
const settings = require('./settings.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Advanced Project Structure Generator (APSG)');
});

app.listen(port, () => {
    console.log(`APSG is running on http://localhost:${port}`);
});

// Initialize all modules
treeGenerator.init(config, settings);
optimizer.init(config, settings);
visualization.init(config, settings);
rules.init(config, settings);
versionControl.init(config, settings);
docGenerator.init(config, settings);
analytics.init(config, settings);
cli.init(config, settings);

module.exports = app;
