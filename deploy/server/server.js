"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express_1 = require("express");
const path_1 = require("path");
const dev = process.env.NODE_ENV !== 'production';
const next_1 = require("next");
const api_1 = require("./api");
// const pathMatch = require('path-match')
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
// const { parse } = require('url')
function prepareServer(options, callback) {
    app.prepare().then(() => {
        callback(setupServer(options));
    });
}
exports.prepareServer = prepareServer;
function setupServer(options) {
    const server = express_1.default();
    // const route = pathMatch()
    if (options.includeApi) {
        api_1.apiPing.install(server);
        api_1.apiMath.install(server);
    }
    if (options.includeUi) {
        server.use('/_next', express_1.default.static(path_1.default.join(__dirname, '.next')));
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