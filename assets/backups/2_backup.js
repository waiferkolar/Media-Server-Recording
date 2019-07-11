require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express'),
    app = express(),
    path = require('path'),
    hogan = require('hogan-express');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('html', hogan);
app.set('view engine', 'html');


app.get('/api/post/:name', (req, res) => {
    let name = req.params.name;
    res.send(`Param id is ${name}`);
});

app.get('/api/user', (req, res) => {
    let name = req.query.name;
    let password = req.query.password;
    res.send(`Name ${name}  and password ${password}`);
});

app.post("/api/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    res.send(`Email ${email} and Password ${password}`);
})


app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/loading', (req, res) => {
    res.render('loading')
})
app.get('/index', (req, res) => {
    res.render('index');
})
app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at Port ${process.env.PORT}`);
});