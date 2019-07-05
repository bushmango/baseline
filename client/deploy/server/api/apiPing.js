"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function install(app) {
    app.get('/api/ping', (req, res) => res.send('pong'));
}
exports.install = install;
//# sourceMappingURL=apiPing.js.map