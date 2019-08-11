const express = require('express');

const PostRouter = require('./post-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', PostRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Comments and Posts API</h>
    <p>Web API Challenge II</p>
  `);
});

module.exports = server;