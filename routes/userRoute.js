module.exports = (express) => {
    let route = express.Router();

    route.get('/home', (req, res) => {
        res.send({ data: 'User Home Page' })
    });
    route.get('/about', (req, res) => {
        res.send({ data: 'User About Page' })
    });

    return route;
}