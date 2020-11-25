const { request } = require("express");

const io = require('../index').io;
io.on('connection', client => {
    console.log("cliente conectado")
    client.on('disconnect', () => { console.log('cliente desconectado') });
    client.on('mensaje', data => {
        console.log(data.name);
        io.emit('mensaje', { admin: 'nuevo mensaje' })
    });
});