import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./home.styles.scss";
import books from "../../bookData";
import { ReactComponent as LemonIcon } from "../../assets/lemon.svg";

export default function Home() {
  // const renderOtherBooks = books.map((book) => {
  //   const { id, book_title, bookTitleToDisplay } = book;
  //   const pathToBook = `${book_title}`;
  //   return (
  //     <div className="book-link" id={id}>
  //       <Link to={pathToBook}>{bookTitleToDisplay}</Link>
  //     </div>
  //   );
  // });
  // {
  //   id: 1,
  //   bookTitle: 'AnneOfGreenGables',
  //   book_title: 'Anne_Of_Green_Gables',
  //   bookTitleToDisplay: 'Anne of Green Gables',
  //   imageUrl: 'https://i.ibb.co/J2mbYHV/anne-of-green-gables-838-1196.png',
  // },

  return (
    <div className="home-container">
      <nav className="nav-container">
        <Link to="/" className="logo-container">
          <LemonIcon className="lemon-icon" />
          <span className="title rainbow-letters">Lemon Book Club</span>
        </Link>
        <div className="nav-links-container">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <div className="nav-link">Books</div>
          <div className="nav-link">Sign In</div>
        </div>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>

      {/* <footer className='footer-container'>
        <div className='book-links'>{renderOtherBooks}</div>
      </footer> */}
    </div>
  );
}
