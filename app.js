require('dotenv').config();
let express = require('express'),
    app = express(),
    path = require('path'),
    hogan = require('hogan-express'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.render('index');
})
/** 
    #sending to All Users
    io.emit('key','val');

    #send message only to sender-client
    socket.emit('message', 'check this');

    #send to all listeners except sender
    socket.broadcast.emit("chat-data",username + " : " + data);

    #send message to certain user
    io.sockets.connected[clients[1]].emit("chat-data",username + " : " + data);

    #send to specific socket-id (specific user)
    socket.broadcast.to(socketid).emit("chat-data",username + " : " + data);
    io.sockets.connected[socket.id].emit('login-success', true)

    // Socket , io emit 
    // Socket Room 
    // namespace
*/
io.sockets.on('connection', (socket) => {
    socket.on("login", data => {
        socket.username = data;
        socket.broadcast.to(socket.id).emit('login-success',true);
    });
    socket.on('msg', data => {
        io.emit('income-msg', socket.username + " : " + data);
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Server starting at ${process.env.PORT}`);
})


