import React, { useState } from 'react';
import './CharacterCreate.css';
import './Card.css';    
import { useNavigate } from 'react-router-dom';
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
  const [step, setStep] = useState(1); // 1: 팀선택, 2: 선수선택, 3: 닉네임
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [nickname, setNickname] = useState('');

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

    // 팀별 선수 데이터
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
    ],
    3: [
      { id: 1, name: "기아선수1" },
      { id: 2, name: "기아선수2" },
      { id: 3, name: "기아선수3" },
    ],  
    4: [
      { id: 1, name: "키움선수1" },
      { id: 2, name: "키움선수2" },
      { id: 3, name: "키움선수3" },
    ],  
    5: [
      { id: 1, name: "KT선수1" },
      { id: 2, name: "KT선수2" },
      { id: 3, name: "KT선수3" },
    ],  
    6: [
      { id: 1, name: "LG선수1" },
      { id: 2, name: "LG선수2" },
      { id: 3, name: "LG선수3" },
    ],  
    7: [
      { id: 1, name: "롯데선수1" },
      { id: 2, name: "롯데선수2" },
      { id: 3, name: "롯데선수3" },
    ],  
    8: [
      { id: 1, name: "NC선수1" },
      { id: 2, name: "NC선수2" },
      { id: 3, name: "NC선수3" },
    ],  
    9: [
      { id: 1, name: "삼성선수1" },
      { id: 2, name: "삼성선수2" },
      { id: 3, name: "삼성선수3" },
    ],  
    10: [
      { id: 1, name: "SSG선수1" },
      { id: 2, name: "SSG선수2" },
      { id: 3, name: "SSG선수3" },
    ]
  };

  const handleTeamSelect = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    setSelectedTeam(team);
    setStep(2);
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 및 캐릭터 생성 처리
    const characterData = { selectedTeam, selectedPlayer, nickname };
    navigate('/summary', { state: characterData }); // 생성 후 이동
    console.log({
        teamId: selectedTeam,
        player: selectedPlayer,
        nickname
      });
  };

  return (
    <div className="character-create">
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
                <img src={team.logo} alt={`Team ${team.id}`} className="team-logo" />
              </div>
            ))}
          </div>
        </div>
      )}

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

      {step === 3 && (
        <div className="nickname-input">
          <h2>닉네임을 입력하세요</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
              maxLength={10}
            />
            <button type="submit">캐릭터 생성</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CharacterCreate;