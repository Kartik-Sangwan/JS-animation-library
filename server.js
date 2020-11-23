/* server.js - Express server*/
"use strict";
const log = console.log;
log("Express server");

const express = require("express");

const app = express();

app.use(express.static(__dirname + "/pub"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});

// THIS IS THE URL TO ACCESS THE WEBSITE:
// https://tranquil-badlands-02136.herokuapp.com/home.html
