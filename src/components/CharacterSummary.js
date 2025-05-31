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

  // 아래 변수들은 Login 또는 CharacterCreate에서 넘어올 수도 있고, 넘어오지 않을 수도 있습니다.
  const {
    selectedTeam: stateTeam,
    selectedPlayer: statePlayer,
    nickname: stateNickname,
    userId: passedUserId
  } = state || {};

  const { equippedItem } = useEquippedItem();

  // — 서버에서 가져온 팀 이름, 로고, 선수 목록 — 
  const [teamName, setTeamName] = useState(stateTeam?.name || '');
  const [teamLogoUrl, setTeamLogoUrl] = useState(stateTeam?.logo || '');
  const [teamPlayers, setTeamPlayers] = useState([]);

  // — 서버에서 가져온 포인트 —
  const [point, setPoint] = useState(null);

  // — 로컬 상태: 닉네임과 선택된 선수 —
  const [nickname, setNickname] = useState(stateNickname || '');
  const [selectedPlayer, setSelectedPlayer] = useState(statePlayer || null);

  // — 로딩 / 에러 상태 —
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingPoint, setLoadingPoint] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // userId 결정: state에서 넘어온 값이 있으면 그것, 없으면 localStorage에서 꺼내기
  const storedUserId = passedUserId || localStorage.getItem('userId');

  // ─── (1) “팀 정보 + 선수 목록” 조회 ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!storedUserId) {
      // userId가 없으면 로그인 페이지로 돌려보냅니다.
      navigate('/login');
      return;
    }

    const fetchTeamInfo = async () => {
      try {
        const response = await axios.get(
          `http://172.20.84.222:8080/api/main-panel/team`,
          { params: { userId: storedUserId } }
        );

        // status 200인 경우에만 데이터 가공
        if (response.status === 200 && response.data.team) {
          const serverTeamName = response.data.team;
          const serverPlayers = response.data.players;

          // “팀 이름 → 로고 URL” 매핑
          const logoUrl = getLogoByTeamName(serverTeamName);

          setTeamName(serverTeamName);
          setTeamLogoUrl(logoUrl);
          setTeamPlayers(serverPlayers);

          // (선택) 만약 statePlayer가 없으면 서버에서 가져온 선수 목록 중 첫 번째를 기본으로 지정
          // if (!statePlayer && serverPlayers.length > 0) {
          //   setSelectedPlayer({ id: serverPlayers[0].id, name: serverPlayers[0].name });
          // }
        } else {
          // status 200이었지만 형식이 다를 경우
          setErrorMsg('팀 정보를 불러오지 못했습니다.');
        }
      } catch (err) {
        // ─ “백엔드가 400 에러(팀 정보가 설정되어 있지 않음)”을 던져준 경우 ─
        if (err.response && err.response.status === 400) {
          const backendMsg = err.response.data?.message;
          if (backendMsg === '팀 정보가 설정되어 있지 않습니다.') {
            // 아직 팀을 저장하지 않은 신규/기존 가입자 → 캐릭터 생성 페이지로 리다이렉트
            navigate('/create-character');
            return;
          }
        }

        // 그 외 모든 오류 (네트워크 오류, 500 등)
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
  }, [storedUserId, navigate, statePlayer]);


  // ─── (2) “포인트” 조회 ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!storedUserId) return;

    const fetchPoint = async () => {
      try {
        const response = await axios.get(
          `http://172.20.84.222:8080/api/main-panel/point`,
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


  // ─── (3) 로딩 / 에러 / 리다이렉트 처리 ─────────────────────────────────────────────────
  // - 둘 중 하나라도 로딩 중이면 “로딩 중” 화면
  if (loadingTeam || loadingPoint) {
    return (
      <div className="summary-container">
        <div className="card no-bg summary-card">
          <p>로딩 중…</p>
        </div>
      </div>
    );
  }

  // - 에러가 setErrorMsg에 담겼다면 오류 화면 & 홈으로 버튼
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

  // - 서버에서 “팀 조회”가 성공한 뒤, teamName이 여전히 빈 문자열이면(=DB에 user.team이 null) → 이미 위에서 /create-character로 보냈으므로 여기에 도달하지 않습니다.

  // - stateNickname / statePlayer 없이 여기까지 왔다면 아직 캐릭터 생성이 덜 된 상태 → /create-character로 리다이렉트
  if (!stateNickname && !nickname) {
    return <Navigate to="/create-character" replace />;
  }
  if (!statePlayer && !selectedPlayer) {
    return <Navigate to="/create-character" replace />;
  }


  // ─── (4) “요약 화면” 실제 렌더링 ──────────────────────────────────────────────────────
  // “아바타”는 장착 아이템이 있으면 그 아이템별 아바타, 없으면 팀 로고 기반
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
            <button className="btn" onClick={() => navigate('/news')}>
              📰 내 선수 기사
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


/** 팀 이름을 받아서 로고 URL을 반환하는 헬퍼 함수 */
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
