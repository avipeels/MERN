var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//handle session for the user cart
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# Mongo db connection error'));

//set up sessions

app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,//so that the session will not be resaved
  cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 },
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}))

//post session cart values

app.post('/cart', function (req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function (err) {
    if (err) {
      throw err;
    }
    res.json(req.session.cart)
  })
})

//get cart from session

app.get('/cart', function (req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
})

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
     console.log("# API DELETE BOOKS", err);
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

//image api - this will help understanding how to handle file system

app.get('/images', function (req, res) {
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');
  //read all files in the directory
  fs.readdir(imgFolder, function (err, files) {
    if (err) {
      return console.error(err);
    }
    const fileArr = [];

    files.forEach(function (file) {
      fileArr.push({ name: file })
    })
    res.json(fileArr);
  })
})

//APIs End
app.listen(3001, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("api listening on 3001");
})
