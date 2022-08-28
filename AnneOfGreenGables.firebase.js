//AnneOfGreenGables-ch01-p01
// ch01- paragraph-1-33
const {
  getWordDocuments,
} = require('./client/src/utils/firebase/firebase.utils');

function getCh01CollectionKeys() {
  const ch01CollectionKeys = [];

  function leftFillNum(num, targetLength) {
    return num.toString().padStart(targetLength, 0);
  }

  for (let i = 1; i < 34; i++) {
    const pNumber = leftFillNum(i, 2);

    ch01CollectionKeys.push(`AnneOfGreenGables-ch01-p${pNumber}`);
  }
  return ch01CollectionKeys;
}

const ch01CollectionKeys = getCh01CollectionKeys();
getWordDocuments(ch01CollectionKeys[0]);
