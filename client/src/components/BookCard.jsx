/* eslint-disable react/prop-types */
// import React from "react";

export default function BookCard({
  book,
  openEditModal,
  openDeleteModal,
  setCurrentBook,
}) {
  return (
    <>
      <div className=" relative max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className=" mb-4 flex flex-col justify-between">
            <h1 className="font-bold text-xl">
              {book?.title}({book?.pageCount})
            </h1>
            <p className="font-semibold text-md">{book?.author}</p>
          </div>
          <p className="text-gray-700 text-base">{book.description}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              setCurrentBook(book);
              openEditModal();
            }}
            className="mx-4 m-2 px-8 text-gray-100 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setCurrentBook(book);
              openDeleteModal();
            }}
            className="mx-4 m-2 px-8 text-gray-100 bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
