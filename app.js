
const client = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/ourdb";

let makeCollection = (coleName) => {
    client.connect(url, { useNewUrlParser: true }, (err, inst) => {
        if (err) {
            console.log("Something wrong ", err);
        } else {
            let dbo = inst.db('ourdb');
            dbo.createCollection(coleName, (err, res) => errorChecker(err, res));
        }
    });
};

let insertData = (obj) => {
    client.connect(url, { useNewUrlParser: true }, (err, inst) => {
        if (err) {
            console.log("Something wrong ", err);
        } else {
            let dbo = inst.db('ourdb');
            dbo.collection('users').findOne({}, (err, res) => {
                obj.forEach((ob) => {
                    ob['userId'] = res._id;
                    dbo.collection('orders').insertOne(ob, (err, res) => errorChecker(err, res));
                })
            });
        }
    })
}

let findUser = () => {
    client.connect(url, { useNewUrlParser: true }, (err, inst) => {
        if (err) {
            console.log("Something wrong ", err);
        } else {
            let dbo = inst.db('ourdb');
            // find One
            //dbo.collection('users').findOne({}, (err, res) => errorChecker(err, res));
            // find ALl
            //dbo.collection('users').find({}).toArray((err, res) => errorChecker(err, res));
            // find By Query
            //let query = { age: 21 };
            //dbo.collection('users').find(query).toArray((err, res) => errorChecker(err, res));
            // find all users's names
            // dbo.collection('users').find({}, { projection: { _id: 0, name: 1 } }).toArray((err, res) => //errorChecker(err, res));
            dbo.collection('users').find({}).limit(3).toArray((err, res) => errorChecker(err, res));
        }
    })
}

let getUserWithSort = () => {
    client.connect(url, { useNewUrlParser: true }, (err, inst) => {
        if (err) {
            console.log("Something wrong ", err);
        } else {
            let dbo = inst.db('ourdb');
            let mySort = { name: -1 };
            dbo.collection('users').find({}).sort(mySort).toArray((err, res) => errorChecker(err, res));
        }
    })
}

let deleteUser = () => {
    client.connect(url, { useNewUrlParser: true }, (err, inst) => {
        if (err) {
            console.log("Something wrong ", err);
        } else {
            let dbo = inst.db('ourdb');
            // delete All
            //     let query = { age: /^\d/ };
            //     dbo.collection('users').deleteMany({}, (err, res) => errorChecker(err, res));
            // Drop Collection
            //dbo.collection('users').drop({}, (err, res) => errorChecker(err, res));
            dbo.dropCollection('users', (err, res) => errorChecker(err, res));
        }
    })
}

let updateUser = () => {
    client.connect(url, { useNewUrlParser: true }, (err, inst) => {
        if (err) {
            console.log("Something wrong ", err);
        } else {
            let dbo = inst.db('ourdb');
            let query = { password: '123' };
            dbo.collection('users').updateMany(query, { $set: { password: '456' } }, (err, res) => errorChecker(err, res));
        }
    })
}

// insertData(
//     [
//         { name: 'Mg Mg', email: 'mgmg@gmail.com', password: '123', age: 21 },
//         { name: 'Mya Mya', email: 'myamay@gmail.com', password: '123', age: 21 },
//         { name: 'Aung Aung', email: 'aungaung@gmail.com', password: '123', age: 22 },
//         { name: 'Tun Tun', email: 'tuntun@gmail.com', password: '123', age: 22 },
//         { name: 'Su Su', email: 'susu@gmail.com', password: '123', age: 23 },
//         { name: 'Hla Hla', email: 'hlahla@gmail.com', password: '123', age: 23 }
//     ]
// );

// insertData(
//     [
//         { userId: 'user_id', name: 'computer', price: 12000, count: 2 },
//         { userId: 'user_id', name: 'Keyboard', price: 12000, count: 4 },
//         { userId: 'user_id', name: 'mouser', price: 12000, count: 3 },
//         { userId: 'user_id', name: 'printer', price: 12000, count: 3 },
//         { userId: 'user_id', name: 'power-supply', price: 12000, count: 1 },
//     ]
// );

let joinTable = () => {
    client.connect(url, { useNewUrlParser: true }, (err, inst) => {
        if (err) {
            console.log("Something wrong ", err);
        } else {
            let dbo = inst.db('ourdb');
            dbo.collection('users').aggregate([
                {
                    $lookup: {
                        from: 'orders',
                        localField: "_id",
                        foreignField: "userId",
                        as: "user_orders"
                    }
                }
            ]).toArray((err, res) => errorChecker(err, res));
        }

    });
};

joinTable();

let errorChecker = (err, res) => {
    if (err) {
        console.log("Something wrong ", err);
    } else {
        console.log("We are good to go ", res);
    }
};
