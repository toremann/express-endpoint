const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const path = require("path");
const app = express();
var ip = require("ip");
app.use(morgan());


// app.get('/', (req, res) => {
//     res.status(200).send('Hello there');
// })

// Endpoint for data ip:port/data/

app.get("/data/", (req, res) => {
    return fs.readFile(path.join(__dirname, "/data/data.json"), (err, data) => {
      if (err) {
        res.status(500).send("Helldev down");
      }
  
      res.status(200).send(JSON.parse(data.toString()));
    });
  });
    
  app.listen(3001, () => {
    console.log("Server started");
  });