import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import './Card.css'; // 배경과 공통 스타일 포함

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // 서버 에러 메시지(예: “이미 존재하는 사용자입니다.” 등)를 보여주기 위한 state
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1) 클라이언트 사이드 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 2) 빈 값 검증 (required 속성을 썼기 때문에 브라우저 자체 검증도 동작)
    if (!form.username || !form.password) {
      setErrorMsg('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 3) 백엔드에 POST 요청 보내기
      const response = await axios.post(
        'http://172.30.1.41:8080/user/signup',
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

      // 4) status가 201 이면 회원가입 성공
      if (response.status === 201) {
        // 가입 성공 알림(원한다면 alert 대신 toast 등을 써도 됩니다)
        alert('회원가입이 완료되었습니다!');

        // 로그인 페이지로 이동 (예: '/login')
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup failed:', err);

      // 5) 백엔드 에러 메시지가 있으면 errorMsg에 넣어서 화면에 표시
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="App">
      <div className="card register-container">
        <h1>회원가입</h1>

        {/* 서버 또는 유효성 오류 메시지 출력 */}
        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="register-input"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            className="register-input"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">
            가입하기
          </button>
        </form>

        <p className="register-footer">
          이미 계정이 있나요? <Link to="/login">로그인하러 가기</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
