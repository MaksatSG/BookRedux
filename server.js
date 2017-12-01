var express = require("express");

var path = require('path');

var app = express();

app.use(express.static('public'));

app.get('*', function(req,res) {
	res.sendFile(path.resolve(__dirname ,'public', 'index.html'));
})



app.listen(3000, function(err){
	if(err)
		throw err;
	else
		console.log("Server is running");
})