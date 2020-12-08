const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const books = mongoose.model('books');

router.get('/', (req, res) => {
    res.render("books/addOrEdit", {
        viewTitle: "Insert book"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var book = new books();
    book.BookName = req.body.fullName;
    book.Author = req.body.email;
    book.Bookid = req.body.mobile;
    book.Price = req.body.city;
    book.save((err, doc) => {
        if (!err)
            res.redirect('books/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/addOrEdit", {
                    viewTitle: "Insert book",
                    books: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    books.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('books/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("books/addOrEdit", {
                    viewTitle: 'Update book',
                    books: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    books.find((err, docs) => {
        if (!err) {
            // console.log("Retirved Objects",docs);
            res.render("books/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving book list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'BookName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'Author':
                body['AuthorError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    books.findById(req.params.id, (err, doc) => {
        console.log("Update Data",doc);
        if (!err) {
            res.render("books/addOrEdit", {
                viewTitle: "Update book",
                books: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    books.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/books/list');
        }
        else { console.log('Error in book delete :' + err); }
    });
});

module.exports = router;