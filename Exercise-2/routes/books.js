const express = require('express');
const router = express.Router();
const { getBooks, getBookInfo, createBook, updateBook, deleteBook } =  require('../controllers/booksController');

router.get('/',getBooks)
router.get('/:id',getBookInfo);
router.post('/create',createBook);
router.put('/update/:id',updateBook);
router.delete('/delete/:id',deleteBook);



module.exports = router;

