let http = require('http');
let url = require('url');
let qs = require('querystring');
let fs = require('fs');
let path = require('path');
require('dotenv').config()

meme = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
}

let router = (req, res) => {
    let params = url.parse(req.url, true);
    let oriPath = params.pathname == "/" ? "/index.html" : params.pathname;;
    let filepath = __dirname + oriPath;

    console.log(filepath);
    let ext = path.extname(oriPath);

    fs.access(filepath, fs.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-type': 'text/html' });
            res.end("<h1>File Not found</h1>");
        } else {
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    res.writeHead(403, { 'Content-type': 'text/html' });
                    res.end("<h1>File Read Error</h1>");
                } else {
                    res.writeHead(200, { 'Content-type': meme[ext] });
                    res.end(data);
                }
            });
        }
    })


}

let server = http.createServer(router);

server.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}!`);
});
