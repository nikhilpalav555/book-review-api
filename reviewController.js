const Review = require("../models/Review");
const Book = require("../models/Book");

exports.submitReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const bookId = req.params.id;

    const existing = await Review.findOne({ book: bookId, user: userId });
    if (existing) return res.status(400).json({ message: "You already reviewed this book" });

    const review = new Review({ book: bookId, user: userId, rating, comment });
    await review.save();

    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error submitting review" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not your review" });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Error updating review" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not your review" });

    await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
    await review.deleteOne();

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review" });
  }
};
