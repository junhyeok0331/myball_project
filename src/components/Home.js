// components/Home.js
import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    const audio = new Audio(process.env.PUBLIC_URL + '/baseball-hit.mp3');
    audio.play();

    // 사운드가 재생된 뒤 1초 후에 로그인 페이지로 이동
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="App">
      <Card onStartClick={handleStart} />
    </div>
  );
};

export default Home;
