import React, { useState } from 'react';
import './CharacterCreate.css';
import { useNavigate } from 'react-router-dom';

const CharacterCreate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: 팀선택, 2: 선수선택, 3: 닉네임
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [nickname, setNickname] = useState('');

  // 임시 데이터
  const teams = ['Team1', 'Team2', 'Team3']; // 실제 팀 데이터로 교체 필요
  const players = ['Player1', 'Player2', 'Player3']; // 실제 선수 데이터로 교체 필요

  const handleTeamSelect = (team) => {
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
    console.log('Character created:', { selectedTeam, selectedPlayer, nickname });
  };

  return (
    <div className="character-create">
      {step === 1 && (
        <div className="team-select">
          <h2>팀을 선택하세요</h2>
          <div className="team-grid">
            {teams.map((team) => (
              <div
                key={team}
                className="team-item"
                onClick={() => handleTeamSelect(team)}
              >
                {team}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="player-select">
          <h2>{selectedTeam} 선수를 선택하세요</h2>
          <div className="player-grid">
            {players.map((player) => (
              <div
                key={player}
                className="player-item"
                onClick={() => handlePlayerSelect(player)}
              >
                {player}
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