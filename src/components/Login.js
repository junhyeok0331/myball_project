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
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // 이전 에러 메시지 초기화

    // 간단한 유효성 검사
    if (!form.username || !form.password) {
      setErrorMsg('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
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

      // status가 200일 때만 여기로 진입합니다.
      if (response.status === 200) {
        const { userId } = response.data;
        // userId를 로컬스토리지에 저장
        localStorage.setItem('userId', userId);

        // 로그인 성공 후 다음 페이지로 이동
        navigate('/create-character');
      }
    } catch (err) {
      // 백엔드에서 보낸 에러 메시지를 화면에 띄워줍니다.
      console.error('Login failed:', err);

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
