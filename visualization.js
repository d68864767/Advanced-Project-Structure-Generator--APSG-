const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

let config = {};
let settings = {};

let server;
let io;

function init(cfg, stg) {
    config = cfg;
    settings = stg;

    const app = express();
    server = http.createServer(app);
    io = socketIO(server);

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('getStructure', () => {
            const structure = getStructure(config.project.name);
            socket.emit('structure', structure);
        });
    });

    server.listen(config.visualization.port, () => {
        console.log(`Visualization server is running on http://localhost:${config.visualization.port}`);
    });
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

module.exports = {
    init
};
