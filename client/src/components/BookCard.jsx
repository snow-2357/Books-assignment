// import React from "react";

export default function BookCard() {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-4 flex justify-between">
            <h1>1984(300)</h1>
            <h1>George Orwell</h1>
          </div>
          <p className="text-gray-700 text-base">
            1984 is a dystopian social science fiction novel by George Orwell.
            It was published in 1949 and is set in the year 1984 when most of
            the world population has become victims of perpetual war,
            omnipresent government surveillance, and propaganda.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="mx-4 m-2 px-8 text-gray-100 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Edit
          </button>
          <button
            type="submit"
            className="mx-4 m-2 px-8 text-gray-100 bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
