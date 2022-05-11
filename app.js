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
  
  app.get('/data/:stock', (req, res) => {
    return fs.readFile(path.join(__dirname, '/data/'+`${req.stock}`+'.json'), (err, data) => {
      if (err) {

        // Bug, server crashes if file is not available.
        // Should print 500

        res.status(500).send('Couldnt find stock')
      }
    res.status(200).send(JSON.parse(data.toString()));
  });
});
  
  app.listen(port, () => {
    console.log('Server started', ip.address(), port);
  });