"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util_1 = require("util");
const { spawn } = require('child_process');
const copyAsync = util_1.promisify(require('copy'));
function log(msg, ...msgs) {
    console.log(msg, ...msgs);
}
async function copy(src, glob, dest) {
    if (!src.endsWith('/')) {
        src += '/';
    }
    let s = src + glob;
    log('copy', s, dest);
    await copyAsync(s, dest);
}
async function runCommand(cmd, args, options) {
    var e_1, _a;
    const child = spawn(cmd, args, options);
    log(cmd, ...args);
    try {
        for (var _b = __asyncValues(child.stdout), _c; _c = await _b.next(), !_c.done;) {
            const data = _c.value;
            process.stdout.write(data);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return new Promise((resolve, reject) => {
        child.on('exit', (code) => {
            console.log(`${cmd} | ${code}`);
            resolve();
        });
    });
}
async function run() {
    const basePath = path.join(__dirname, '../');
    const deployPath = path.join(basePath, '../deploy');
    const distPath = path.join(basePath, '../dist');
    const nextPath = path.join(basePath, '.next');
    const serverPath = path.join(basePath, 'server');
    const distServerPath = path.join(distPath, 'server');
    log('Deploying...', distPath);
    await runCommand('rm', ['-rf', nextPath]);
    await runCommand('yarn', ['next', 'build']);
    await runCommand('rm', ['-rf', distPath]);
    await runCommand('mkdir', [distPath]);
    await runCommand('mv', [nextPath, distPath + '/.next']);
    await runCommand('mkdir', [distServerPath]);
    await copy(deployPath, '*', distPath);
    await runCommand('tsc', ['--project', 'server/tsconfig.server.json']);
    await copy(serverPath, '*.js', distServerPath);
    await copy(serverPath, '*.json', distServerPath);
    // await runCommand('yarn', ['install'], { cwd: distPath })
    await runCommand('yarn', ['install'], { cwd: distPath });
    await runCommand('sls', ['deploy'], { cwd: distPath });
    await runCommand('rm', ['-rf', distPath]);
    log('Deployed!');
}
run();
//# sourceMappingURL=deploy.js.map