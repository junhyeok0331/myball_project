import React, { useState } from 'react';
import './Exchange.css';

const goods = [
  { id: 1, name: "야구공 굿즈", img: "/goods/ballg.png", price: 60 },
  { id: 2, name: "팀 머그컵", img: "/goods/mug.png", price: 80 },
  { id: 3, name: "응원봉", img: "/goods/cheerg.png", price: 40 },
  { id: 4, name: "키링", img: "/goods/wing.png", price: 50 },
  { id: 5, name: "유니폼", img: "/goods/uniform.png", price: 100 },
  { id: 6, name: "스티커팩", img: "/goods/stickers.png", price: 30 },
];

const Exchange = () => {
  const [exchangedItems, setExchangedItems] = useState([]);

  // 가격 오름차순 정렬
  const sortedGoods = [...goods].sort((a, b) => a.price - b.price);

  const handleExchange = (id, name) => {
    alert(`🎉 ${name} 교환이 완료되었습니다!`);
    setExchangedItems([...exchangedItems, id]); // 해당 ID를 기록
  };

  return (
    <div className="exchange-page">
      <div className="summary-card">
        <h1>🎟️ 굿즈 교환소</h1>
        <p>모은 누적 포인트로 굿즈를 교환해보세요!</p>

        <div className="goods-scroll-container">
          <div className="goods-grid">
            {sortedGoods.map((item) => {
              const isExchanged = exchangedItems.includes(item.id);
              return (
                <div key={item.id} className="goods-card">
                  <img src={item.img} className="goods-img" alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>💰 누적 {item.price}P</p>
                  <button
                    className="exchange-button"
                    onClick={() => handleExchange(item.id, item.name)}
                    disabled={isExchanged}
                  >
                    {isExchanged ? "교환 완료" : "교환"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
