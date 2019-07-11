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

let userMap = new Map();
let room1 = "public";
let room2 = "private";

let nspGame = io.of('/game');
let nspBook = io.of('/book');

nspGame.on('connection', (socket) => {
    socket.on('gamestart', data => {
        console.log(data);
    })
});
nspBook.on('connection', (socket) => {
    socket.on('bookstart', data => {
        console.log(data);
    })
});

io.sockets.on('connection', (socket) => {
    socket.on("login", data => {
        socket.username = data;
        userMap.set(socket.username, socket.id);
        if (data == 'w' || data == 'x') {
            socket.join(room1);
            socket.userroom = room1;
        } else {
            socket.join(room2);
            socket.userroom = room2;
        }
        socket.emit('login-success', true);
    });
    socket.on('msg', data => {
        io.in(socket.userroom).emit('income-msg', socket.username + " : " + data);
        // io.emit('income-msg', socket.username + " : " + data);
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Server starting at ${process.env.PORT}`);
})


