const express = require ('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));

app.listen(3000, () => {
  console.log('Server has been started!');
});
