"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express = require("express");
const path = require("path");
const dev = process.env.NODE_ENV !== 'production';
const next = require("next");
const api_1 = require("./api");
// const pathMatch = require('path-match')
const app = next({ dev });
const handle = app.getRequestHandler();
// const { parse } = require('url')
function prepareServer(options, callback) {
    app.prepare().then(() => {
        callback(setupServer(options));
    });
}
exports.prepareServer = prepareServer;
function setupServer(options) {
    const server = express();
    // const route = pathMatch()
    if (options.includeApi) {
        api_1.apiPing.install(server);
        api_1.apiMath.install(server);
    }
    if (options.includeUi) {
        server.use('/_next', express.static(path.join(__dirname, '.next')));
        server.get('/', (req, res) => app.render(req, res, '/'));
    }
    // server.get('/dogs', (req, res) => app.render(req, res, '/dogs'))
    // server.get('/dogs/:breed', (req, res) => {
    //   const params = route('/dogs/:breed')(parse(req.url).pathname)
    //   return app.render(req, res, '/dogs/_breed', params)
    // })
    server.get('*', (req, res) => handle(req, res));
    return server;
}
exports.setupServer = setupServer;
//# sourceMappingURL=server.js.map