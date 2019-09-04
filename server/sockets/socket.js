const {
    io
} = require('../server');

io.on('connection', (client) => {
    client.on('entrarChat', msj => console.log(msj));
});