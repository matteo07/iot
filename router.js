module.exports = function (app, io, mqttClient) {
  var greenLight = true;
  var floor = 0;

  //POST CAR ENTRY
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

  //POST CAR BOOKED ENTRY
  app.post("/booked/:cf", function(req, res) {
    console.log("entering booked car: " + req.params.cf);

    mqttClient.publish('input/enter/booked', req.params.cf);
    res.send(req.params.number);
  });

  //POST CAR BOOKED CONFIRMATION
  app.post("/bookconfirmed/", function(req, res) {
    console.log("booking confirmed\nentering in floor: " + floor);

    mqttClient.publish('input/enter/floor', floor + "");
    res.send();
  });

  //POST CAR BOOKED NOT FOUND
  app.post("/booknotconfirmed/", function(req, res) {
    console.log("booking was not found");
    res.send();
  });

  //POST CAR EXIT
  app.post("/exit/:park/:number", function(req, res) {
    console.log("car exiting from floor " + req.params.park + ": " + req.params.number);

    function simulateExit(){
      mqttClient.publish('input/exit', req.params.park);
    }

    for (let i = 0; i < req.params.number; i++){
      setTimeout(simulateExit, 300 * (i + 1));
    }

    res.send(req.params.number);
  });

  //POST OF OUTPUT SENSORS, INVOKE SOCKET TO UPDATE FRON-END
  app.post("/greenlight/:status", function(req, res){
    greenLight = req.params.status;
    console.log('greenLight on: ' + greenLight);

    io.emit('greenLight', greenLight);
    res.send("OK");
  });
  app.post("/flooropened/:status", function(req, res){
    floor = req.params.status;
    console.log('floorOpened: ' + floor);
    
    io.emit('floorOpened', floor);
    res.send("OK");
  });

  /* HOME */
  app.get("/", function(req, res) {
     res.sendfile('index.html')
  });

  /* STATIC FILES */
  app.get(/^(.+)$/, function(req, res){
      res.sendFile( __dirname + req.params[0]);
  });
}
