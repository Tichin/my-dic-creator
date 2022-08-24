import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './edit.styles.scss';

export default function Edit() {
  const { book_title, chapter } = useParams();
  const [paragraphObjectList, setParagraphObjectList] = useState([]);
  const [subtitle, setSubtitle] = useState('');
  const chapterSlidesPath = `/${book_title}/${chapter}/slides`;
  const UNDERSCORE = '_';
  const NOSPACE = '';
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);
  // function to chapter++
  // re-render only after chapter changed or ask for re-fresh
  // to avoid to many rerenders
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/${bookTitle}/${chapter}/edit`)
      .then((response) => {
        const { subtitle, paragraphObjectList } = response.data;
        setParagraphObjectList(paragraphObjectList);
        setSubtitle(subtitle);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookTitle, chapter]);

  // paragraphObjectList: [{'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...},{'p2-s1':{sentence},'p2-s2':{sentenceDic}...}]
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}

  const renderParagraph = paragraphObjectList.map((paragraphObject, index) => {
    return (
      <div key={index}>
        <Paragraph paragraphObject={paragraphObject} pIndex={index + 1} />
        <br />
        <br />
      </div>
    );
  });

  return (
    <div>
      <div>
        <div className='left-panel'>
          {subtitle}
          {renderParagraph}
        </div>
        <div className='right-panel'>edit dictionary</div>
      </div>
      <Link to={chapterSlidesPath}>Show Slides</Link>
      <Link to='/'>Previous Chapter</Link>
      <Link to='/'>Next Chapter</Link>
      <a>update pages</a>
    </div>
  );
}

const Paragraph = (props) => {
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}
  const { paragraphObject, pIndex } = props;

  const sentenceDicArray = Object.values(paragraphObject); //[{sentenceDic},{sentenceDic}]
  const renderTextDic = sentenceDicArray.map((sentenceDic, index) => {
    const sIndex = index + 1;
    return Object.values(sentenceDic).map((textDic, keyIndex) => {
      const text = textDic.end ? (
        <span key={keyIndex}>
          {textDic.text}{' '}
          <sub className='sub'>
            p{pIndex}-s{sIndex}
          </sub>
        </span>
      ) : (
        <span key={keyIndex}>{textDic.text}</span>
      );
      return text;
    });
  });

  return <div>{renderTextDic}</div>;
};
