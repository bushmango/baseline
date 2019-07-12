// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
import path from 'path'
const next = require('next');

import express from 'express'

const dev = false // process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// console.log('> App preparing');
// app.prepare().then(() => {
//   console.log('> App prepared');
//   createServer((req, res) => {
//     // Be sure to pass `true` as the second argument to `url.parse`.
//     // This tells it to parse the query portion of the URL.
//     const parsedUrl = parse(req.url, true);
//     const { pathname, query } = parsedUrl;
//     handle(req, res, parsedUrl);    
//   }).listen(port, err => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// }); 

export const prepareServer = () => { 

  const server = express()

  server.use('/_next', express.static(path.join(__dirname, '.next')))
  server.get('/', (req, res) => app.render(req, res, '/'))
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl
    app.render(req, res, pathname)   
  })

  // const server = createServer((req, res) => {
  //   // Be sure to pass `true` as the second argument to `url.parse`.
  //   // This tells it to parse the query portion of the URL.
  //   const parsedUrl = parse(req.url, true);
  //   const { pathname, query } = parsedUrl;
  //   handle(req, res, parsedUrl);    
  // })
 
  return server

}

