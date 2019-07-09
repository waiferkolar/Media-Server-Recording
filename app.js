let libby = require('./bmlibby/index');


libby.encode('123')
    .then(encoded => libby.compare('124', encoded))
    .then(res => console.log(res))
    .catch(err => console.log(err));