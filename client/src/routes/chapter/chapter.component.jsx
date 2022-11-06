import React, { useEffect, useState } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./chapter.styles.scss";

export default function Chapter() {
  const { chapter, book_title } = useParams();
  const bookTitle = book_title.split("_").join("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/${bookTitle}/${chapter}`)
      .then(function (response) {
        // handle success
        // response.data:{subtitle:'subtitle of the chapter1', paragraphTextDicList:[textDic of paragraph1]}
        setSubtitle(response.data.subtitle);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [bookTitle, chapter]);

  return (
    <div className="chapter-container">
      <div className="subtitle_border subtitle">
        <Link to={`/${book_title}/${chapter}`}>
          <span>{chapter.toUpperCase()} </span>-<span>{subtitle}</span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
