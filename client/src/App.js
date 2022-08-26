import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Books from './routes/books/books.component';
import Book from './routes/book/book.component';
import Contents from './routes/contents/contents.component';
import Chapter from './routes/chapter/chapter.component';
import Edit from './routes/edit/edit.component';
import Slides from './routes/slides/slides.component';
import Basket from './routes/basket/basket.component';
import Words from './routes/words/words.component';
import Word from './routes/word/word.component';
import Text from './routes/Text/text.component';
import Read from './routes/read/read.component';
import FlashCards from './routes/flashcards/flashcards.component';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Books />} />
        <Route path=':book_title' element={<Book />}>
          <Route index element={<Contents />} />{' '}
          <Route path=':chapter' element={<Chapter />}>
            <Route path='edit' element={<Edit />}>
              <Route index element={<Text />} />
              <Route path='basket' element={<Basket />}>
                <Route index element={<Words />} />{' '}
                <Route path=':id' element={<Word />} />
              </Route>
            </Route>
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
