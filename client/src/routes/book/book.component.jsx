import React from "react";
import { useParams, Outlet } from "react-router-dom";
import "./book.styles.scss";

export default function Book() {
  const { book_title } = useParams();
  const SPACE = " ";
  const UNDERSCORE = "_";
  const bookTitleToDisplay = book_title.split(UNDERSCORE).join(SPACE);
  return (
    <div>
      <h2 className="book_title">{bookTitleToDisplay}</h2>
      <Outlet />
    </div>
  );
}
