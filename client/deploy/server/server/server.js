"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dev = process.env.NODE_ENV !== 'production';
const next_1 = __importDefault(require("next"));
// const pathMatch = require('path-match')
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
// const { parse } = require('url')
const installApi_1 = require("./api/installApi");
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
        installApi_1.installApi(server);
    }
    if (options.includeUi) {
        server.use('/_next', express_1.default.static(path_1.default.join(__dirname, '.next')));
        server.get('/', (req, res) => app.render(req, res, '/AppIndex'));
        // server.get('/baseline-1', (req, res) => app.render(req, res, '/AppIndex'))
        server.get('*', (req, res) => app.render(req, res, '/AppIndex'));
    }
    else {
        server.get('*', (req, res) => handle(req, res));
    }
    // server.get('/dogs', (req, res) => app.render(req, res, '/dogs'))
    // server.get('/dogs/:breed', (req, res) => {
    //   const params = route('/dogs/:breed')(parse(req.url).pathname)
    //   return app.render(req, res, '/dogs/_breed', params)
    // })
    return server;
}
exports.setupServer = setupServer;
//# sourceMappingURL=server.js.map