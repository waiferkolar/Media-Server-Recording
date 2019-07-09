require('dotenv').config();
let express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(path.join('assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get('/loading', (req, res) => {
    res.sendFile(__dirname + "/loading.html");
})
app.get('/index', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.get('/about', (req, res) => {
    res.sendFile(__dirname + "/about.html");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at Port ${process.env.PORT}`);
});