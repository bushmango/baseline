"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../src-config/config");
const port = parseInt(process.env.PORT, 10) || config_1.config.port;
console.log(`> Starting Port: ${port}`);
const server_1 = require("./server");
server_1.prepareServer({
    includeApi: false,
    includeUi: true,
    isLambda: false,
    port: port,
});
//# sourceMappingURL=serverUi.js.map