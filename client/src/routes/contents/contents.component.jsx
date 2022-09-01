import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './contents.styles.scss';

export default function Contents() {
  const [titleChapterSubtitleObjectList, setTitleChapterSubtitleObjectList] =
    useState([]);
  const { book_title } = useParams();
  const UNDERSCORE = '_';
  const NOSPACE = '';
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/${bookTitle}`)
      .then((response) => {
        console.log(response.data);
        setTitleChapterSubtitleObjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookTitle]);

  const renderTitleChapterSubtitle = titleChapterSubtitleObjectList.map(
    (titleChapterSubtitleObject) => {
      const { chapter, subtitle, chapterBEAUTY } = titleChapterSubtitleObject;
      const chapterEditPath = `${chapter}/edit`;
      const chapterSlidespath = `${chapter}/slides`;
      return (
        <div key={chapter}>
          <div>
            <span>{chapterBEAUTY} </span>
            <span>{subtitle}</span>
            <Link to={chapterEditPath}>Edit</Link>{' '}
            <Link to={chapterSlidespath}>Slides</Link>
          </div>
        </div>
      );
    }
  );

  return <div>{renderTitleChapterSubtitle}</div>;
}
