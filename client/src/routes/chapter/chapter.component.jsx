import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './chapter.styles.scss';

export default function Chapter() {
  const { chapter } = useParams();
  return (
    <div className='chapter-container'>
      {chapter}
      <Outlet />
    </div>
  );
}
