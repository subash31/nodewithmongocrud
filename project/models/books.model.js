const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        required: 'This field is required.'
    },
    Author: {
        type: String
    },
    Bookid: {
        type: String
    },
    Price: {
        type: String
    }
});


mongoose.model('books', bookSchema);