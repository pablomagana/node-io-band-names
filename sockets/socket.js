const { request } = require("express");
const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand(new Band("Hombres G"));
bands.addBand(new Band("Maldita nerea"));
bands.addBand(new Band("Dundandu"));
bands.addBand(new Band("Bon jovi"));

console.log(bands);

const io = require('../index').io;
io.on('connection', client => {
    console.log("cliente conectado");

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { console.log('cliente desconectado') });

    client.on('vote-band', (payload) => {
        console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands())
    });
    client.on('add-band', (payload) => {
        console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBnad(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('mensaje', data => {
    //     console.log('mensaje', data);
    //     io.emit('mensaje', { admin: 'nuevo mensaje' })
    // });

    // client.on('emitir-mensaje', (payload) => {
    //     console.log('emitiendo mensaje', payload);
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });
});