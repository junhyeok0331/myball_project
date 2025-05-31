import React, { useState, useEffect } from 'react';
import './CharacterCreate.css';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  // 1: 팀 선택, 2: 선수 선택, 3: 닉네임 입력
  const [step, setStep] = useState(1);

  const [selectedTeam, setSelectedTeam] = useState(null);       // { id, name, logo }
  const [selectedPlayer, setSelectedPlayer] = useState(null);   // { id, name }
  const [nickname, setNickname] = useState('');                 // 최종 닉네임

  // 서버 응답 오류 메시지 표시용
  const [errorMsg, setErrorMsg] = useState('');

  // 로그인 시 로컬스토리지에 저장했던 userId를 꺼내옵니다.
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // 로그인되지 않은 상태라면 로그인 페이지로 보냄
      navigate('/login');
    }
  }, [navigate]);

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
    { id: 10, name: 'SSG', logo: ssg }
  ];

  // 팀별 선수 데이터(예시)
  const teamPlayers = {
    1: [
      { id: 1, name: "두산선수1" },
      { id: 2, name: "두산선수2" },
      { id: 3, name: "두산선수3" },
      { id: 4, name: "두산선수4" },
      { id: 5, name: "두산선수5" },
      { id: 6, name: "두산선수6" },
      { id: 7, name: "두산선수7" },
      { id: 8, name: "두산선수8" },
      { id: 9, name: "두산선수9" },
    ],
    2: [
      { id: 1, name: "한화선수1" },
      { id: 2, name: "한화선수2" },
      { id: 3, name: "한화선수3" },
      { id: 4, name: "한화선수4" },
      { id: 5, name: "한화선수5" },
      { id: 6, name: "한화선수6" },
      { id: 7, name: "한화선수7" },
      { id: 8, name: "한화선수8" },
      { id: 9, name: "한화선수9" },
    ],
    3: [
      { id: 1, name: "기아선수1" },
      { id: 2, name: "기아선수2" },
      { id: 3, name: "기아선수3" },
      { id: 4, name: "기아선수4" },
      { id: 5, name: "기아선수5" },
      { id: 6, name: "기아선수6" },
      { id: 7, name: "기아선수7" },
      { id: 8, name: "기아선수8" },
      { id: 9, name: "기아선수9" },
    ],
    4: [
      { id: 1, name: "키움선수1" },
      { id: 2, name: "키움선수2" },
      { id: 3, name: "키움선수3" },
      { id: 4, name: "키움선수4" },
      { id: 5, name: "키움선수5" },
      { id: 6, name: "키움선수6" },
      { id: 7, name: "키움선수7" },
      { id: 8, name: "키움선수8" },
      { id: 9, name: "키움선수9" },
    ],
    5: [
      { id: 1, name: "KT선수1" },
      { id: 2, name: "KT선수2" },
      { id: 3, name: "KT선수3" },
      { id: 4, name: "KT선수4" },
      { id: 5, name: "KT선수5" },
      { id: 6, name: "KT선수6" },
      { id: 7, name: "KT선수7" },
      { id: 8, name: "KT선수8" },
      { id: 9, name: "KT선수9" },
    ],
    6: [
      { id: 1, name: "LG선수1" },
      { id: 2, name: "LG선수2" },
      { id: 3, name: "LG선수3" },
      { id: 4, name: "LG선수4" },
      { id: 5, name: "LG선수5" },
      { id: 6, name: "LG선수6" },
      { id: 7, name: "LG선수7" },
      { id: 8, name: "LG선수8" },
      { id: 9, name: "LG선수9" },
    ],
    7: [
      { id: 1, name: "롯데선수1" },
      { id: 2, name: "롯데선수2" },
      { id: 3, name: "롯데선수3" },
      { id: 4, name: "롯데선수4" },
      { id: 5, name: "롯데선수5" },
      { id: 6, name: "롯데선수6" },
      { id: 7, name: "롯데선수7" },
      { id: 8, name: "롯데선수8" },
      { id: 9, name: "롯데선수9" },
    ],
    8: [
      { id: 1, name: "NC선수1" },
      { id: 2, name: "NC선수2" },
      { id: 3, name: "NC선수3" },
      { id: 4, name: "NC선수4" },
      { id: 5, name: "NC선수5" },
      { id: 6, name: "NC선수6" },
      { id: 7, name: "NC선수7" },
      { id: 8, name: "NC선수8" },
      { id: 9, name: "NC선수9" },
    ],
    9: [
      { id: 1, name: "삼성선수1" },
      { id: 2, name: "삼성선수2" },
      { id: 3, name: "삼성선수3" },
      { id: 4, name: "삼성선수4" },
      { id: 5, name: "삼성선수5" },
      { id: 6, name: "삼성선수6" },
      { id: 7, name: "삼성선수7" },
      { id: 8, name: "삼성선수8" },
      { id: 9, name: "삼성선수9" },
    ],
    10: [
      { id: 1, name: "SSG선수1" },
      { id: 2, name: "SSG선수2" },
      { id: 3, name: "SSG선수3" },
      { id: 4, name: "SSG선수4" },
      { id: 5, name: "SSG선수5" },
      { id: 6, name: "SSG선수6" },
      { id: 7, name: "SSG선수7" },
      { id: 8, name: "SSG선수8" },
      { id: 9, name: "SSG선수9" },
    ]
  };

  // 1) 팀 선택 시 호출: 백엔드에 userId, teamName 전달
  const handleTeamSelect = async (teamId) => {
    setErrorMsg('');
    const team = teams.find(t => t.id === teamId);
    try {
      await axios.post(
        'http://localhost:8080/user/save-team',
        {
          userId: userId,
          teamName: team.name
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setSelectedTeam(team);
      setStep(2);
    } catch (err) {
      console.error('팀 저장 실패 ▶', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('팀 저장 중 오류가 발생했습니다.');
      }
    }
  };

  // 2) 선수 선택 시 호출: 백엔드에 userId, playerName 전달
  const handlePlayerSelect = async (player) => {
    setErrorMsg('');
    try {
      await axios.post(
        'http://localhost:8080/user/save-player',
        {
          userId: userId,
          playerName: player.name
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setSelectedPlayer(player);
      setStep(3);
    } catch (err) {
      console.error('선수 저장 실패 ▶', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('선수 저장 중 오류가 발생했습니다.');
      }
    }
  };

  // 3) 닉네임 입력 후 최종 제출: 백엔드에 userId, nickname 전달
  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!nickname) {
      setErrorMsg('닉네임을 입력해주세요.');
      return;
    }
    try {
      await axios.post(
        'http://localhost:8080/user/save-nickname',
        {
          userId: userId,
          nickname: nickname
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      // 모든 단계가 끝났으니 summary 페이지로 이동
      const characterData = { userId, selectedTeam, selectedPlayer, nickname };
      navigate('/summary', { state: characterData });
    } catch (err) {
      console.error('닉네임 저장 실패 ▶', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('닉네임 저장 중 오류가 발생했습니다.');
      }
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