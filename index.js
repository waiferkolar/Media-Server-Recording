let http = require('http');
let url = require('url');
require('dotenv').config()

let routes = {
    "GET": {
        "/": (req, res, params) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end("<h1>Get Method => / route</h1>");
        },
        "/home": (req, res, params) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end(`<h1>Get Method => /home route with param of ${params.query.name} and ${params.query.age}</h1>`);
        }
    },
    "POST": {
        "/": (req, res, params) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end("<h1>Post Method => / route</h1>");
        },
        "/about": (req, res, params) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end("<h1>Post Method => /about route</h1>");
        },
    },
    "NA": (req, res, params) => {
        res.writeHead(404);
        res.end("<h1>No page for that route!</h1>");
    }
}
let start = (req, res) => {
    let reqMethod = req.method;
    let params = url.parse(req.url, true);
    let name = params.query.name;
    let age = params.query.age;

    console.log("Name ", name, " Age ", age);

    let resolveRoute = routes[reqMethod][params.pathname];
    if (resolveRoute != null && resolveRoute != undefined) {
        resolveRoute(req, res, params);
    } else {
        routes["NA"](req, res, params);
    }
}

let server = http.createServer(start);

server.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}!`);
});
