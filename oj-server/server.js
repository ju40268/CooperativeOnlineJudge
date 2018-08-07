var express = require('express')
var app = express()
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect('mongodb://127.0.0.1:27017');
mongoose.connection.on('connected', () => console.log('Mongodb Connected!'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use("/api/v1", restRouter);

app.use(function(req, res) {
    // send index.html to start client side
    res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});

app.listen(9000, function () {
  console.log('App listening on port 9000!')
})
