const express = require('express');
const router = express.Router();
const { where } = require('sequelize');
const { Users, Shop, Item } = require('../models');

// 회원가입 요청 처리
router.post('/signup', async (req, res) => {
  console.log('[회원가입 요청 도착]', req.body);
  try {
    const { username, password } = req.body;

    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    }

    const newUser = await Users.create({ username, password });

    const newShop = await Shop.create({ userId: newUser.id });

    const itemsData = [
      { shopId: newShop.id, name: '윈지 모자', price: 50, purchased: false },
      { shopId: newShop.id, name: '윈지 티셔츠', price: 80, purchased: false }
    ];

    await Item.bulkCreate(itemsData);

    return res.status(201).json({ message: '회원가입 성공, 상점과 아이템이 생성되었습니다.', userId: newUser.id });
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

// 사용자의 팀 선택 저장
router.post('/save-team', async (req, res) => {
  console.log('[팀 선택 요청 도착]', req.body);
  try {
    const { userId, teamName } = req.body;

    if (!userId || !teamName) {
      return res.status(400).json({ message: 'userId와 teamName이 모두 필요합니다.' });
    }

    // 사용자 존재 확인
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 팀 정보만 업데이트
    user.team = teamName;
    await user.save();

    return res.status(200).json({ message: '팀 선택이 저장되었습니다.', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 인해 팀 저장에 실패했습니다.' });
  }
});

// 사용자의 선수 선택 저장
router.post('/save-player', async (req, res) => {
  try {
    const { userId, playerName } = req.body;

    if (!userId || !playerName) {
      return res.status(400).json({ message: 'userId와 playerName이 모두 필요합니다.' });
    }

    // 사용자 존재 확인
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 선수 정보만 업데이트
    user.player = playerName;
    await user.save();

    return res.status(200).json({ message: '선수 선택이 저장되었습니다.', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 인해 선수 저장에 실패했습니다.' });
  }
});

// 사용자의 닉네임 저장 및 selected 체크
router.post('/save-nickname', async (req, res) => {
  try {
    const { userId, nickname } = req.body;

    if (!userId || !nickname) {
      return res.status(400).json({ message: 'userId와 nickname이 모두 필요합니다.' });
    }

    // 사용자 존재 확인
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 닉네임 저장
    user.nickname = nickname;

    // team과 player가 모두 존재하면 selected를 true로 설정
    if (user.team && user.player) {
      user.selected = true;
    }

    await user.save();

    return res.status(200).json({ message: '닉네임이 저장되었습니다.', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 인해 닉네임 저장에 실패했습니다.' });
  }
});

module.exports = router;