var express = require('express');
var bodyParser = require('body-parser');

module.exports = function setupExpress() {
    var app = express();
    app.use(bodyParser());
    app.use(allowCrossDomain);

    app.get('/', function (request, response) {
        console.log("got data table");
        response.json(data);
    });

    var server = app.listen(4001, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Express listening at http://%s:%s", host, port);

    });


    data = {
        stat: [{
            type: "circle",
            calculated: 34
        },
            {
                type: "rect",
                calculated: 15
            }]
    }
    ;


};

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9001');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}