import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './edit.styles.scss';

export default function Edit() {
  const { book_title, chapter } = useParams();
  const chapterSlidesPath = `/${book_title}/${chapter}/slides`;
  // function to chapter++
  return (
    <div>
      edit
      <Link to={chapterSlidesPath}>Show Slides</Link>
      <Link to='/'>Previous Chapter</Link>
      <Link to='/'>Next Chapter</Link>
      <a>update pages</a>
    </div>
  );
}
