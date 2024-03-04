/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import BookCard from "./BookCard";
import { AuthContext } from "../App";
import BookForm from "./BookForm";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const { logout } = useContext(AuthContext);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const [url, setUrl] = useState(
    `${import.meta.env.VITE_BACKEND_URL}/book/search/all`
  );
  console.log(url);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(url, {
          headers: { token: userToken },
          params: { page: currentPage, limit: pageSize },
        });
        setBooks(response?.data?.books);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [url, refresh, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async (filterBy, filterText) => {
    setCurrentPage(1);
    setTotalPages(1);
    setUrl(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/book/search/${filterBy}/${filterText}`
    );
  };

  return (
    <div className="relative">
      <div className="flex w-full justify-between my-4 px-4">
        <button
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add new Book
        </button>
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          LogOut
        </button>
      </div>
      <SearchBar handleSearch={(type, text) => handleSearch(type, text)} />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
          {books && books.length <= 0 ? (
            <>Empty list</>
          ) : (
            <>
              {books?.map((book, index) => (
                <BookCard
                  key={index}
                  book={book}
                  openEditModal={openEditModal}
                  openDeleteModal={openDeleteModal}
                  setCurrentBook={(book) => setCurrentBook(book)}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <BookModal
        isOpen={addModalOpen}
        onClose={closeAddModal}
        setRefresh={() => setRefresh((prev) => !prev)}
      />
      <BookEditModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        book={currentBook}
        setRefresh={() => setRefresh((prev) => !prev)}
      />
      <BookDeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        book={currentBook}
        setRefresh={() => setRefresh((prev) => !prev)}
      />
    </div>
  );
}

const BookModal = ({ isOpen, onClose, setRefresh }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-20 top-[-16px] w-full h-screen bg-gray-300 bg-opacity-20">
      <div className="">
        <BookForm onClose={onClose} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

const BookEditModal = ({ isOpen, onClose, book, setRefresh }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-20 top-[-16px] w-full h-screen bg-gray-300 bg-opacity-20">
      <div className="">
        <BookForm book={book} onClose={onClose} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

const BookDeleteModal = ({ isOpen, onClose, book, setRefresh }) => {
  const { userToken } = useContext(AuthContext);
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/book/${book._id}`,
        {
          headers: { token: userToken },
        }
      );

      onClose();
      setRefresh();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="absolute z-20 top-[-16px] w-full h-screen bg-gray-300 bg-opacity-20">
      <div className="">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">
              Delete Book
            </h3>
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
          <div className="p-4 overflow-y-auto">
            <p className="mt-1 text-gray-800 dark:text-gray-400">
              Are you sure u want to delete{" "}
              <span className="font-bold"> {book.title}</span>?
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
            <button
              onClick={onClose}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-basic-modal"
            >
              Close
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
