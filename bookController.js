const Book = require("../models/Book");
const Review = require("../models/Review");

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: "Error creating book", error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");
    if (!book) return res.status(404).json({ message: "Book not found" });

    const avgRating = book.reviews.length
      ? (book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length).toFixed(1)
      : "No ratings yet";

    res.json({ book, averageRating: avgRating });
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, "i");
  const books = await Book.find({
    $or: [{ title: regex }, { author: regex }]
  });
  res.json(books);
};
