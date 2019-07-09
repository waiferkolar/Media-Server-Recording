let bcrypt = require('bcrypt');
let encode = (plainPass) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(plainPass, salt, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    })
}

let compare = (plainPass, hashPass) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, hashPass, (err, bool) => {
            if (err) reject(err);
            resolve(bool)
        })
    })
}

module.exports = {
    encode,
    compare
}
