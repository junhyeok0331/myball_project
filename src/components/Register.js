import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert(`회원가입 완료! 아이디: ${form.username}`);
  };

  return (
    <div className="App">
      <div className="card register-container">
        <h1>회원가입</h1>
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
      </div>
    </div>
  );
};

export default Register;
