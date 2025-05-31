import React from 'react';
import './Ranking.css';

const players = [
  { id: 1, name: "고승민", score: 10000 },
  { id: 2, name: "신윤후", score: 8700 },
  { id: 3, name: "정훈", score: 9300 },
  { id: 4, name: "최항", score: 7609 },
  { id: 5, name: "김민성", score: 9006 },
  { id: 6, name: "전민재", score: 9300 },
  { id: 7, name: "이호준", score: 8706 },
  { id: 8, name: "박승욱", score: 9302 },
  { id: 9, name: "한태양", score: 7903 },
  // 더 많아져도 됩니다.
];

const Ranking = () => {
  // 점수 내림차순 정렬
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="ranking-page">
      <div className="summary-card">
        <h1>🏅 랭킹</h1>
        <p>다른 유저들과 사용한 포인트 랭킹을 비교해보세요.</p>
        <ul className="ranking-list">
          {sortedPlayers.map((player, index) => (
            <li key={player.id} className="ranking-item">
              <span className="ranking-position">{index + 1}등</span>
              <span className="player-name">{player.name}</span>
              <span className="player-score">💰 {player.score}P</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Ranking;
