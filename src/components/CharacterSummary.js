// src/components/CharacterSummary.jsx
import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import './Card.css';
import './CharacterSummary.css';

const CharacterSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedTeam, selectedPlayer, nickname } = state || {};

  // state 없으면 홈으로 돌려보내기
  if (!selectedTeam || !selectedPlayer || !nickname) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="summary-container">
      <div className="card no-bg summary-card">
        <div className="top-left">
            <img src={selectedTeam.logo} className="team-logo-small" />
        </div>
        <div className="top-right">💰 200 p</div>

        <div className="center">
          <h2>{nickname}</h2>
          <p>{selectedPlayer.name}</p>
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
            <button className="btn" onClick={() => navigate('/shop')}> 🧢 상점</button>
            <button className="btn" onClick={() => navigate('/exchange')}> 🎟️ 굿즈 교환소</button>
            <button className="btn" onClick={() => navigate('/ranking')}> 🏅 랭킹</button>
            <button className="btn" onClick={() => navigate('/news')}> 📰 내 선수 기사</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSummary;
