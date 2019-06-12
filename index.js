'use strict';

const http = require('http');

const PORT = 3001;

const proxy = http.createServer((req, res) => {
  const headers = {
    'Content-Type': 'text/html',
  };

  const options = {
    hostname: req.headers.host.replace(':3001', ''),
    port: 3002,
    method: req.method,
    headers,
  };

  console.log(options);
  const mainReq = http.request(options, (mainRes) => {
    let fullData = '';
    mainRes.on('data', (chunk) => {
      fullData += chunk;
    });

    mainRes.on('end', () => {
      res.end(fullData);
    });
  });

  mainReq.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  mainReq.end();
});

proxy.listen(PORT);
