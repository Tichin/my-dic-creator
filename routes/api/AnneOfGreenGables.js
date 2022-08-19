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
module.exports = router;
