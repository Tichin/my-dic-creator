import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Books from './routes/books/books.component';
import Book from './routes/book/book.component';
import Contents from './routes/contents/contents.component';
import Chapter from './routes/chapter/chapter.component';
import Edit from './routes/edit/edit.component';
import Slides from './routes/slides/slides.component';
import Read from './routes/read/read.component';
import FlashCards from './routes/flashcards/flashcards.component';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Books />} />
        <Route path=':bookTitle' element={<Book />}>
          <Route index element={<Contents />} />{' '}
          <Route path=':chapter' element={<Chapter />}>
            <Route path='edit' element={<Edit />} />{' '}
            <Route path='slides' element={<Slides />} />{' '}
            <Route path='read' element={<Read />} />{' '}
            <Route path='flashcards' element={<FlashCards />} />{' '}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
