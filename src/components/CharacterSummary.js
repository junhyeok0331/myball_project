import React from 'react';
import { useLocation } from 'react-router-dom';
import './Card.css';
import './CharacterSummary.css';

const CharacterSummary = () => {
  const { state } = useLocation();
  const { selectedTeam, selectedPlayer, nickname } = state || {};

  return (
    <div className="summary-container">
      <div className="card no-bg summary-card">
        <div className="top-left">{selectedTeam} </div>
        <div className="top-right">💰 200 p</div>

        <div className="center">
          <h2>{nickname}</h2>
          <p>{selectedPlayer}</p>
          <div className="character-box">
            <div className="character-head" />
            <div className="character-body" />
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-long">🏟️ 오늘 경기
            <li>3회 안타 (💰+1 point)</li>
            <li>7회 2점 홈런 (💰+2 point)</li>
          </button>
          <div className="btn-grid">
            <button className="btn">🧢 유니폼 마켓</button>
            <button className="btn">🎟️ 굿즈 티켓</button>
            <button className="btn">🏅 선수 랭킹</button>
            <button className="btn">📰 내 선수 기사</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSummary;
