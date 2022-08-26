import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Word() {
  const navigate = useNavigate();

  return (
    <div>
      word
      <button onClick={() => navigate(-1)}>Go Back to Basket</button>
    </div>
  );
}
