const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

app.get('/cart', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

app.put('/cart', req => {
  fs.writeFile('./db/cart.json', JSON.stringify(req.body), err => {
    if (err) return console.log(err);
  });

  const date = new Date();
  const dataOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const stats = {
    date: date.toLocaleString('ru', dataOptions),
    action: req.body.length ? 'корзина обновлена' : 'корзина удалена'
  };

  fs.readFile('stats.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);

    const arr = JSON.parse(data);
    arr.push(stats);

    fs.writeFile('stats.json', JSON.stringify(arr), err => {
      if (err) return console.log(err);
    });
  });
});

app.listen(3000, () => {
  console.log('Server has been started!');
});
