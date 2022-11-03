import React, { useContext, useState, Fragment, useEffect } from 'react';
import { VocCardBoxContext } from '../../contexts/vocabulary-list.context';
import './paragraph.styles.scss';

export default function Paragraph(props) {
  // parent: chapter, props:paragraphTextDic
  const [hover, setHover] = useState(false);
  const { addCardToBox, removeCardFromBox, boxItems } =
    useContext(VocCardBoxContext);

  const textDics = props.paragraphTextDic;

  // {paragraphTextDic: {AnneOfGreenGables-chapter01-paragraph02-001-There:{},AnneOfGreenGables-chapter01-paragraph02-001-separator:{} }

  // textDic:{
  // bookTitle: "AnneOfGreenGables"
  // chapter: "chapter01"
  // collectionKey: "AnneOfGreenGables-ch01-p31"
  // definition: ""
  // docRef: "074-latter-p31-ch01-AnneOfGreenGables"
  // id: "AnneOfGreenGables-chapter01-paragraph31-074-latter"
  // paragraph: "paragraph31"
  // sentenceExample: ""
  // sentenceFromBook: "So she took herself away, somewhat to\r Marilla's relief, for the latter felt her doubts and fears reviving under\r the influence of Mrs Rachel's pessimism."
  // text: "latter" }

  const onWordClick = (textDic) => {
    const { docRef } = textDic;

    if (docRef) {
      addCardToBox({
        ...textDic,
      });
    }
  };

  const onWordDoubleClick = (textDic) => {
    removeCardFromBox(textDic);
  };

  const onWordMouseOver = () => {
    setHover(true);
  };

  const renderParagraph = Object.values(textDics).map((textDic, index) => {
    const { id, text } = textDic;
    let { definition } = textDic;

    let className = '';

    if (boxItems.hasOwnProperty(id)) {
      className += ' bg-salmon';
    }
    if (boxItems[id] && boxItems[id]['definition']) {
      definition = boxItems[id]['definition'];
      className += '';
    }
    if (definition) {
      className += 'pink';
    }

    return (
      <Fragment key={id}>
        <span
          onClick={() => onWordClick(textDic, index)}
          onDoubleClick={() => onWordDoubleClick(textDic)}
          onMouseOver={() => onWordMouseOver()}
          className={`${className}  tooltip`}
        >
          {text}
          {hover && definition && (
            <span className='tooltiptext'>{definition}</span>
          )}
        </span>
      </Fragment>
    );
  });

  return (
    <div>
      {renderParagraph}
      <span id='paragraph-mark'>(paragraph{props.paragraphNumber})</span>
    </div>
  );
}
