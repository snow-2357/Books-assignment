import { useState, useEffect, useContext } from "react";
import axios from "axios";

import BookCard from "./BookCard";
import { AuthContext } from "../App";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const { userId, isLoggedIn, login, logout } = useContext(AuthContext);

  console.log(userId, isLoggedIn, login, logout);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book/all`
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {books &&
          books?.map((book, index) => <BookCard key={index} book={book} />)}
      </div>
    </div>
  );
}
