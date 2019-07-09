"use strict";
exports.__esModule = true;
var port = parseInt(process.env.PORT, 10) || 3007;
console.log("> Starting Port: " + port);
var server_1 = require("./server");
server_1.prepareServer(function (server) {
    console.log('> Listening...');
    server.listen(port, function (err) {
        if (err) {
            console.log('> Error listening on port ' + port);
            throw err;
        }
        console.log("> Ready on http://localhost:" + port);
    });
});
