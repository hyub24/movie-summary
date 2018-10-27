const express = require('express');

const app = express();
const path = require('path');
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api/movies/:movieId/summary', (req, res) => {
  db.getSummary((err, results) => {
    if (err) res.status(500).send(err.message);
    res.send(results[0]);
  });
});

const port = 3007;
app.listen(port, () => {
  console.log('listening at port', port);
});
