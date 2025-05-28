// src/components/CharacterSummary.jsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import './CharacterSummary.css';

const CharacterSummary = () => {
  const { state } = useLocation();
  const { selectedTeam, selectedPlayer, nickname } = state || {};

  // state 없으면 홈으로 돌려보내기
  if (!selectedTeam || !selectedPlayer || !nickname) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="summary-wrapper">
      <div className="summary-card">
        {/* 헤더: 로고 + 포인트 */}
        <header className="summary-header">
          <img
            src={selectedTeam.logo}
            alt={`${selectedTeam.name} 로고`}
            className="summary-logo"
          />
          <span className="summary-points">💰 200 p</span>
        </header>

        {/* 메인 콘텐츠: 닉네임, 선수명, 캐릭터 */}
        <section className="summary-content">
          <h2 className="summary-nickname">{nickname}</h2>
          <p className="summary-player">{selectedPlayer.name}</p>

          <div className="summary-character-box">
            <div className="summary-character-head" />
            <div className="summary-character-body" />
          </div>
        </section>

        {/* 액션 버튼들 */}
        <div className="summary-actions">
          <button className="summary-btn summary-btn-large">
            🏟️ 오늘 경기
            <ul className="summary-event-list">
              <li>3회 안타 (💰+1 point)</li>
              <li>7회 2점 홈런 (💰+2 point)</li>
            </ul>
          </button>

          <div className="summary-btn-grid">
            <button className="summary-btn">🧢 유니폼 마켓</button>
            <button className="summary-btn">🎟️ 굿즈 티켓</button>
            <button className="summary-btn">🏅 선수 랭킹</button>
            <button className="summary-btn">📰 내 선수 기사</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSummary;
