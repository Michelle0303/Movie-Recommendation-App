const mongoose = require('mongoose');

// Define the schema for a trailer
const trailerSchema = new mongoose.Schema({
    movie_Name: { type: String, required: true }, // Name of the movie
    genres: { type: String, required: true }, // Genres of the movie
    Year: { type: String, required: true }, // Year of release
    author: { type: String, required: true }, // Author or director
    Ratings: { type: String, required: true },
    reviews: { type: String, required: true }, 
    trailerLink: { type: String, required: true }, // YouTube or other trailer link
    
});

// Create a model from the schema
// The collection name will be 'trailers' in the MongoDB database
module.exports = mongoose.model('Trailer', trailerSchema, 'trailers');
