import express from "express";
import Book from "../model/book_model.js";
import { checkToken } from "../utils/auth.js";

const router = express.Router();

// router.get("/all", checkToken, async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get("/all", checkToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 4;

  try {
    const totalCount = await Book.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;

    const books = await Book.find().skip(offset).limit(limit);

    res.status(200).json({
      page,
      totalPages,
      books,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/create", checkToken, async (req, res) => {
  const { title, author, description, pageCount } = req.body;

  try {
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      return res.status(400).send({ message: "Book already exists" });
    }

    const book = new Book({ title, author, description, pageCount });
    await book.save();
    res.status(201).json({ message: "New book created", book });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  const { title, author, description, pageCount } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, description, pageCount },
      { new: true }
    );
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).send("Book deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/search", async (req, res) => {});
export default router;
