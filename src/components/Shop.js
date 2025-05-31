import React from 'react';
import './Shop.css';
import { useEquippedItem } from '../components/EquippedItemContext';

const items = [
  { id: 1, name: "윈지 모자", price: 80, img: "/shop-list/winghat.png" },
  { id: 2, name: "블루 티셔츠", price: 100, img: "/shop-list/wingshirt.png" },
  { id: 3, name: "캡모자", price: 50, img: "/images/cap.png" },
  { id: 4, name: "트레이닝 팬츠", price: 120, img: "/images/pants.png" },
];

const Shop = () => {
  const { setEquippedItem } = useEquippedItem();

  const handleBuy = (item) => {
    setEquippedItem(item); // 구매하면 장착 아이템 변경
    alert(`${item.name} 아이템이 장착되었습니다!`);
  };

  return (
    <div className="shop-page">
      <div className="summary-card">
        <h1>🧢 상점</h1>
        <p>원하는 의상을 선택해보세요!</p>

        <div className="item-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="image-container">
                <img src={item.img} alt={item.name} className="item-image" />
              </div>
              <h3>{item.name}</h3>
              <p className="price">💰 {item.price}P</p>
              <button
                className="buy-button"
                onClick={() => handleBuy(item)}
              >
                구매
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
