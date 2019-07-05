"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function installApi(server) {
    _1.apiPing.install(server);
    _1.apiMath.install(server);
}
exports.installApi = installApi;
//# sourceMappingURL=installApi.js.map