"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb://localhost:27017/tweeter', (err, db) => {
  if (err) throw err

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
  console.log('App is up and running!')  

})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
