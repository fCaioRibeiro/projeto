module.exports = (io) => {
    io.sockets.on('connection', (client) => {
        client.on('orderChange', () => {
            client.broadcast.emit('orderListUpdate');
        });

        client.on('allowLogin', (user) => {
            client.broadcast.emit('logoutUsers', user);
        });

        client.on('emitBeep', () => {
            client.broadcast.emit('beep');
        });
    });
};