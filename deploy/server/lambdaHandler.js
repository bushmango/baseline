"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sls = require("serverless-http");
const server_1 = require("./server");
const binaryMimeTypes = [
    'application/javascript',
    'application/json',
    'application/octet-stream',
    'application/xml',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'text/comma-separated-values',
    'text/css',
    'text/html',
    'text/javascript',
    'text/plain',
    'text/text',
    'text/xml',
];
const server = server_1.setupServer({ includeUi: true, includeApi: true });
module.exports.server = sls(server, {
    binary: binaryMimeTypes,
});
//# sourceMappingURL=lambdaHandler.js.map