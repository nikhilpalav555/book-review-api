const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBook,
  getBooks,
  getBookById,
  searchBooks,
} = require("../controllers/bookController");

const { submitReview } = require("../controllers/reviewController");

// Book endpoints
router.post("/", auth, createBook);
router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);

// Review submission endpoint (books/:id/reviews)
router.post("/:id/reviews", auth, submitReview);

module.exports = router;
