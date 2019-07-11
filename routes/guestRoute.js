module.exports = (express) => {
    let route = express.Router();

    route.get('/', (req, res) => {
        res.send({ data: "Guest Home Route" });
    });

    route.get('/about', (req, res) => {
        res.send({ data: "Guest About Route" });
    })

    return route;
}