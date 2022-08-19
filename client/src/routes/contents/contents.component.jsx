import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './contents.styles.scss';

export default function Contents() {
  const [] = useState([]);
  // useEffect => load contents array
  // useParams => if book title change => useEffect

  return <div>contents</div>;
}
