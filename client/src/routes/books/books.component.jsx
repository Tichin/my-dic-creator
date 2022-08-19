import React from 'react';
import { Link } from 'react-router-dom';
import './books.styles.scss';

export default function Books() {
  const books = [
    {
      id: 1,
      bookTitle: 'AnneOfGreenGables',
      book_title: 'Anne_Of_Green_Gables',
      bookTitleToDisplay: 'Anne of Green Gables',
      imageUrl: 'https://i.ibb.co/J2mbYHV/anne-of-green-gables-838-1196.png',
    },
    {
      id: 2,
      bookTitle: 'Walden',
      book_title: 'Walden',
      bookTitleToDisplay: 'Walden',
      imageUrl: 'https://i.ibb.co/0qC0wXX/Walden.png',
    },
    {
      id: 3,
      bookTitle: 'KlaraAndTheSun',
      book_title: 'Klara_And_The_Sun',
      bookTitleToDisplay: 'Klara and The Sun',
      imageUrl: 'https://i.ibb.co/J382zRT/Klara-And-The-Sun.png',
    },
  ];

  const renderBookSnippets = books.map((book) => {
    const { id, book_title, bookTitleToDisplay, imageUrl } = book;
    return (
      <div key={id} className='snippet-container'>
        <h3>{bookTitleToDisplay}</h3>
        <Link to={`${book_title}`}>
          <img src={imageUrl} alt={`${book_title}`} border='0' />
        </Link>
      </div>
    );
  });
  return <div className='books-snippet-container'>{renderBookSnippets}</div>;
}
