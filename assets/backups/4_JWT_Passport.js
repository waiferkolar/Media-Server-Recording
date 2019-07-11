require('dotenv').config();
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

let userMap = new Map();
userMap.set('aa@gmail.com', { name: 'aa', email: 'aa@gmail.com', pass: '123' });
userMap.set('bb@gmail.com', { name: 'bb', email: 'bb@gmail.com', pass: '123' });

let myStrategy = new JwtStrategy(opts, function (payload, done) {
    let user = userMap.get(payload.email);
    if (user != null || user != undefined) {
        done(null, user);
    } else {
        done('No user with that email', null);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(myStrategy);

app.post('/login', (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    let user = userMap.get(email);
    if (user != null || user != undefined) {
        if (user.pass == pass) {
            let payload = { email: email };
            let token = jwt.sign(payload, process.env.SECRET);
            res.json({ token: token });
        } else {
            res.send({ data: 'Password Error!' })
        }
    } else {
        res.send({ data: 'Email Error!' })
    }



});

app.get('/free', (req, res) => {
    res.send({ data: 'free route heehe!' });
});

app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({ data: 'Secret data for member!' });
})

app.listen(process.env.PORT);