var express = require("express");
var app = express();
// set the static files location ==========================
app.use(express.static(__dirname + '/public'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
// mqtt ===================================================
var mqtt = require('mqtt')
var mqttClient  = mqtt.connect('mqtt://localhost')
// router =================================================
require('./router.js')(app, io, mqttClient);

var port = process.env.PORT || 5000;
http.listen(port, function(){
  console.log("Sensors server listening on port " + port);
});
