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
function prepareServer(isLambda, callback) {
    const app = next_1.default({ dev });
    // const handle = app.getRequestHandler()
    if (!isLambda) {
        app.prepare().then(() => {
            callback(setupServer(app));
        });
    }
    else {
        return callback(setupServer(app));
    }
}
exports.prepareServer = prepareServer;
function setupServer(nexApp) {
    const server = express_1.default();
    // server.use(cors())
    server.use('/_next', express_1.default.static(path_1.default.join(__dirname, '.next')));
    server.get('*', (req, res) => nexApp.render(req, res));
    return server;
}
//# sourceMappingURL=server.js.map