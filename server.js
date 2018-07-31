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
    if (reservations.some(r => r.id === reservation.id) ||
        waitlist.some(r => r.id === reservation.id)) {
        res.status(400)
        res.send('ID is not unique.')
        return
    }

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

app.delete('/api/tables/:id', function(req, res) {
    deletedReservation = deleteReservation(req.params.id, reservations);
    if(deleteReservation) {
        let firstOnWaitlist = waitlist.shift()
        reservations.push(firstOnWaitlist)
    }

    res.json(deleteReservation)
})

app.delete('/api/waitlist/:id', function(req, res) {
    res.json(deleteReservation(req.params.id, waitlist))
})
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

function deleteReservation(id, arr) {
    let index;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            index = i
            break;
        }
    }

    if (index) {
        return arr.splice(index, 1)
    } else {
        return false
    }
}


// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });