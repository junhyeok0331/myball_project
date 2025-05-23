import React from 'react';
import './Card.css';

const Card = () => {
  const playSound = () => {
    const audio = new Audio(process.env.PUBLIC_URL + '/baseball-hit.mp3'); // 파일 경로
    audio.play();
  };

  return (
    <div className="card">
      <span className="side-button top" />
      <span className="side-button bottom" />
      <h1>마이볼</h1>
      <h2>"관람을 플레이로 바꾸다"</h2>
      <button className="button" onClick={playSound}>
        <b>시작하기</b>
      </button>
    </div>
  );
};

export default Card;
