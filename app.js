const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const path = require('path');
const app = express();
var ip = require('ip');
app.use(morgan('short'));

const port = '3001'

app.get('/', (req, res) => {
    res.status(200).send('API ok');
})

// Endpoint for data ip:port/data/

app.get('/data/', (req, res) => {
    return fs.readFile(path.join(__dirname, '/data/data.json'), (err, data) => {
      if (err) {
        res.status(500).send('Stock API down');
      }
  
      res.status(200).send(JSON.parse(data.toString()));
    });
  });

  app.param('stock', function(req, res, next, stock) {
    const modified = stock.toUpperCase();
  
    req.stock = modified;
    next();
  });
  
  app.get("/data/:stock", (req, res) => {
    console.log(req.params)
    if (
      fs.existsSync(path.join(__dirname, "/data/" + `${req.stock}` + ".json"))
    ) {
      console.log(`\x1b[32m Found file: ${req.stock} \x1b[0m`);
      

      return fs.readFile(
        path.join(__dirname, "/data/" + `${req.stock}` + ".json"),
        (err, data) => {
          res.status(200).send(JSON.parse(data.toString()));
        }
      );
    } else {
      res.status(500).send(`Couldnt find ${req.stock}`);
      console.log(`\x1b[31m File not found: ${req.stock} \x1b[0m`)
      // fs.appendFile('not_found.log', `File not found: ${req.stock}\n`, (err) => {
      //   if (err) throw err;
      // });
    }
  });
  
  app.listen(port, () => {
    console.log('Server started', ip.address(), port);
  });