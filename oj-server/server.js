var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var path = require('path');

// mongodb - mongoose
mongoose.connect('mongodb://127.0.0.1:27017');
mongoose.connection.on('connected', () => console.log('Mongodb Connected!'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

app.use(express.static(path.join(__dirname, '../public')));
app.use("/", indexRouter);
app.use("/api/v1/", restRouter);

app.listen(9000, function() {
    console.log("Listening on port 9000...");
});