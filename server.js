console.log("May Node be with you");
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const fetch = require("whatwg-fetch");
const app = express();

var db;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view-engine", "pug");

app.get("/", function(req, res) {
  db.collection("carparks").find().sort({"parkno": 1}).toArray(function(err, results) {
    if (err) {
      return console.log(err);
    }
    res.render("index.pug", {carparks: results});
  });
});

app.put('/carparkUpdate', function(req, res) {
  db.collection("carparks").find({parkno: req.body.parkno}).toArray(function(err, results) {
    if (err) {
      return console.log(err);
    }
    if (results[0].password != "") {
      //change to type ==reserved
      if (req.body.password == results[0].password) {
        sendUpdateToDb(req, res)
      }
      else if (results[0].status != "reserved") {
        //add cpass validation
        sendUpdateToDb(req, res)
      }
      else {
        res.send(false)
      }
    }
    else {
      sendUpdateToDb(req, res)
    }
  })
})

function sendUpdateToDb(req, res) {
  db.collection("carparks").findOneAndUpdate({parkno: req.body.parkno},
    {$set: {status: req.body.status}}, 
    {},
    function(err, result) {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    }
  )
}

MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, database) {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen(3000, function() {
    console.log("listening on 3000");
  });
});