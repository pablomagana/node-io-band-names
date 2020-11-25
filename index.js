const express = require('express');
require('dotenv').config();
const path = require('path');

//app express
const app = express();

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

//sockets
require('./sockets/socket');


//path public
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    if (err) {
        throw Error(err);
    }

    console.log("server listen ON port " + process.env.PORT);
})