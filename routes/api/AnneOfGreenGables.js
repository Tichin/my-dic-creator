const express = require("express");
const fs = require("fs");
const router = express.Router();

// Get all the chapters from Anne of Green Gables
const chapterObjectList = fs
  .readdirSync(
    "/Users/didiwu/Desktop/my-dic-creator/data/AnneOfGreenGables/chapters"
  )
  .map((filename) =>
    require(`../../data/AnneOfGreenGables/chapters/${filename}`)
  );
const contents = require("../../data/AnneOfGreenGables/contents");

// @route    GET api/AnneOfGreenGables/
// @desc     get id, chapterTitle, chapterNumber, romanNumerals,
// @access   Private
router.get("/", (req, res) => {
  res.send(contents);
});

// @route    GET api/AnneOfGreenGables/:chapter
// @desc     get chapters(title string)
// @access   Private
router.get("/:chapter", (req, res) => {
  const { chapter } = req.params;

  //get a chapter object from chapterObjectList
  const chapterObject = chapterObjectList.find(
    (chapterObject) => chapterObject["chapter"] === chapter
  );
  const subtitle = chapterObject["subtitle"];

  const getParagraphIdList = () => {
    // get ['paragraph01', 'paragraph02'...]
    return Object.keys(chapterObject).filter(
      (key) =>
        key !== "bookTitle" &&
        key !== "chapter" &&
        key !== "chapterBEAUTY" &&
        key !== "subtitle"
    );
  };

  /////////// from sentences/AnneOfGreenGables-chapter01.json ////
  // data structure: {'paragraph01':{'1':{textDics of the first sentence},'2':{},...},
  // 'paragraph02':{'1':{},'2':{}} }

  // Get [{textDic},{textDic}...]
  const paragraphTextDicList = () => {
    return getParagraphIdList()
      .map(
        (paragraphId) => chapterObject[paragraphId]
        // [{'1':{},'2':{}.....},{paragraph2}]
        // [{paragraph1},{paragraph2}]
      )
      .map((sentenceGroupObject) => {
        //{'1':{},'2':{}.....}
        return Object.values(sentenceGroupObject); // [{sentence1},{sentence2},{sentence3}...]
        // [[{sentence1},{sentence2},{sentence3}...],[{sentence1},{sentence2},{sentence3}...]...]
      })
      .flat();
  };

  //////////////////////////////////////////////////
  // use chapters/AnneOfGreenGables-chapter01.json ...
  // const paragraphTextDicList = getParagraphId().map(
  //   (paragraphId) => chapterObject[paragraphId]['textDic']
  // );
  // sentenceGroupObjectList
  // [{'1':{},'2':{}.....},{}]
  // [{paragraph1},{paragraph2}]
  res.send({
    subtitle: subtitle,
    paragraphTextDicList: paragraphTextDicList(),
  });
});

// @route    GET api/AnneOfGreenGables/:chapter/edit
// @desc     get
// @access   Private
router.get("/:chapter/edit", (req, res) => {
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

router.get("/:chapter/slides", (req, res) => {
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
    (chapterObject) => chapterObject["chapter"] === chapter
  );

  const subtitle = chapterObject["subtitle"];

  const paragraphIdList = (() => {
    // get ['paragraph01', 'paragraph02'...]
    return Object.keys(chapterObject).filter(
      (key) =>
        key !== "bookTitle" &&
        key !== "chapter" &&
        key !== "chapterBEAUTY" &&
        key !== "subtitle"
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

router.post("/:chapter", (req, res) => {
  const textDicObject = req.body.textDics;
  const chapter = req.body.chapter;
  // cartItems/textDics { id:{textDic}, id:{textDic}...}

  console.log(req.body.textDics);

  const chapterObject = chapterObjectList.find(
    (chapterObject) => chapterObject["chapter"] === chapter
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
        console.log("done");
      }
    }
  );

  res.send("Done!");
});

module.exports = router;
