// src/components/Store.js
import React from 'react';
import './Card.css';
import './Shop.css'; // 새 스타일 파일

const Shop = () => {
  return (
    <div className="App">
      <div className="card white-card">
        <h1 className="plain-heading">🧢 상점</h1>
        <p>포인트로 아이템을 구매할 수 있습니다.</p>
      </div>
    </div>
  );
};

export default Shop;
