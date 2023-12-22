//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var cors    = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}


var app     = express();
app.use(cors(corsOptions));
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

// crear un nuevo dispositivo
app.post("/devices", (req, res, next) => {
    console.log("llego respuesta", req.body);
    r = req.body;
    if (r.name == "") {
        res.status(400).send("Bad Request");
    } else {
        res.status(200).send("OK, device added");
    }
    utils.query("INSERT INTO Devices (name, description, state, type) VALUES ('" + r.name + "', '" + r.description + "', " + r.state + ", " + r.type + ")", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
});

// cambiar el estado de un dispositivo
app.put("/devices:state", (req, res, next) => {
    console.log("llego respuesta para cambio", req.body);
    r = req.body;
    if (r.id == "") {
        res.status(400).send("Bad Request");
    } else {
        res.status(200).send("OK, device changed");
    }
    utils.query("UPDATE Devices SET state = " + r.state + " WHERE id = " + r.id, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
})

// modificar un dispositivo
app.put("/devices", (req, res, next) => {
    console.log("llego respuesta para cambio", req.body);
    r = req.body;
    if (r.id == "") {
        res.status(400).send("Bad Request");
    } else {
        res.status(200).send("OK, device changed");
    }
    utils.query("UPDATE Devices SET name = '" + r.name + "', description = '" + r.description + "', type = " + r.type + " WHERE id = " + r.id, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
})

// mostrar todos los dispositivos
app.get('/devices/', (req, res, next) => {
    utils.query("SELECT * FROM Devices", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(JSON.stringify(result)).status(200);
        }
    })
});

// borrar un dispositivo
app.delete("/devices", (req, res, next) => {
    console.log("llego respuesta para borrar", req.body);
    r = req.body;
    if (r.id == "") {
        res.status(400).send("Bad Request");
    } else {
        res.status(200).send("OK, device deleted");
    }
    utils.query("DELETE FROM Devices WHERE id = " + r.id, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
})

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
