"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../src-config/config");
const port = parseInt(process.env.PORT, 10) || config_1.config.port + 1;
console.log(`> Starting Port: ${port}`);
const server_1 = require("./server");
server_1.prepareServer({
    includeApi: true,
    includeUi: false,
    isLambda: false,
    port: port,
});
//# sourceMappingURL=serverApi.js.map