import React, { useState } from 'react';
import './Shop.css';
import axios from 'axios';
import { useEquippedItem } from '../components/EquippedItemContext';
import { usePoint } from '../components/PointContext';

const items = [
  { id: 1, name: "윈지 모자", price: 50, img: "/shop-list/winghat.png" },
  { id: 2, name: "윈지 티셔츠", price: 80, img: "/shop-list/wingshirt.png" },
];

const Shop = () => {
  const { setEquippedItem } = useEquippedItem();
  const { point, setPoint, addPoint } = usePoint();
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // 1) 아이템 구매 핸들러
  const handleBuy = async (item) => {
    if (purchasedItems.includes(item.id)) {
      return; // 이미 구매済
    }

    // 로컬 포인트가 부족할 때
    if (point < item.price) {
      alert("포인트가 부족합니다.");
      return;
    }

    // localStorage에서 userId 조회
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // 2) 백엔드 /purchase 엔드포인트로 요청
      const response = await axios.post(
        'http://172.20.84.222:8080/api/Shop/purchase',
        {
          userId: Number(userId),
          itemId: item.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // 3) 백엔드가 { message, remainingPoints }를 내려준다고 가정
      if (response.status === 200) {
        const { remainingPoints } = response.data;

        // 4) 로컬 포인트 컨텍스트에 실제 남은 포인트 반영
        setPoint(remainingPoints);

        // 5) 아이템 장착 및 구매된 아이템 목록 갱신
        setEquippedItem(item);
        setPurchasedItems(prev => [...prev, item.id]);

        alert(`${item.name} 아이템이 구매 및 장착되었습니다! 남은 포인트: ${remainingPoints}P`);
      }
    } catch (err) {
      console.error('[구매 오류]', err);
      // 백엔드가 내려준 에러 메시지가 있으면 표시
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("아이템 구매 중 네트워크 오류가 발생했습니다.");
      }
    }
  };

  // 6) 개발자용: 포인트 복원
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

        {errorMsg && <p className="error-message">{errorMsg}</p>}

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