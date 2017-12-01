var mongoose = require('mongoose');


var booksSchema = new mongoose.Schema({
	title: String,
	description: String,
	cost: Number, 
	image: String
});

var Books = mongoose.model('Books', booksSchema);

module.exports = Books;