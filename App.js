// Filename - demoapp/app.js
import { MongoClient } from "mongodb";
import UserModel from './models/UserModel.js'
// const UserModel = require('./models/UserModel')
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

let db = 0;
var url = "mongodb://127.0.0.1:27017/testDb";
// MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, client) {
//     if(err) { console.error(err) }
//     db = client.db('testDb') // once connected, assign the connection to the global variable
// })
mongoose.connect(url)
  .then((database) => {
    db = database.db
    console.log('success connection');
    // console.log(database.status);
    // db = database.db("testDb");
  })
  .catch((err) => {
    console.log("Failed", err); 
  });

app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  UserModel.find({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success!!!");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  }).catch((err) => {
    console.log(err);
  })
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => {
      console.log('succes registation');
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

// app.get("/db", (req, res) => {
//   // get form values from req

//   db.collection("testCollection")
//     .find({})
//     .toArray((err, docs) => {
//       if(err) {
//         console.log(err);
//       }
//       return JSON.stringify(docs);
//     }).then((resFinal) => {
//       res.send(resFinal);
//       // db.close();
//     }).catch((err) => {
//       console.log(err);
//     })
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
