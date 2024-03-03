/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../App";

const BookForm = ({ book, onClose, setRefresh }) => {
  const { userToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: book?.title ?? "",
    author: book?.author ?? "",
    description: book?.description ?? "",
    pageCount: book?.pageCount ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (!book) {
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/book/create`,
          formData,
          {
            headers: { token: userToken },
          }
        );
      } else {
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/book/${book._id}`,
          formData,
          {
            headers: { token: userToken },
          }
        );
      }
      console.log("Book saved successfully:", response.data);
      onClose();
      setRefresh();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div className="p-8 m-8 space-y-4 md:space-y-6 sm:p-8 bg-white ">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Add a New Book
        </h1>
        <button
          onClick={onClose}
          type="button"
          className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-hs-overlay="#hs-basic-modal"
        >
          <span className="sr-only">Close</span>
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <form className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Author"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
          />
        </div>
        <div>
          <label
            htmlFor="pageCount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Page Count
          </label>
          <input
            type="number"
            name="pageCount"
            id="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Page Count"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full text-gray-100 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {!book ? "Add Book" : "Edit Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
