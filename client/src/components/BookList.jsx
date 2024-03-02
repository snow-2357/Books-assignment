// import React from 'react'

import BookCard from "./BookCard";

export default function BookList() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        <BookCard /> <BookCard /> <BookCard /> <BookCard /> <BookCard />
        <BookCard />
      </div>
    </div>
  );
}
