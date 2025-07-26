const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Trailer = require('./models/trailer'); // Trailer schema file path

mongoose.connect('mongodb+srv://michelle:lLcql2ToCXWqJaM4@it6203.seakr.mongodb.net/IT6203?retryWrites=true&w=majority')
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Error connecting to MongoDB Atlas", err));



// CORS Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// Body Parsing Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





// Get all trailers
app.get('/api/trailers', (req, res) => {
    Trailer.find()
        .then((data) => {
            console.log('Fetched trailers from MongoDB:', data); // Log to backend terminal
            res.status(200).json(data);
        })
        .catch((err) => {
            console.error('Error fetching trailers:', err); // Log errors
            res.status(500).json({ error: err });
        });
});

// Add a new trailer
app.post('/api/trailers', (req, res) => {
    const trailer = new Trailer({
        movie_Name: req.body.movie_Name,
        genres: req.body.genres || 'Unknown',
        Year: req.body.Year || 'Unknown',
        author: req.body.author || 'Unknown',
        Ratings: req.body.Ratings || 'N/A',
        reviews: req.body.reviews || 'N/A',
        trailerLink: req.body.trailerLink,
    });

    trailer.save()
        .then((savedTrailer) => {
            console.log('Trailer added:', savedTrailer); // Log added trailer
            res.status(201).json({ message: 'Trailer added successfully' });
        })
        .catch((err) => {
            console.error('Error adding trailer:', err); // Log errors
            res.status(500).json({ error: err });
        });
});

// Update a trailer by ID
app.put('/api/trailers/:id', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Trailer.findByIdAndUpdate(
            req.params.id,
            {
                movie_Name: req.body.movie_Name,
                genres: req.body.genres,
                Year: req.body.Year,
                author: req.body.author,
                Ratings: req.body.Ratings,
                reviews: req.body.reviews,
                trailerLink: req.body.trailerLink,
            },
            { new: true }
        )
        .then((updatedTrailer) => {
            console.log('Trailer updated:', updatedTrailer); // Log updated trailer
            res.status(200).json(updatedTrailer);
        })
        .catch((err) => {
            console.error('Error updating trailer:', err); // Log errors
            res.status(500).json({ error: err });
        });
    } else {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

// Delete a trailer by ID
app.delete('/api/trailers/:id', (req, res) => {
    Trailer.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log(`Trailer with ID ${req.params.id} deleted`); // Log deleted trailer ID
            res.status(200).json({ message: 'Trailer deleted successfully' });
        })
        .catch((err) => {
            console.error('Error deleting trailer:', err); // Log errors
            res.status(500).json({ error: err });
        });
});


// Find a trailer by ID
app.get('/api/trailers/:id', (req, res) => {
    Trailer.findById(req.params.id)
        .then(trailer => res.status(200).json(trailer))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = app;
