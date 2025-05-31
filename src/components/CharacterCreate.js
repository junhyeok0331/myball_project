// src/components/CharacterCreate.js
import React, { useState, useEffect } from 'react';
import './CharacterCreate.css';
import './Card.css';
import { useNavigate } from 'react-router-dom';

// 구단 로고 이미지들
import doosan from '../assets/doosan.png';
import hanha from '../assets/hanha.png';
import kia from '../assets/kia.png';
import kium from '../assets/kium.png';
import kt from '../assets/kt.png';
import lg from '../assets/lg.png';
import lotto from '../assets/lotto.png';
import nc from '../assets/nc.png';
import samsung from '../assets/samsung.png';
import ssg from '../assets/ssg.png';

const CharacterCreate = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);              // 1: 팀 선택, 2: 선수 선택, 3: 닉네임 입력
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [nickname, setNickname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 로그인 시 localStorage에 저장한 userId 가져오기
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (!storedId) {
      // 로그인되지 않은 상태라면 로그인 페이지로 리다이렉트
      navigate('/login');
    } else {
      setUserId(storedId);
    }
  }, [navigate]);

  // 구단 목록
  const teams = [
    { id: 1, name: '두산', logo: doosan },
    { id: 2, name: '한화', logo: hanha },
    { id: 3, name: '기아', logo: kia },
    { id: 4, name: '키움', logo: kium },
    { id: 5, name: 'KT', logo: kt },
    { id: 6, name: 'LG', logo: lg },
    { id: 7, name: '롯데', logo: lotto },
    { id: 8, name: 'NC', logo: nc },
    { id: 9, name: '삼성', logo: samsung },
    { id: 10, name: 'SSG', logo: ssg },
  ];

  // 구단별 선수 예시 데이터
  const teamPlayers = {
    1: [
      { id: 1, name: '두산선수1' },
      { id: 2, name: '두산선수2' },
      { id: 3, name: '두산선수3' },
      { id: 4, name: '두산선수4' },
      { id: 5, name: '두산선수5' },
      { id: 6, name: '두산선수6' },
      { id: 7, name: '두산선수7' },
      { id: 8, name: '두산선수8' },
      { id: 9, name: '두산선수9' },
    ],
    2: [
      { id: 1, name: '한화선수1' },
      { id: 2, name: '한화선수2' },
      { id: 3, name: '한화선수3' },
      { id: 4, name: '한화선수4' },
      { id: 5, name: '한화선수5' },
      { id: 6, name: '한화선수6' },
      { id: 7, name: '한화선수7' },
      { id: 8, name: '한화선수8' },
      { id: 9, name: '한화선수9' },
    ],
    3: [
      { id: 1, name: '기아선수1' },
      { id: 2, name: '기아선수2' },
      { id: 3, name: '기아선수3' },
      { id: 4, name: '기아선수4' },
      { id: 5, name: '기아선수5' },
      { id: 6, name: '기아선수6' },
      { id: 7, name: '기아선수7' },
      { id: 8, name: '기아선수8' },
      { id: 9, name: '기아선수9' },
    ],
    4: [
      { id: 1, name: '키움선수1' },
      { id: 2, name: '키움선수2' },
      { id: 3, name: '키움선수3' },
      { id: 4, name: '키움선수4' },
      { id: 5, name: '키움선수5' },
      { id: 6, name: '키움선수6' },
      { id: 7, name: '키움선수7' },
      { id: 8, name: '키움선수8' },
      { id: 9, name: '키움선수9' },
    ],
    5: [
      { id: 1, name: 'KT선수1' },
      { id: 2, name: 'KT선수2' },
      { id: 3, name: 'KT선수3' },
      { id: 4, name: 'KT선수4' },
      { id: 5, name: 'KT선수5' },
      { id: 6, name: 'KT선수6' },
      { id: 7, name: 'KT선수7' },
      { id: 8, name: 'KT선수8' },
      { id: 9, name: 'KT선수9' },
    ],
    6: [
      { id: 1, name: 'LG선수1' },
      { id: 2, name: 'LG선수2' },
      { id: 3, name: 'LG선수3' },
      { id: 4, name: 'LG선수4' },
      { id: 5, name: 'LG선수5' },
      { id: 6, name: 'LG선수6' },
      { id: 7, name: 'LG선수7' },
      { id: 8, name: 'LG선수8' },
      { id: 9, name: 'LG선수9' },
    ],
    7: [
      { id: 1, name: "한현희" },
      { id: 2, name: "김진욱" },
      { id: 3, name: "한태양" },
      { id: 4, name: "윤동희" },
      { id: 5, name: "김동현" },
      { id: 6, name: "전민재" },
      { id: 7, name: "고승민" },
      { id: 8, name: "손성빈" },
      { id: 9, name: "백두산" },
    ],  
    8: [
      { id: 1, name: 'NC선수1' },
      { id: 2, name: 'NC선수2' },
      { id: 3, name: 'NC선수3' },
      { id: 4, name: 'NC선수4' },
      { id: 5, name: 'NC선수5' },
      { id: 6, name: 'NC선수6' },
      { id: 7, name: 'NC선수7' },
      { id: 8, name: 'NC선수8' },
      { id: 9, name: 'NC선수9' },
    ],
    9: [
      { id: 1, name: '삼성선수1' },
      { id: 2, name: '삼성선수2' },
      { id: 3, name: '삼성선수3' },
      { id: 4, name: '삼성선수4' },
      { id: 5, name: '삼성선수5' },
      { id: 6, name: '삼성선수6' },
      { id: 7, name: '삼성선수7' },
      { id: 8, name: '삼성선수8' },
      { id: 9, name: '삼성선수9' },
    ],
    10: [
      { id: 1, name: 'SSG선수1' },
      { id: 2, name: 'SSG선수2' },
      { id: 3, name: 'SSG선수3' },
      { id: 4, name: 'SSG선수4' },
      { id: 5, name: 'SSG선수5' },
      { id: 6, name: 'SSG선수6' },
      { id: 7, name: 'SSG선수7' },
      { id: 8, name: 'SSG선수8' },
      { id: 9, name: 'SSG선수9' },
    ],
  };

  // 1) 팀 선택 처리 함수 (fetch 사용)
  const handleTeamSelect = async (teamId) => {
    setErrorMsg('');
    if (!userId) {
      setErrorMsg('로그인이 필요합니다.');
      return;
    }

    const team = teams.find((t) => t.id === teamId);
    try {
      // 백엔드의 실제 엔드포인트: /api/user/save-team
      const response = await fetch('http://172.20.84.222:8080/api/users/save-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, teamName: team.name }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message || '팀 저장 중 오류가 발생했습니다.');
        return;
      }

      // 서버 저장 성공 시
      setSelectedTeam(team);
      setStep(2);
    } catch (err) {
      console.error('팀 저장 실패 ▶', err);
      setErrorMsg('팀 저장 중 네트워크 오류가 발생했습니다.');
    }
  };

  // 2) 선수 선택 처리 함수 (fetch 사용)
  const handlePlayerSelect = async (player) => {
    setErrorMsg('');
    if (!userId) {
      setErrorMsg('로그인이 필요합니다.');
      return;
    }

    try {
      // 백엔드의 실제 엔드포인트: /api/user/save-player
      const response = await fetch('http://172.20.84.222:8080/api/users/save-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, playerName: player.name }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message || '선수 저장 중 오류가 발생했습니다.');
        return;
      }

      setSelectedPlayer(player);
      setStep(3);
    } catch (err) {
      console.error('선수 저장 실패 ▶', err);
      setErrorMsg('선수 저장 중 네트워크 오류가 발생했습니다.');
    }
  };

  // 3) 닉네임 제출 처리 함수 (fetch 사용)
  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!userId) {
      setErrorMsg('로그인이 필요합니다.');
      return;
    }
    if (!nickname) {
      setErrorMsg('닉네임을 입력해주세요.');
      return;
    }

    try {
      // 백엔드의 실제 엔드포인트: /api/user/save-nickname
      const response = await fetch('http://172.20.84.222:8080/api/users/save-nickname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, nickname }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message || '닉네임 저장 중 오류가 발생했습니다.');
        return;
      }

      // 최종 완료 후 summary 페이지로 이동
      navigate('/summary', {
        state: { selectedTeam, selectedPlayer, nickname, userId },
      });
    } catch (err) {
      console.error('닉네임 저장 실패 ▶', err);
      setErrorMsg('닉네임 저장 중 네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="character-create">
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      {/* 1단계: 팀 선택 */}
      {step === 1 && (
        <div className="team-select">
          <h2>팀을 선택하세요</h2>
          <div className="team-grid">
            {teams.map((team) => (
              <div
                key={team.id}
                className="team-item"
                onClick={() => handleTeamSelect(team.id)}
              >
                <img src={team.logo} alt={team.name} className="team-logo" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2단계: 선수 선택 */}
      {step === 2 && (
        <div className="player-select">
          <h2>{selectedTeam.name} 선수를 선택하세요</h2>
          <div className="player-grid">
            {teamPlayers[selectedTeam.id].map((player) => (
              <div
                key={player.id}
                className="player-item"
                onClick={() => handlePlayerSelect(player)}
              >
                {player.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3단계: 닉네임 입력 */}
      {step === 3 && (
        <div className="nickname-input">
          <h2>닉네임을 입력하세요</h2>
          <form onSubmit={handleNicknameSubmit}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
              maxLength={10}
              required
            />
            <button type="submit" className="nickname-button">
              캐릭터 생성
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CharacterCreate;

