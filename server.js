//dependencies

var express = require("express");
var path = require("path");

//express setup 

var app = express();
var PORT = 3000;

//express parsing

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//data

var tables = []
var waitlist = []

//API routing

app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

//html pages routing
app.get("/", function(req, res) {
    return res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    return res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    return res.sendFile(path.join(__dirname, "reserve.html"));
});

//take in reservation info

app.post("/api", function(req, res) {
    var resData = req.body;
    if (tables.length < 5) {
        tables.push(resData);
        res.json(true);
    } else {
        waitlist.push(resData);
        res.json(false);
    };
});

//remove tables
/* app.delete("/api", function(req, res) {
    var data = req.body;
    console.log(data);
}); */

//start server

app.listen(PORT, function() {
    console.log("Listening on port",PORT);
});

