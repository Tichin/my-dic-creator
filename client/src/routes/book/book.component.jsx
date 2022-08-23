import React from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import './book.styles.scss';

export default function Book() {
  const { book_title } = useParams();
  const SPACE = ' ';
  const UNDERSCORE = '_';
  const bookTitleToDisplay = book_title.split(UNDERSCORE).join(SPACE);
  return (
    <div>
      <Link to='/'>back to home</Link>
      <div>{bookTitleToDisplay}</div>
      <Outlet />
    </div>
  );
}
