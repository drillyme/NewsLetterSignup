// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res) {
  var firstName = req.body.Fname;
  var lastName = req.body.Lname;
  var email = req.body.Email;

  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LASTNAME: lastName
      }
    }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/db9f14e6c3";//after lists come mine list id which will make people subscribe to my mailchimp page
  const options = {
    method: "POST",
    auth: "drillyme:9972141e24fd5656275393f72c17be98-us1"
  };
  const request = https.request(url,options, function(response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/succes.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
      request.on("data", function(data) {
        console.log(JSON.parse(data));
      })
  })
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
// apiid: 36cf3dfd214533b3a7fc737adcd68a34-us1
// unique id for my audience : db9f14e6c3
