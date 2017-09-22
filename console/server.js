var compression = require('compression');
var express = require('express');
var httpProxy = require('http-proxy');

var app = express();
app.use(compression());

var path = __dirname;
var port = 7001;

var proxy = httpProxy.createProxyServer();

function requestHandler(req, res) {
    res.sendFile(path + '/index.html');
}

function requestForbidden(req, res) {
    res.send(403);
}

app.use('/dist', express.static(path + '/dist'));

app.get('/', requestHandler);
app.get('/sheet/*', requestHandler);

app.get('/src/*', requestForbidden);
app.get('/node_modules/*', requestForbidden);

app.listen(port);
