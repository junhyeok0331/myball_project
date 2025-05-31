// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1) 입력 유효성 검사
    if (!form.username || !form.password) {
      setErrorMsg('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 2) 백엔드의 실제 로그인 엔드포인트 (/api/user/login)로 요청
      const response = await axios.post(
        'http://172.20.84.222:8080/api/users/login',
        {
          username: form.username,
          password: form.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // 3) status 200일 때만 응답 데이터를 사용
      if (response.status === 200) {
        // 백엔드가 내려주는 user 객체: { userId, username, team, player, selected, nickname }
        const user = response.data.user;
        const userId = user.userId;

        // 4) 반드시 localStorage에 userId를 저장
        localStorage.setItem('userId', userId);

        // 5) user.selected 여부에 따라 분기 이동
        if (user.selected) {
          // 이미 캐릭터 생성이 완료된 사용자 → 요약 페이지로 이동
          navigate('/summary', {
            state: {
              selectedTeam: { name: user.team },     // summary에서 사용될 팀 이름
              selectedPlayer: { name: user.player }, // summary에서 사용될 선수 이름
              nickname: user.nickname,
              userId: userId,
            },
          });
        } else {
          // 아직 캐릭터 생성이 안 된 사용자 → 캐릭터 생성 페이지로 이동
          navigate('/create-character');
        }
      }
    } catch (err) {
      console.error('Login failed:', err);

      // 백엔드가 보낸 메시지가 있으면 그것을, 없으면 기본 에러 메시지
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('로그인 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h1>마이볼</h1>

        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <p className="login-footer">
          계정이 없나요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;