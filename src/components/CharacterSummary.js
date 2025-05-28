import React from 'react';
import { useLocation } from 'react-router-dom';
import './Card.css'; // 기존 카드 디자인 포함
import './CharacterSummary.css';

const CharacterSummary = () => {
  const { state } = useLocation();
  const { selectedTeam, selectedPlayer, nickname } = state || {};

  return (
    <div className="summary-container">
      <div className="card no-bg summary-card">
        <div className="top-left">{selectedTeam} 로고</div>
        <div className="top-right">보유 포인트: 1000</div>
        <div className="center">
          <h2>{nickname}</h2>
          <p>{selectedPlayer}</p>

          <div className="character-box">
            <div className="character-head" />
            <div className="character-body" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSummary;
