require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');

const BUILDPATH = path.join(__dirname, 'build');

const { PORT = 3000 } = process.env;

const app = express();
app.set('port', PORT);

app.use(express.static(BUILDPATH));
app.get('/*', (req, res) => res.sendFile('index.html', { root: BUILDPATH }));

const httpServer = http.createServer(app);

httpServer.listen(PORT);
console.info(`🚀 Client Running on: http://localhost:${PORT}`);
