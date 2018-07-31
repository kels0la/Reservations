// Dependencies
// ===========================================================
const express = require("express");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Data
// ===========================================================
let reservations = [];
let waitlist = [];



// Routes
// ===========================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "public/reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});

// API Routes
app.post('/api/reserve', function(req, res) {
    // send back conrimation?
    console.log('reservation received');
    // if (reservations.length < 5) { add to reservations}
    // else add to waitlist
})

app.get('/api/table', function(req, res) {
    // return an array of all reservations
    // send back json of reservations
})

app.get('/api/waitlist', function(req, res) {
    // send back json of waitlist
})




// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });