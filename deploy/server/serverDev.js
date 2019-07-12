"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { config } from '../base/src-config/config'
const port = parseInt(process.env.PORT, 10) || 3020;
console.log(`> Starting Port: ${port}`);
const server_1 = require("./server");
server_1.prepareServer(false, (server) => {
    console.log('> Listening...');
    server.listen(port, (err) => {
        if (err) {
            console.log('> Error listening on port ' + port);
            throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
    });
});
//# sourceMappingURL=serverDev.js.map