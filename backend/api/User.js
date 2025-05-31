const express = require('express');
const router = express.Router();
const { where } = require('sequelize');
const { Points, Users } = require('../models');

// 회원가입 요청 처리
router.post('/signup', async (req, res) => {
    console.log('[회원가입 요청 도착]', req.body); // 🔍 로그 추가
    try {
            const { username, password } = req.body;
           // 중복 확인
           const existingUser = await Users.findOne({ where: { username } });
           if (existingUser) {
               return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
           }
   
           // 유저 생성
           const newUser = await Users.create({ username, password });
           return res.status(201).json({ message: '회원가입 성공', userId: newUser.id});
       } catch (err) {
           console.error(err);
           return res.status(500).json({ message: '서버 오류로 인해 회원가입에 실패했습니다.' });
       }
});

// 로그인 요청 처리
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 사용자 존재 여부 확인
        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
        }

        // 비밀번호 확인 
        if (user.password !== password) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // 로그인 성공
        return res.status(200).json({ message: '로그인 성공', userId: user.id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: '서버 오류로 인해 로그인에 실패했습니다.' });
    }
});

module.exports = router;