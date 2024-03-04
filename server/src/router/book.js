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
    res.status(500).send("Internal Server Error");
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
    res.status(500).send("Internal Server Error");
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
    res.status(500).send("Internal Server Error");
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
    res.status(500).send("Internal Server Error");
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
    res.status(500).send("Internal Server Error");
  }
});

router.get("/search/:category?/:text?", checkToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 4;
  const skip = (page - 1) * limit;

  const { category, text } = req.params;

  let query = {};
  if (text) {
    switch (category) {
      case "author":
        query.author = { $regex: text, $options: "i" };
        break;
      case "title":
        query.title = { $regex: text, $options: "i" };
        break;

      default:
        query = {};
        break;
    }
  }

  try {
    let totalCount = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;

    let books = await Book.find(query)
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      page,
      totalPages: totalCount ? Math.ceil(totalCount / limit) : null,
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
