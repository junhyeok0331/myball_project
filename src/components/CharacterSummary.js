import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEquippedItem } from '../components/EquippedItemContext';
import './Card.css';
import './CharacterSummary.css';

const CharacterSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedTeam, selectedPlayer, nickname } = state || {};

  const { equippedItem } = useEquippedItem();

  const teamAvatars = {
    두산: '/avatars/doosan.png',
    한화: '/avatars/hanwha.png',
    기아: '/avatars/kia.png',
    키움: '/avatars/kiwoom.png',
    KT: '/avatars/kt.png',
    LG: '/avatars/lg.png',
    롯데: '/avatars/wing.png',
    NC: '/avatars/nc.png',
    삼성: '/avatars/leo.png',
    SSG: '/avatars/ssg.png',
  };

  // 아이템 장착 시 보여줄 아바타 이미지 경로 (아이템 ID 기준)
  const equippedAvatars = {
    1: '/shop-list/winghat_eq.png',  // 예: winghat 착용 시 이미지
    2: '/avatars/doosan_with_wingshirt.png',
    3: '/avatars/doosan_with_cap.png',
    4: '/avatars/doosan_with_pants.png',
  };

  if (!selectedTeam || !selectedPlayer || !nickname) {
    return <Navigate to="/" replace />;
  }

  // equippedItem이 있으면 장착 이미지, 없으면 기본 팀 아바타
  const avatarImage = equippedItem
    ? (equippedAvatars[equippedItem.id] || teamAvatars[selectedTeam.name])
    : teamAvatars[selectedTeam.name];

  return (
    <div className="summary-container">
      <div className="card no-bg summary-card">
        <div className="top-left">
          <img src={selectedTeam.logo} className="team-logo-small" alt="팀 로고" />
        </div>
        <div className="top-right">💰 200 p</div>

        <div className="center">
          <h2>{nickname}</h2>
          <p>{selectedPlayer.name}</p>
        </div>

        <div className="character-box">
          <img
            src={avatarImage}
            alt="캐릭터 아바타"
            className="character-img"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-long">
            🏟️ 오늘 경기
            <li>3회 안타 (💰+1 point)</li>
            <li>7회 2점 홈런 (💰+2 point)</li>
          </button>
          <div className="btn-grid">
            <button className="btn" onClick={() => navigate('/shop')}>
              🧢 상점
            </button>
            <button className="btn" onClick={() => navigate('/exchange')}>
              🎟️ 굿즈 교환소
            </button>
            <button className="btn" onClick={() => navigate('/ranking')}>
              🏅 랭킹
            </button>
            <button className="btn" onClick={() => navigate('/news')}>
              📰 내 선수 기사
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSummary;
