const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('hi');
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets



http.listen(3000, () => {
    console.log('listening on *:3000');
});