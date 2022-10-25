import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./contents.styles.scss";

export default function Contents() {
  const [contents, setContents] = useState([]);
  const { book_title } = useParams();
  const UNDERSCORE = "_";
  const NOSPACE = "";
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/${bookTitle}`)
      .then((response) => {
        setContents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookTitle]);
  console.log(contents);

  const renderContents = contents.map((chapter) => {
    const { id, chapterTitle } = chapter;
    const chapTitle = `Chapter ${id}. \u00A0  ${chapterTitle}`;
    const chapterLink = `/chapter${id}`;
    return (
      <div key={id} className="item">
        <Link to={chapterLink}>{chapTitle}</Link>
      </div>
    );
  });

  return <div className="list">{renderContents}</div>;
}
