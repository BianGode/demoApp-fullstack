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
var url = "mongodb://127.0.0.1:27017/Users";
// MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, client) {
//     if(err) { console.error(err) }
//     db = client.db('testDb') // once connected, assign the connection to the global variable
// })
mongoose.connect(url, { })
  .then((database) => {
    console.log('success connection');
  })
  .catch((err) => {
    console.log("Failed", err); 
  });

app.post("/login", (req, res) => {

  const { email, password } = req.body;
  // UserModel.findOne({email: email}).then((user)=> {
  //   console.log(user);
  // }).catch((err) => {
  //   console.log(err);
  // })
  UserModel.findOne({ email: email }).then((user) => {
    // console.log(user);
    if (user) {
      if (user.password === password) {
        console.log('Succcccccccc');
        res.json("Success");
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
