const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 4000

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected locally'))
    .catch(err => console.log('❌ Connection error:', err));


app.use(express.json());


//routes middleware
app.use('/books',bookRoutes);
app.use(cors({
    origin: ["http://localhost:5879"]
}))

app.use(morgan('dev'))



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});