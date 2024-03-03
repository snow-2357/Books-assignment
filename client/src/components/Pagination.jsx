/* eslint-disable react/prop-types */
// import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 ${
              currentPage === i
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                : "bg-white hover:bg-gray-100 hover:text-gray-700"
            } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            className={`flex items-center justify-center px-3 h-8 ${
              currentPage === 1
                ? "text-gray-500 bg-white border border-gray-300 rounded-l-lg"
                : "text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            className={`flex items-center justify-center px-3 h-8 ${
              currentPage === totalPages
                ? "text-gray-500 bg-white border border-gray-300 rounded-r-lg"
                : "text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
