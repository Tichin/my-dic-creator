import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Paragraph from "../../components/paragraph/paragraph1.component";
// import { WordContext } from "../../contexts/word.context";
import "./read.styles.scss";

export default function Chapter() {
  const { book_title, chapter } = useParams();
  console.log(book_title);
  const bookTitle = book_title.split("_").join("");
  console.log(bookTitle);
  const [chapterData, setChapterData] = useState({});
  // const { currentWord } = useContext(WordContext);
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/${bookTitle}/${chapter}`)
      .then(function (response) {
        // handle success
        // response.data:{subtitle:'subtitle of the chapter1', paragraphTextDicList:[textDic of paragraph1]}
        setChapterData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [bookTitle, chapter]);

  const renderParagraphs = chapterData.paragraphTextDicList?.map(
    (textDics, index) => {
      console.log(textDics);
      return (
        <div key={index}>
          <Paragraph textDics={textDics} paragraphNumber={index + 1} />
          <br />
        </div>
      );
    }
  );
  return (
    <div className="chapter-container">
      <Link to="edit" className="GoToButton">
        Go and Edit the Dictionary
      </Link>
      <div className="text-container">
        <div className="indent lineHeight"> {renderParagraphs}</div>
        <div className="endChapter">
          <h3>END OF {chapter.toUpperCase()}</h3>
        </div>
        <a href="#top">Go To Top</a>
        <Link to={`/${book_title}`}>Go to Contents</Link>
      </div>
    </div>
  );
}
