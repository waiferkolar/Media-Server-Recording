let express = require('express'),
    app = express(),
    multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), function (req, res, next) {
    console.log(req.file.filename);
    res.send(req.file.filename)
});

app.post('/multiupload', upload.array('images', 12), function (req, res, next) {
    req.files.forEach((file) => {
        console.log(file.filename);
    });
    res.send(req.files);
})



app.listen(3000);