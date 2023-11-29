
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRouter = require('./routes/movies');
const commentRouter = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use routes
app.use('/movies', movieRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
