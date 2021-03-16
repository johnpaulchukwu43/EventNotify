const publisher_app = require('./publisher-app');
const subscriber_app = require('./subscriber-app');
const mongoose = require('mongoose');
const secret = require('./config/secret');
const bodyParser = require('body-parser');
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const publisher_port = normalizePort(process.env.PUBLISHER_APP_PORT || '8000');
const subscriber_port = normalizePort(process.env.SUBSCRIBER_APP_PORT || '9000');

mongoose.connect(secret.database, { useNewUrlParser: true }, (err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

publisher_app.use(bodyParser.json());
publisher_app.use(bodyParser.urlencoded( { extended: true }));
publisher_app.listen(publisher_port, function (err) {
    if (err) throw err;
    console.log("Publisher Server is running " + publisher_port);
});


subscriber_app.listen(subscriber_port, function (err) {
    if (err) throw err;
    console.log("Subscriber Server is running " + subscriber_port);
});

subscriber_app.use(bodyParser.json());
subscriber_app.use(bodyParser.urlencoded( { extended: true }));
subscriber_app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


