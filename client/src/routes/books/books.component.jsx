import React from 'react';
import { Link } from 'react-router-dom';
import './books.styles.scss';
import books from '../../bookData';

export default function Books() {
  const renderBookSnippets = books.map((book) => {
    const { id, book_title, bookTitleToDisplay, imageUrl } = book;
    const book_title_text = `${book_title}`;
    return (
      <div key={id} className='snippet-container'>
        <h3>{bookTitleToDisplay}</h3>
        <Link to={book_title_text}>
          <img src={imageUrl} alt={book_title_text} border='0' />
        </Link>
      </div>
    );
  });
  return <div className='books-snippet-container'>{renderBookSnippets}</div>;
}
