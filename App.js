// Filename - demoapp/app.js
// import { MongoClient } from "mongodb";
// import UserModel from './models/UserModel.js'
// const UserModel = require('./models/UserModel')
import express from "express";
// import mongoose from 'mongoose';
import cors from "cors";
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCMdcjZVnDgi015-rVq9eEne8zrc9XLt54",
  authDomain: "meowmeow2.firebaseapp.com",
  projectId: "meowmeow2",
  storageBucket: "meowmeow2.appspot.com",
  messagingSenderId: "292101105111",
  appId: "1:292101105111:web:969d441ae8e9c8ded19792",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password).then(() => {
    console.log('logged in succesfully')
    res.send({status: 'succes'})
  }).catch((err) => {
    console.log(err);
    res.send({status: 'Error', message: err})
  })
})

app.post("/api/signup", (req, res) => {
  const { email, password, name} = req.body
  createUserWithEmailAndPassword(auth, email, password)
  .then((result) => {
    console.log('registered succesfully');
    res.send({status: 'succes'})
  }).then(async (result) => {
    await setDoc(doc(db, "Users", name), {
      name: name,
      email: email
    }).then((setDocResult) => {
      console.log(setDocResult);
    }).catch((err) => {
      console.log(err);
    })
  }).catch((err) => {
    console.log(err);
  })
  // after sign up. create a user in the user table to link a cat to
})
// let db = 0;
// var url = "mongodb://127.0.0.1:27017/Users";
// MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, client) {
//     if(err) { console.error(err) }
//     db = client.db('testDb') // once connected, assign the connection to the global variable
// })
// mongoose.connect(url, { })
//   .then((database) => {
//     console.log('success connection');
//   })
//   .catch((err) => {
//     console.log("Failed", err);
//   });

// app.post("/login", (req, res) => {

//   const { email, password } = req.body;
//   // UserModel.findOne({email: email}).then((user)=> {
//   //   console.log(user);
//   // }).catch((err) => {
//   //   console.log(err);
//   // })
//   UserModel.findOne({ email: email }).then((user) => {
//     // console.log(user);
//     if (user) {
//       if (user.password === password) {
//         console.log('Succcccccccc');
//         res.json("Success");
//       } else {
//         res.json("The password is incorrect");
//       }
//     } else {
//       res.json("No record existed");
//     }
//   }).catch((err) => {
//     console.log(err);
//   })
// });

// app.post("/register", (req, res) => {
//   UserModel.create(req.body)
//     .then((users) => {
//       console.log('succes registation');
//       res.json(users);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
//     // add user to database
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
