import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //alert(`아이디: ${form.username}, 비밀번호: ${form.password}`);
    // 로그인 로직 (임시)
    if (form.username && form.password) {
      try {
        // API 호출 로직이 들어갈 자리
        // const response = await loginAPI(form);
        
        // 로그인 성공 시
        navigate('/create-character');
      } catch (error) {
        console.error('Login failed:', error);
        alert('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h1>마이볼</h1>
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
