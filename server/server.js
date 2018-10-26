var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname, '/../public')))






let port = 3007;
app.listen(port, () => {
  console.log('listening at port', port)
})