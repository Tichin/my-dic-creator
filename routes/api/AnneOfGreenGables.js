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

// @route    GET api/AnneOfGreenGables/:chapter
// @desc     get
// @access   Private
router.get('/:chapter', (req, res) => {
  const { chapter } = req.params;

  const chapterObject = chapterObjectList.find(
    (chapterObject) => chapterObject['chapter'] === chapter
  );

  const subtitle = chapterObject['subtitle'];

  const getParagraphIdList = () => {
    // get ['paragraph01', 'paragraph02'...]
    return Object.keys(chapterObject).filter(
      (key) =>
        key !== 'bookTitle' &&
        key !== 'chapter' &&
        key !== 'chapterBEAUTY' &&
        key !== 'subtitle'
    );
  };

  const getParagraphAndSentenceList = () => {
    const paragraphIdList = getParagraphIdList();
    // get ['paragraph01', 'paragraph02'...] of certain chapter

    const sentenceObjectList = paragraphIdList.map(
      (paragraphId) => chapterObject[paragraphId]
    );
    // [{paragraph1},{paragraph2}]----------------------\
    //         \\                                        \
    // [{'1':{sentenceDic},'2':{sentenceDic}...},{'1':{sentence},'2':089{sentenceDic}...}]
    //
    const paragraphDicList = sentenceObjectList.map((sentenceObject) => {
      //{'1':{},'2':{}.....}

      const values = Object.values(sentenceObject);

      const paragraphDic = values.reduce(
        (previousValue, currentValue) =>
          Object.assign(previousValue, currentValue),
        {}
      ); // {........}

      return paragraphDic;
    });

    return [paragraphDicList, sentenceObjectList];
  };

  const [paragraphTextDicList, sentenceObjectList] =
    getParagraphAndSentenceList();

  // sentenceGroupObjectList
  // [{'1':{},'2':{}.....},{}]
  // [{paragraph1},{paragraph2}]
  res.send({
    subtitle: subtitle,
    paragraphTextDicList: paragraphTextDicList,
    sentenceObjectList: sentenceObjectList,
  });
});

// @route    GET api/AnneOfGreenGables/:chapter/slides
// @desc     get
// @access   Private

router.get('/:chapter/slides', (req, res) => {
  const { chapter } = req.params;

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

  const paragraphObjectList = paragraphIdList.map(
    (paragraphId) => chapterObject[paragraphId]
  );

  // paragraphObjectList: [{'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...},{'p2-s1':{sentence},'p2-s2':{sentenceDic}...}]
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}
  // Object.values(paragraphObject): {sentenceDic}

  //If I want to send [{p1-s1':{sentenceDic}},{'p1-s2':{sentenceDic}}, {'p2-s1':{sentenceDic})...] back => codes below
  // for (let paragraphObject of paragraphObjectList) {
  //   for (let [key, value] of Object.entries(paragraphObject)) {
  //     let sentenceObject = {};
  //     sentenceObject[key] = value;
  //     sentenceObjectList.push(sentenceObject);
  //   }
  // }

  // [{'p1-s1':[{dic},{dic}]]
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

module.exports = router;
