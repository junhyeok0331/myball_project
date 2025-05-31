// src/components/CharacterSummary.js
import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEquippedItem } from '../components/EquippedItemContext';
import './Card.css';
import './CharacterSummary.css';
import axios from 'axios';

const CharacterSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 로그인 또는 CharacterCreate에서 넘어올 수도 있는 값들
  // ───────────────────────────────────────────────────────────
  const {
    selectedTeam: stateTeam,         // { id, name, logo } 형태로 넘어오면 바로 사용
    selectedPlayer: statePlayer,     // { id, name } 형태로 넘어온 경우
    nickname: stateNickname,         // 문자열
    userId: passedUserId             // 숫자 or 문자열
    // (현재 예제에서는 포인트가 state에 안 실려오므로, 포인트는 아래에서 따로 가져옵니다)
  } = state || {};

  const { equippedItem } = useEquippedItem();

  // (1) “팀 이름”, “팀 로고 URL”, “서버에서 내려주는 선수 목록”
  // ───────────────────────────────────────────────────────────
  const [teamName, setTeamName] = useState(stateTeam?.name || '');
  const [teamLogoUrl, setTeamLogoUrl] = useState(stateTeam?.logo || '');
  const [teamPlayers, setTeamPlayers] = useState([]); // 예시: [ {id:1,name:'두산선수1'}, … ]

  // (2) “DB에 저장된 포인트”를 받아올 상태
  const [point, setPoint] = useState(null);

  // (3) 로컬 상태: 닉네임, 선택된 선수(최종)
  const [nickname, setNickname] = useState(stateNickname || '');
  const [selectedPlayer, setSelectedPlayer] = useState(statePlayer || null);

  // (4) 로딩/에러 처리용
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingPoint, setLoadingPoint] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // (5) userId 결정:
  //     1) “state” 에 userId가 있으면 그것을 쓰고,
  //     2) 없다면 localStorage에서 꺼내보자
  const storedUserId = passedUserId || localStorage.getItem('userId');

  // ────────────────────────────────────────────────────────────────────────────
  // (6) “팀 조회 + 선수 목록 조회” 로직 (useEffect)
  //      – 만약 stateTeam 이 이미 있으면, 굳이 백엔드를 호출하지 않는다!
  //      – stateTeam 이 없으면 → `/api/main-panel/team?userId=…` 호출
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!storedUserId) {
      // userId가 없으면 로그인 페이지로 리다이렉트
      navigate('/login');
      return;
    }

    // (6.1) “stateTeam”이 이미 있으면(= 로그인 혹은 캐릭터 생성에서 넘어온 경우),
    //       바로 팀 정보와 로고, 선수 정보는 state로부터 가져온다.
    if (stateTeam) {
      setTeamName(stateTeam.name);
      setTeamLogoUrl(stateTeam.logo);
      // “statePlayer”가 넘어왔다면, 서버에서 새로 선수 목록을 불러올 필요 없이
      // 그냥 selectedPlayer도 statePlayer로 세팅해 둔다.
      if (statePlayer) {
        setSelectedPlayer(statePlayer);
      }
      setLoadingTeam(false);
      return;
    }

    // (6.2) “stateTeam” 이 없는 경우 → 백엔드 호출
    const fetchTeamInfo = async () => {
      try {
        const response = await axios.get(
          `http://172.20.84.222:8080/api/main-panel/team`,
          { params: { userId: storedUserId } }
        );

        // 정상 응답(200) 이면서 서버가 team, players를 내려준다면
        if (response.status === 200 && response.data.team) {
          const serverTeamName = response.data.team;       // 예: "두산"
          const serverPlayers = response.data.players;     // 예: [ {id:1,name:'두산선수1'}, ... ]

          // “팀 이름 → 로고 URL” 을 매핑하여 로고를 불러온다.
          const logoUrl = getLogoByTeamName(serverTeamName);

          setTeamName(serverTeamName);
          setTeamLogoUrl(logoUrl);
          setTeamPlayers(serverPlayers);

          // 만약 “statePlayer”(이전에 선택한 선수)가 없다면,
          // 서버에서 받은 선수 목록 중 첫 번째를 기본값으로 사용하거나
          // 사용자가 직접 선택하도록 두어도 된다. 여기서는 첫 번째 선수로 세팅해 보자.
          if (!statePlayer && serverPlayers.length > 0) {
            setSelectedPlayer({
              id: serverPlayers[0].id,
              name: serverPlayers[0].name,
            });
          }
        } else {
          // status 200 이긴 한데, 형식이 맞지 않으면(서버가 team을 내려주지 않으면)
          setErrorMsg('팀 정보를 불러오지 못했습니다.');
        }
      } catch (err) {
        // ─ 백엔드가 “팀 정보가 설정되지 않았다” 라고 400 에러를 보내주는 경우 ─
        if (err.response && err.response.status === 400) {
          const backendMsg = err.response.data?.message;
          if (backendMsg === '팀 정보가 설정되어 있지 않습니다.') {
            // 아직 팀을 저장하지 않은 신규/기존 가입자 → 캐릭터 생성 페이지로 리다이렉트
            navigate('/create-character');
            return;
          }
        }

        // 그 외 네트워크 오류나 500번 에러
        console.error('[팀 조회 오류]', err);
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg('네트워크 오류로 팀 정보를 불러오지 못했습니다.');
        }
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeamInfo();
  }, [storedUserId, stateTeam, statePlayer, navigate]);

  // ────────────────────────────────────────────────────────────────────────────
  // (7) “포인트 조회” 로직 (useEffect)
  //       – 이 예시에서는 state에 포인트가 실려 오지 않으므로 무조건 서버 호출
  //         (필요하다면 “statePoint” 분기 추가 가능)
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!storedUserId) return;

    const fetchPoint = async () => {
      try {
        const response = await axios.get(
          `http://172.20.84.222:8080/api/main-panel/points`,
          { params: { userId: storedUserId } }
        );

        if (response.status === 200 && response.data.point !== undefined) {
          setPoint(response.data.point);
        } else {
          setErrorMsg('포인트 정보를 불러오지 못했습니다.');
        }
      } catch (err) {
        console.error('[포인트 조회 오류]', err);
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg('네트워크 오류로 포인트 정보를 불러오지 못했습니다.');
        }
      } finally {
        setLoadingPoint(false);
      }
    };

    fetchPoint();
  }, [storedUserId]);

  // ────────────────────────────────────────────────────────────────────────────
  // (8) 로딩 / 에러 / 리다이렉트 처리
  // ────────────────────────────────────────────────────────────────────────────
  // – 둘 중 하나라도 로딩 중이면 “로딩 중” 화면
  if (loadingTeam || loadingPoint) {
    return (
      <div className="summary-container">
        <div className="card no-bg summary-card">
          <p>로딩 중…</p>
        </div>
      </div>
    );
  }

  // – 에러가 있으면 에러 메시지만 보여주고, “홈으로” 버튼
  if (errorMsg) {
    return (
      <div className="summary-container">
        <div className="card no-bg summary-card">
          <p className="error-message">{errorMsg}</p>
          <button className="btn" onClick={() => navigate('/')}>
            홈으로
          </button>
        </div>
      </div>
    );
  }

  // – “팀 이름”이 빈 문자열인 경우는 이미 위에서 /create-character 로 리다이렉트 했으므로 여기서는 볼일 없음

  // – “닉네임”이나 “선택 선수”가 없으면 캐릭터 생성이 아직 덜 된 상태로 판단 → /create-character 로 보내기
  if (!stateNickname && !nickname) {
    return <Navigate to="/create-character" replace />;
  }
  if (!statePlayer && !selectedPlayer) {
    return <Navigate to="/create-character" replace />;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // (9) 화면 최종 렌더링
  // ────────────────────────────────────────────────────────────────────────────
  // avatar는 “장착 아이템이 있으면 해당 아이템 아바타”, 없으면 “팀 로고 기반”을 사용
  const equippedAvatars = {
    1: '/shop-list/winghat_eq.png',
    2: '/avatars/doosan_with_wingshirt.png',
    3: '/avatars/doosan_with_cap.png',
    4: '/avatars/doosan_with_pants.png',
  };

  const avatarImage = equippedItem
    ? (equippedAvatars[equippedItem.id] || teamLogoUrl || '/avatars/default.png')
    : (teamLogoUrl || '/avatars/default.png');

  return (
    <div className="summary-container">
      <div className="card no-bg summary-card">
        {/* 좌측 상단: 팀 로고 */}
        <div className="top-left">
          <img
            src={teamLogoUrl}
            className="team-logo-small"
            alt={`${teamName} 로고`}
            onError={(e) => { e.target.src = '/avatars/default.png'; }}
          />
        </div>

        {/* 우측 상단: 포인트 */}
        <div className="top-right">
          <span>💰 {point} P</span>
        </div>

        {/* 중앙: 닉네임 + 선수 이름 */}
        <div className="center">
          <h2>{stateNickname || nickname}</h2>
          <p>{(statePlayer || selectedPlayer).name}</p>
        </div>

        {/* 캐릭터 아바타 박스 */}
        <div className="character-box">
          <img
            src={avatarImage}
            alt="캐릭터 아바타"
            className="character-img"
            onError={(e) => { e.target.src = '/avatars/default.png'; }}
          />
        </div>

        {/* 하단 버튼 그룹 */}
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
            <button
              className="btn"
              onClick={() => navigate('/news', { state: { selectedPlayer } })}
            >
              📰 내 선수 기사
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 팀 이름을 받아서 로고 URL을 반환하는 헬퍼 함수입니다.
 */
function getLogoByTeamName(teamName) {
  switch (teamName) {
    case '두산': return '/avatars/doosan.png';
    case '한화': return '/avatars/hanwha.png';
    case '기아': return '/avatars/kia.png';
    case '키움': return '/avatars/kiwoom.png';
    case 'KT':   return '/avatars/kt.png';
    case 'LG':   return '/avatars/lg.png';
    case '롯데': return '/avatars/wing.png';
    case 'NC':   return '/avatars/nc.png';
    case '삼성': return '/avatars/leo.png';
    case 'SSG':  return '/avatars/ssg.png';
    default:     return '/avatars/default.png';
  }
}

export default CharacterSummary;
