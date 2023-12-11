//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.post('/devices/', (req, res, next) => {
    console.log(req.body);
    res.status(200).send("OK");
    r = req.body;
});

app.get('/devices/', (req, res, next) => {
    devices = [
        {
            'id': 1,
            'name': 'Lampara 1',
            'description': 'Luz living',
            'state': 0,
            'type': 1,
        },
        {
            'id': 2,
            'name': 'Ventilador 1',
            'description': 'Ventilador Habitación',
            'state': 1,
            'type': 2,
        },
        {
            'id': 3,
            'name': 'TV',
            'description': 'TV Led Habitación',
            'state': 0,
            'type': 3,
        },
    ];
    res.send(JSON.stringify(devices)).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
