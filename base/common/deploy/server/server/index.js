"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = parseInt(process.env.PORT, 10) || 3007;
console.log(`> Starting Port: ${port}`);
const server_1 = require("./server");
server_1.prepareServer({ includeApi: true, includeUi: true }, (server) => {
    console.log('> Listening...');
    server.listen(port, (err) => {
        if (err) {
            console.log('> Error listening on port ' + port);
            throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map