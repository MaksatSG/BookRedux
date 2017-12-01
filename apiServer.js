var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

var mongoose = require('mongoose');
var Books = require('./models/books.js');






app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost/bookShop');
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Db connection problem'));

app.use(session({
	secret: 'MaksiStark',
	saveUninitialized: false, 
	resave: false, 
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 2 },
	store: new MongoStore({mongooseConnection: db, ttl : 2 * 24 * 60 * 60})
}))


// Cart Api

//Post to cart session

app.post('/cart', function(req,res){

	const cart = req.body;

	if(req.session.cart !== undefined){
		req.session.cart = cart.concat(req.session.cart);

	} else {

		req.session.cart = cart;
	}


	req.session.save(function(err){
		if(err){
			throw err;
		}
		res.json(true);
	});

});


// Get Cart session

app.get('/cart', function(req, res){
		console.log(req.session.cart);
	if(typeof req.session.cart !== undefined){
		res.json(req.session.cart);
	}
})

app.put('/cart', function(req, res){
	var _id = req.body._id;
	var unit = req.body.unit;

	req.session.cart.forEach(function(cartItem){
		if(cartItem._id === _id){
			cartItem.quantity += unit;
		}
	});
	console.log(req.session.cart);
	res.json(true);
});

app.delete('/cart', function(req,res){

	const _id = req.body._id;

	const indexToDelete = req.session.cart.findIndex(function(cartItem){
		return _id === cartItem._id;
	})
	console.log(indexToDelete);
	req.session.cart = [...req.session.cart.slice(0, indexToDelete), ...req.session.cart.slice(indexToDelete+1)];
	console.log(req.session.cart);
	res.json(true);
})

// Api
app.post('/books', function(req,res){
	var book = req.body;

	Books.create(book, function(err, books){
		if(err){
			throw err;
		}
			res.json(books);
	})
});

app.get('/books', function(req, res){
	Books.find(function(err, books){
		if(err){
			throw err;
		}
			res.json(books);
	});
});

app.delete('/books/:_id', function(req, res){
	var query = { _id : req.params._id };

	Books.remove(query, function(err,books) {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.put('/books/:_id', function(req, res){
	var query = req.params._id;

	var book = req.body;
	var update = {
		'$set': {
			title: book.title,
			description: book.description, 
			image: book.image, 
			cost: book.cost
		}
	};
	console.log(update);
	var options = {new: true};

	Books.findOneAndUpdate(query, update, options, function(err, books){
		res.json(books);
	});

});


// APi for images

app.get('/images', function(req,res){
	const ImgFolder = __dirname + '/public/images/';
	const fs = require('fs');

	fs.readdir(ImgFolder, function(err, files){
		if(err){
			throw err;
		}
		else {

			var filesArr = [];
			files.forEach(function(file){
				filesArr.push({name: file});
			})
				res.json(filesArr);
		}
	})



})
//Api end

app.listen(3001, function(err){
	if(err){
		throw err;
	}
	console.log('apiServer is on ');
})


