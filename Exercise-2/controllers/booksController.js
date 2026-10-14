const Book = require('../models/Book');

// Read Books
exports.getBooks = async (req, res) => {
   const books = await Book.find();
   res.json(books);
}

// Read a Book
exports.getBookInfo = async (req, res) => {
    const { id } = req.params;
    try {
    const book = await Book.findById(req.params.id)
    if(!book) {
        return res.status(404).send('book not found');
    } res.json(book)
} catch(err) {
    res.status(500).send('Server error');
}
}

// create a book
exports.createBook = async (req, res) => {
    try {
        const { title, author } = req.body || {};

        // Validate required fields
        if (!title || !author) {
            return res.status(400).json({
                message: 'Title and author are required'
            });
        }

        const book = new Book(req.body);
        const saved = await book.save();

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//update a book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, 
        {new: true} // returns updated document
    );
    if(!updatedBook) {
        return res.status(404).send("Book not found");
    }
    res.json(updatedBook);
} catch(err) {
    res.status(500).send('Server error');
}
};

//Delete a book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            return res.status(404).send('Book not found');
        } res.send(`Book with ${id} deleted`);
    } catch(err) {
        res.status(500).send('Server error');
    }
}