import React from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import "./book.styles.scss";

export default function Book() {
  const { book_title } = useParams();
  const SPACE = " ";
  const UNDERSCORE = "_";
  const bookTitleToDisplay = book_title.split(UNDERSCORE).join(SPACE);
  return (
    <div id="allTop">
      <Link to=".">
        <h2 className="book_title" id="top">
          {bookTitleToDisplay}
        </h2>
      </Link>
      <Outlet />
    </div>
  );
}
