import React, { createContext, useState } from 'react';

export const WordContext = createContext({
  setCurrentWord: () => {},
  currentWord: {},
});

export const WordProvider = ({ children }) => {
  const [currentWord, setCurrentWord] = useState({});
  const value = { currentWord, setCurrentWord };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};
