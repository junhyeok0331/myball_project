import React, { useState } from 'react';
import './Shop.css';
import { useEquippedItem } from '../components/EquippedItemContext';
import { usePoint } from '../components/PointContext';

const items = [
  { id: 1, name: "윈지 모자", price: 50, img: "/shop-list/winghat.png" },
  { id: 2, name: "윈지 티셔츠", price: 80, img: "/shop-list/wingshirt.png" },
  { id: 3, name: "캡모자", price: 50, img: "/images/cap.png" },
  { id: 4, name: "트레이닝 팬츠", price: 120, img: "/images/pants.png" },
];

const Shop = () => {
  const { setEquippedItem } = useEquippedItem();
  const { point, spendPoint, addPoint } = usePoint();

  const [purchasedItems, setPurchasedItems] = useState([]);

  const handleBuy = (item) => {
    if (purchasedItems.includes(item.id)) return;

    if (point < item.price) {
      alert("포인트가 부족합니다.");
      return;
    }

    if (spendPoint(item.price)) {
      setEquippedItem(item);
      setPurchasedItems(prev => [...prev, item.id]);
      alert(`${item.name} 아이템이 장착되었습니다!`);
    }
  };

  const restorePoints = (amount) => {
    addPoint(amount);
    alert(`${amount}P가 복구되었습니다!`);
  };

  return (
    <div className="shop-page">
      <div className="summary-card">
        <h1>🧢 상점</h1>
        <p>남은 포인트: 💰 {point}P</p>

        <button 
          style={{ marginBottom: '10px', padding: '5px 10px', cursor: 'pointer' }} 
          onClick={() => restorePoints(100)}
        >
          포인트 100P 복구하기 (개발자용)
        </button>

        <div className="item-grid">
          {items.map(item => {
            const isPurchased = purchasedItems.includes(item.id);
            return (
              <div key={item.id} className="item-card">
                <div className="image-container">
                  <img src={item.img} alt={item.name} className="item-image" />
                </div>
                <h3>{item.name}</h3>
                <p className="price">💰 {item.price}P</p>
                <button
                  className="buy-button"
                  onClick={() => handleBuy(item)}
                  disabled={isPurchased}
                  style={{
                    backgroundColor: isPurchased ? '#a0a0a0' : '',
                    cursor: isPurchased ? 'default' : 'pointer',
                  }}
                >
                  {isPurchased ? "구매완료" : "구매"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
