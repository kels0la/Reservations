// Dependencies
// ===========================================================
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// ===========================================================
let reservations = [];
let waitlist = [];

let fakeReservation = {
    name: 'Joe',
    phone: '55555555',
    email: 'thing@thing.com',
    id: 'joe555'
}

reservations.push(fakeReservation)
waitlist.push(fakeReservation)

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
    let reservation = req.body

    if (reservations.length < 5 ) {
        reservations.push(reservation)
        res.json({hasReservation: true})
    } else {
        waitlist.push(reservation)
        res.json({hasReservation: false})
    }

    console.log('reservation received');
})

app.get('/api/tables', function(req, res) {
    res.json(reservations)
})

app.get('/api/waitlist', function(req, res) {
    res.json(waitlist)
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});



// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });