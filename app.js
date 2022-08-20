//jshint esversion:6

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});

app.get("/", function(req, res){
  //res.send("Server is up and running.");
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  //console.log("Post request received.");
  //console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "b136c0afc5a5fac8d10bf7ba05bf407b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      //const visibility = weatherData.visibility;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(weatherData);
      res.write("<p>The weather is currently " + description + ".</p>");
      res.write("<h1>The temperature in " + req.body.cityName + " is " + temperature +" degrees Celcius.<\h1>");
      res.write("<img src=" + iconurl + ">");
      //res.write("<h1>The visibility is " + visibility + ".</h1>");
      res.send();
    });
  });
});
