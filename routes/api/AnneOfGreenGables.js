const express = require('express');
const fs = require('fs');
const router = express.Router();

// the complete book chapters
// const chapterObjectList = fs
//   .readdirSync('/Users/didiwu/Desktop/bookDic/data/AnneOfGreenGables/sentences')
//   .map((filename) =>
//     require(`../../data/AnneOfGreenGables/sentences/${filename}`)
//   );

const chapterObject = require('../../data/AnneOfGreenGables/AnneOfGreenGables-chapter01.json');
const chapterObjectList = [chapterObject];

// @route    GET api/AnneOfGreenGables/
// @desc     get book title, chapter(number), and subtitle
// @access   Private
router.get('/', (req, res) => {
  const titleChapterSubtitleObjectList = chapterObjectList.map(
    (chapterObject) => ({
      chapter: chapterObject['chapter'],
      subtitle: chapterObject['subtitle'],
      bookTitle: chapterObject['bookTitle'],
      chapterBEAUTY: chapterObject['chapterBEAUTY'],
    })
  );

  res.send(titleChapterSubtitleObjectList);
});

// @route    GET api/AnneOfGreenGables/:chapter/edit
// @desc     get
// @access   Private
router.get('/:chapter/edit', (req, res) => {
  const { chapter } = req.params;

  const [paragraphObjectList, subtitle] = getParagraphObjectListAndSubtitle(
    chapter,
    chapterObjectList
  );

  // [{paragraph1},{paragraph2}]
  res.send({
    subtitle: subtitle,
    paragraphObjectList,
  });
});

// @route    GET api/AnneOfGreenGables/:chapter/slides
// @desc     get
// @access   Private

router.get('/:chapter/slides', (req, res) => {
  const { chapter } = req.params;

  const [paragraphObjectList, subtitle] = getParagraphObjectListAndSubtitle(
    chapter,
    chapterObjectList
  );

  // paragraphObjectList: [{'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...},{'p2-s1':{sentence},'p2-s2':{sentenceDic}...}]
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}
  // Object.values(paragraphObject): {sentenceDic}

  // [{'p1-s1':[{dic},{dic}]...]
  let sentenceObjectList = [];

  for (let paragraphObject of paragraphObjectList) {
    for (let [key, value] of Object.entries(paragraphObject)) {
      let textDicArray = Object.values(value);
      let sentenceObject = {};

      sentenceObject[key] = textDicArray;
      sentenceObjectList.push(sentenceObject);
    }
  }

  res.send({
    subtitle: subtitle,
    sentenceObjectList: sentenceObjectList,
  });
});

const getParagraphObjectListAndSubtitle = (chapter, chapterObjectList) => {
  const chapterObject = chapterObjectList.find(
    (chapterObject) => chapterObject['chapter'] === chapter
  );

  const subtitle = chapterObject['subtitle'];

  const paragraphIdList = (() => {
    // get ['paragraph01', 'paragraph02'...]
    return Object.keys(chapterObject).filter(
      (key) =>
        key !== 'bookTitle' &&
        key !== 'chapter' &&
        key !== 'chapterBEAUTY' &&
        key !== 'subtitle'
    );
  })();

  // paragraphObjectList: [{'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...},{'p2-s1':{sentence},'p2-s2':{sentenceDic}...}]

  const paragraphObjectList = paragraphIdList.map(
    (paragraphId) => chapterObject[paragraphId]
  );

  return [paragraphObjectList, subtitle];
};

// @route    POST api/AnneOfGreenGables/:chapter
// @desc     post
// @access   Private

router.post('/:chapter', (req, res) => {
  const textDicObject = req.body.textDics;
  const chapter = req.body.chapter;
  // cartItems/textDics { id:{textDic}, id:{textDic}...}

  console.log(req.body.textDics);

  const chapterObject = chapterObjectList.find(
    (chapterObject) => chapterObject['chapter'] === chapter
  );
  Object.values(textDicObject).forEach((textDic) => {
    const { paragraph, sentence, id } = textDic;
    const pNumber = Number(paragraph.slice(-2));
    const sentenceMarker = `p${pNumber}-s${sentence}`;
    const oldTextDic = chapterObject[paragraph][sentenceMarker][id];
    chapterObject[paragraph][sentenceMarker][id] = {
      ...oldTextDic,
      ...textDic,
    };
  });

  //`/Users/didiwu/Desktop/my-dic-creator/data/AnneOfGreenGables/AnneOfGreenGables-${chapter}.json`
  fs.writeFile(
    `/Users/didiwu/Desktop/my-dic-creator/data/AnneOfGreenGables/AnneOfGreenGables.json`,
    JSON.stringify(chapterObject),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('done');
      }
    }
  );

  res.send('Done!');
});

module.exports = router;
