"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express_1 = __importDefault(require("express"));
// import cors from 'cors'
const path_1 = __importDefault(require("path"));
const dev = process.env.NODE_ENV !== 'production';
const next_1 = __importDefault(require("next"));
// const pathMatch = require('path-match')
// const { parse } = require('url')
const installApi_1 = require("../../src-api/installApi");
function prepareServer(options) {
    if (options.includeUi) {
        const app = next_1.default({ dev });
        // const handle = app.getRequestHandler()
        if (!options.isLambda) {
            app.prepare().then(() => {
                let server = setupServer(app, options);
                console.log('> Listening...');
                server.listen(options.port, (err) => {
                    if (err) {
                        console.log('> Error listening on port ' + options.port);
                        throw err;
                    }
                    console.log(`> Ready on http://localhost:${options.port}`);
                });
            });
        }
        else {
            return setupServer(app, options);
        }
    }
    else {
        return setupServer(null, options);
    }
}
exports.prepareServer = prepareServer;
function setupServer(nexApp, options) {
    const server = express_1.default();
    // server.use(cors())
    if (options.includeApi) {
        installApi_1.installApi(server);
    }
    if (options.includeUi) {
        server.use('/_next', express_1.default.static(path_1.default.join(__dirname, '.next')));
        server.get('/', (req, res) => nexApp.render(req, res, '/AppIndex'));
        server.get('*', (req, res) => nexApp.render(req, res, '/AppIndex'));
    }
    else {
        server.get('/', (req, res) => res.send('api server up'));
    }
    return server;
}
//# sourceMappingURL=server.js.map