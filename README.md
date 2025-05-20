# 📚 Book Review API (Node.js + Express + MongoDB)

This is a RESTful API for a simple Book Review system built using Node.js, Express, and MongoDB. It allows users to register, login, add books, post reviews, and perform book searches with authentication via JWT.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- bcryptjs for password hashing
- dotenv for environment variables

---

## 🚀 Features

### 🔐 Authentication
- `POST /signup` – Register a new user
- `POST /login` – Login and receive a JWT token

### 📘 Books
- `POST /books` – Add a book (authenticated users only)
- `GET /books` – Get all books (supports pagination and filters: author, genre)
- `GET /books/:id` – Get book details by ID including average rating and reviews
- `GET /books/search?query=` – Search books by title or author (partial & case-insensitive)

### ✍️ Reviews
- `POST /books/:id/reviews` – Submit a review (1 per user per book)
- `PUT /reviews/:id` – Update your own review
- `DELETE /reviews/:id` – Delete your own review

---

## ⚙️ Installation and Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/nikhilpalav555/book-review-api.git
cd book-review-api
