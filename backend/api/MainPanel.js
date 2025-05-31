// routes/mainPanel.js
const express = require('express');
const router = express.Router();
const { Users, Player } = require('../models');

// 🔹 팀 정보 조회
router.get('/team', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId가 필요합니다.' });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    if (!user.team) {
      return res.status(400).json({ message: '팀 정보가 설정되어 있지 않습니다.' });
    }

    const players = await Player.findAll({ where: { team: user.team } });

    return res.status(200).json({
      message: '팀 정보 및 선수 목록 조회 성공',
      team: user.team,
      players,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 팀 정보를 불러오지 못했습니다.' });
  }
});

// routes/mainPanel.js (이어서 계속)
router.get('/point', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId가 필요합니다.' });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    return res.status(200).json({
      message: '포인트 정보 조회 성공',
      point: user.point,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 포인트 정보를 불러오지 못했습니다.' });
  }
});

module.exports = router;