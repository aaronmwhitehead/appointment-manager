const express = require('express');
const path = require("path");
const app = express();
const routes = require('./routes');
require("dotenv").config()

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/', routes);

app.use(express.static(path.resolve(__dirname, "./client/build")));

// Catch-all
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
