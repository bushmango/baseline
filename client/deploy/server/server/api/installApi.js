"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
function installApi(server) {
    api_1.apiPing.install(server);
    api_1.apiMath.install(server);
}
exports.installApi = installApi;
//# sourceMappingURL=installApi.js.map