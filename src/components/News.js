import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import './News.css';

const rawArticles = [
  {
    id: 1,
    title: "{PLAYER_NAME} 선수, 멋진 활약!",
    date: "2025-05-31",
    summary: "{PLAYER_NAME} 선수가 지난 경기 3회 안타, 7회 2점 홈런으로 엄청난 활약을 펼쳤습니다.",
  },
  {
    id: 2,
    title: "{PLAYER_NAME} 선수 인터뷰 공개",
    date: "2025-05-30",
    summary: "{PLAYER_NAME} 선수가 자신의 슬럼프 극복법을 소개했습니다.",
  },
  {
    id: 3,
    title: "{PLAYER_NAME} 선수, 다음 경기 기대돼요",
    date: "2025-05-29",
    summary: "{PLAYER_NAME} 선수는 다음 경기에서도 좋은 모습을 보여줄 것으로 기대됩니다.",
  },
];

const News = () => {
  const { state } = useLocation();
  const selectedPlayer = state?.selectedPlayer;

  if (!selectedPlayer) {
    return <Navigate to="/" replace />;
  }

  // 선수 이름으로 템플릿 치환
  const personalizedArticles = rawArticles.map((article) => ({
    ...article,
    title: article.title.replaceAll("{PLAYER_NAME}", selectedPlayer.name),
    summary: article.summary.replaceAll("{PLAYER_NAME}", selectedPlayer.name),
  }));

  return (
    <div className="news-page" style={{ backgroundImage: 'none', backgroundColor: 'white' }}>
      <div className="summary-card">
        <h1>📰 내 선수 기사</h1>
        <div className="articles-container">
          {personalizedArticles.map(({ id, title, date, summary }) => (
            <div key={id} className="article-card">
              <div className="article-title">{title}</div>
              <div className="article-date">{date}</div>
              <div className="article-summary">{summary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
