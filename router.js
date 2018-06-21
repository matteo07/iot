module.exports = function (app, io, mqttClient) {
  var greenLight = true;
  var floor = 0;
  //POST CAR ENTRY OR EXIT
  app.post("/entry/:number", function(req, res) {
    console.log("n cars entering: " + req.params.number);
    console.log("greenLight: " + greenLight);

    function simulalteEnter(i) {
      if(greenLight == "true"){
        mqttClient.publish('input/enter/park', 'entered car');
        console.log("entering in floor: " + floor);
        mqttClient.publish('input/enter/floor', floor + "");
      } else {
        console.log("Parking full")
      }
    }

    for (let i = 0; i < req.params.number; i++){
      setTimeout(simulalteEnter, 300 * (i + 1));
    }

    res.send(req.params.number);
  });
  app.post("/exit/:park/:number", function(req, res) {
    console.log("car exiting from floor " + req.params.park + ": " + req.params.number);
    for (let i = 0; i < req.params.number; i++){
      mqttClient.publish('input/exit', req.params.park);
    }
    res.send(req.params.number);
  });
  //POST OF OUTPUT SENSORS, INVOKE SOCKET TO UPDATE FRON-END
  app.post("/greenlight/:status", function(req, res){
    greenLight = req.params.status;
    console.log('posted greenLight status: ' + greenLight);
    io.emit('greenLight', greenLight);
    res.send("OK");
  });
  app.post("/flooropened/:status", function(req, res){
    floor = req.params.status;
    console.log('posted floorOpened: ' + floor);
    io.emit('floorOpened', floor);
    res.send("OK");
  });
  /* serves home */
  app.get("/", function(req, res) {
     res.sendfile('index.html')
  });
  /* serves all the static files */
  app.get(/^(.+)$/, function(req, res){
      res.sendFile( __dirname + req.params[0]);
  });
}
