import express from "express";
import Book from "../model/book_model.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/create", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
