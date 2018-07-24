var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


var app = express();
// "proxy": {
//   "/api/*": {
//     "target": "http://localhost:3001",
//     "secure": false
//   }
// }

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//   next();
// })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs Start
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
var Books = require('./models/books');


app.post('/books', function (req, res) {
  var book = req.body;
  Books.create(book, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  })
});

app.get('/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.delete('/books/:_id', function (req, res) {
  var query = { _id: req.params._id };
  Books.remove(query, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.put('/books/:_id', function (req, res) {
  var book = req.body;
  var query = { _id: req.params._id };
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  var options = { new: true };
  Books.findOneAndUpdate(query, update, options, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});
//APIs End
app.listen(3001, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("api listening on 3001");
})
