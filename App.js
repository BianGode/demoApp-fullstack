
// Filename - demoapp/app.js
 
const express = require("express");
const app = express();
 
app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});
 
app.get('/test', (req, res) => {
  res.send({message: 'Hello'});
})

const PORT = process.env.PORT || 8080;
 
app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);