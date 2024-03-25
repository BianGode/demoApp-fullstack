// Filename - demoapp/app.js
import { MongoClient } from "mongodb";

import express from "express";
const app = express();

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.get("/test", (req, res) => {
  res.send({ message: "Hello" });
});

let db = 0;
var url = "mongodb://127.0.0.1:27017/";
// MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, client) {
//     if(err) { console.error(err) }
//     db = client.db('testDb') // once connected, assign the connection to the global variable
// })
MongoClient.connect(url)
  .then((database) => {
    db = database.db("testDb");
    console.log("succes");
  })
  .catch((err) => {
    console.log("Failed", err);
  });

app.get("/db", (req, res) => {
  // get form values from req

  db.collection("testCollection")
    .find({})
    .toArray((err, docs) => {
      if(err) {
        console.log(err);
      }
      return JSON.stringify(docs);
    }).then((resFinal) => {
      res.send(resFinal);
      // db.close();
    })
  // then((res) => {
  // }).catch((err) => {
  //   console.log(err);
  // })
});

// app.get('/db', function(req,res) {
//   db.collection('testCollection').find({}).toArray(function(err, docs) {
//     if(err) { console.error(err) }
//     console.log(docs);
//     // res.send(JSON.stringify(docs))
// })
// })

// app.get("/db", (req, res) => {
//   // database connection
//   var url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.1";
//   MongoClient.connect(url, function (err, db) {

//     if (err) throw err;
//     var dbo = db.db("testDb");
//     var myObj = { name: 'Hello', test: true}
//     dbo
//       .collection("testCollection").insertOne(myObj, (err, response) => {
//         if (err) throw err;
//         console.log('1 doc insterted');
//         db.close()
//       })
//   });
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
