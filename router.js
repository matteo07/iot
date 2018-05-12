module.exports = function (app, io, mqttClient) {
  //GET AND POST OF INPUT SENSORS
  app.post("/entry/:number", function(req, res) {
    console.log("car entering: " + req.params.number);
    mqttClient.publish('input', 'enter');
    res.send(req.params.number);
  });
  app.post("/exit/:number", function(req, res) {
    console.log("car exiting: " + req.params.number);
    mqttClient.publish('input', 'exit');
    res.send(req.params.number);
  });
  //POST OF OUTPUT SENSORS, INVOKE SOCKET TO UPDATE FRON-END
  app.post("/greenlight/:status", function(req, res){
    console.log('posted greenLight status: ' + req.params.status)
    io.emit('greenLight', req.params.status);
    res.send("OK");
  });
  app.post("/flooropened/:status", function(req, res){
    console.log('posted floorOpened: ' + req.params.status);
    io.emit('floorOpened', req.params.status);
    res.send("OK");
  });
  /* serves Sensors Manager */
  app.get("/", function(req, res) {
     res.sendfile('index.html')
  });
  /* serves all the static files */
  app.get(/^(.+)$/, function(req, res){
      res.sendFile( __dirname + req.params[0]);
  });
}
