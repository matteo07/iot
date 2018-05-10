module.exports = function (app, io) {
  var sensorsMap = {"1": false, "2": true, "3": "a", "4": "b", "5": "c" }
  //GET AND POST OF INPUT SENSORS
  app.get("/sensor/:sensorID", function(req, res) {
     res.send(sensorsMap[req.params.sensorID]);
  });
  app.post("/sensor/:id/:value", function(req, res) {
    sensorsMap[req.params.id] = req.params.value;
    res.send(sensorsMap[req.params.id]);
  });
  //POST OF OUTPUT SENSORS, INVOKE SOCKET TO UPDATE FRON-END
  app.post("/greenlight/:status", function(req, res){
    io.emit('greenLight', req.params.status);
    res.send("OK");
  });
  app.post("/flooropened/:status", function(req, res){
    io.emit('floorOpened', req.params.status);
    res.send("OK");
  });
  /* serves main page */
  app.get("/", function(req, res) {
     res.sendfile('index.html')
  });
  /* serves all the static files */
  app.get(/^(.+)$/, function(req, res){
      res.sendFile( __dirname + req.params[0]);
  });
}
