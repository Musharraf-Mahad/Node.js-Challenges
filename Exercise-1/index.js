const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  // middleware

let books = [
    {id: 1, title: 'Atomic Habits', author: 'James Clear'},
    {id: 2, title: 'Deep Work', author: 'Cal Newport'}
];

//POST  add new book
app.post('/books',(req, res) => {
    const bookData = req.body;

        // Validation
    if (!bookData.title || !bookData.author) {
        return res.status(400).json({
            message: 'Title and author are required'
        });
    }

    const newBook = {
        id: books.length + 1,
        title : bookData.title,
        author: bookData.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

//Get (Read all books)
app.get('/books', (req, res) => {
    res.json(books);
});

// SEARCH by author
app.get('/books/search', (req, res) => {
    const author = req.query.author;

    const results = books.filter(book =>
        book.author.toLowerCase().includes(author.toLowerCase())
    );

    res.json(results);
});

//Get (Read one Book)
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if(!book) {
       return res.status(404).send('Book not found');
    }
    res.json(book);
});

// Update(PUT)
app.put('/books/:id', (req, res) => {
    const book = books.find(b=> b.id == req.params.id);
    if(!book) {
       return res.status(404).send('book not found');
    }
    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

// Delete
app.delete('/books/:id', (req, res) => {
    books = books.filter(b=> b.id != req.params.id);
     res.send(`book ${req.params.id} Deleted`)
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});
