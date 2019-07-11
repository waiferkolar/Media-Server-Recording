let express = require('express'),
    app = express(),
    multer = require('multer');

let guestRoute = require('./routes/guestRoute')(express);
let userRoute = require('./routes/userRoute')(express);

app.use('/', guestRoute);
app.use('/user',userRoute);


app.listen(3000);