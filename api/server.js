const express = require('express');
const actionsRoutes = require('./actions/actions-router');
// Complete your server here!
// Do NOT `server.listen()` inside this file!
const server = express();

server.use(express.json());

// intercept routes
server.use('/api/actions', actionsRoutes);

server.use("/", (req, res) => {
    res.send("API working!");
})
module.exports = server;
