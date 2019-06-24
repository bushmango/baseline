'use strict';

const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')

const server = require('./server').setupServer()
module.exports.server = sls(server, {
  binary: binaryMimeTypes
}

// module.exports.server = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//     }),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
